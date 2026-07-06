import { Link } from "react-router-dom";

// Maps a breadcrumb segment label to its route path.
// Used so intermediate crumbs (e.g. "Ecommerce", "Product", "Savings")
// are clickable links back to their parent list page.
const ROUTE_MAP = {
  "Dashboard": "/",
  "My Card": "/finance/my-card",
  "Savings": "/finance/savings",
  "In and Out": "/finance/in-out",
  "In & Out": "/finance/in-out",
  "Ecommerce": "/ecommerce/product",
  "Product": "/ecommerce/product",
  "Categories": "/ecommerce/category",
  "Category": "/ecommerce/category",
  "Orders": "/ecommerce/orders",
  "Customer": "/ecommerce/customer",
  "Project": "/project",
  "Campaign": "/campaign",
  "Calendar": "/calendar",
  "Chat": "/chat",
  "Support": "/support",
  "Contact Us": "/contact-us",
  "Profile": "/profile",
};

export default function PageTitle({ title, navigationRoute }) {
  // Build the full breadcrumb trail: Dashboard, then each segment
  // of navigationRoute (split on "/"), ending in the current page.
  const segments = (navigationRoute || title || "")
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);

  const crumbs = ["Dashboard", ...segments];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
      <div className="flex items-center gap-2 text-sm flex-wrap">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          const path = ROUTE_MAP[crumb];

          return (
            <span key={`${crumb}-${idx}`} className="flex items-center gap-2">
              {idx > 0 && <span className="text-gray-400">&rsaquo;</span>}
              {!isLast && path ? (
                <Link
                  to={path}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  {crumb}
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "text-gray-500" : "text-gray-500 cursor-default"
                  }
                >
                  {crumb}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
