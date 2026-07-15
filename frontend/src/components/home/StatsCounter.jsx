import { useState, useEffect, useRef } from "react";

const stats = [
    { number: 1200, suffix: "+", label: "Properties Listed", icon: "bi-building" },
    { number: 4500, suffix: "+", label: "Happy Clients", icon: "bi-emoji-smile" },
    { number: 98, suffix: "%", label: "Client Satisfaction", icon: "bi-star" },
    { number: 15, suffix: "+", label: "Years Experience", icon: "bi-award" }
];

function AnimatedNumber({ target, suffix, inView }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, inView]);

    return (
        <span>{count.toLocaleString("en-IN")}{suffix}</span>
    );
}

function StatsCounter() {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                padding: "clamp(50px, 6vw, 80px) 0",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Decorative elements */}
            <div style={{
                position: "absolute",
                top: "-100px",
                right: "-100px",
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
                borderRadius: "50%"
            }}></div>

            <div className="container">
                <div className="row g-4 text-center">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="col-6 col-lg-3">
                            <div style={{
                                padding: "24px 16px",
                                animation: inView ? `countUp 0.6s ease-out ${index * 0.15}s both` : "none"
                            }}>
                                <div style={{
                                    fontSize: "clamp(28px, 5vw, 42px)",
                                    fontWeight: 800,
                                    color: "#ffffff",
                                    lineHeight: 1.1,
                                    marginBottom: "8px",
                                    letterSpacing: "-1px"
                                }}>
                                    <AnimatedNumber target={stat.number} suffix={stat.suffix} inView={inView} />
                                </div>
                                <p style={{
                                    fontSize: "14px",
                                    color: "#94a3b8",
                                    fontWeight: 500,
                                    marginBottom: 0,
                                    letterSpacing: "0.3px"
                                }}>
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StatsCounter;
