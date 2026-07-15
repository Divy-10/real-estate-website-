import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  // items = [{ label: "Home", path: "/" }, { label: "Services", path: "/services" }, { label: "Property Buying" }]
  // Last item has no path (current page)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.path ? { "item": `https://royalcrestproperties.com${item.path}` } : {})
    }))
  };

  return (
    <nav className="breadcrumb-section" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li
              key={index}
              className={index === items.length - 1 ? "active" : ""}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && <span className="separator"><i className="bi bi-chevron-right"></i></span>}
              {item.path ? (
                <Link to={item.path} itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span itemProp="name">{item.label}</span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

export default Breadcrumb;
