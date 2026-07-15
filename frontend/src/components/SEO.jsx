import { useEffect } from "react";

const SITE_NAME = "Royal Crest Properties";
const SITE_URL = "https://royalcrestproperties.com";

function SEO({ title, description, canonical, ogImage, ogType = "website", twitterCard = "summary_large_image", jsonLd, noindex = false, keywords, publisher }) {
  useEffect(() => {
    // Set document title
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Find Your Dream Home`;

    // Helper to set or create a meta tag
    const setMeta = (attr, attrValue, content) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    if (description) setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    if (publisher) setMeta("name", "publisher", publisher);
    
    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = canonical || `${SITE_URL}${window.location.pathname}`;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", title || SITE_NAME);
    setMeta("property", "og:description", description || "Premium real estate services. Find your dream home with Royal Crest Properties.");
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:site_name", SITE_NAME);
    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("property", "og:image:width", "1200");
      setMeta("property", "og:image:height", "630");
    }

    // Twitter Card
    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "twitter:title", title || SITE_NAME);
    setMeta("name", "twitter:description", description || "Premium real estate services. Find your dream home with Royal Crest Properties.");
    if (ogImage) setMeta("name", "twitter:image", ogImage);

    // JSON-LD
    let scriptEl = document.querySelector('script[data-seo-jsonld]');
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.setAttribute("type", "application/ld+json");
        scriptEl.setAttribute("data-seo-jsonld", "true");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    // Cleanup
    return () => {
      const s = document.querySelector('script[data-seo-jsonld]');
      if (s) s.remove();
    };
  }, [title, description, canonical, ogImage, ogType, twitterCard, jsonLd, noindex, keywords, publisher]);

  return null;
}

export default SEO;
export { SITE_NAME, SITE_URL };
