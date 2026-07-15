import { useEffect, useRef } from "react";

function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.15, rootMargin = "0px 0px -50px 0px", once = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("animated");
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe the element and all children with animate-on-scroll class
    const children = element.querySelectorAll(".animate-on-scroll");
    children.forEach((child) => observer.observe(child));
    if (element.classList.contains("animate-on-scroll")) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

export default useScrollAnimation;
