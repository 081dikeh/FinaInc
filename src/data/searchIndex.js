import { products } from "./ecomercemockData/poroductData";
import { Categories as categories } from "./ecomercemockData/categoriesData";
import { customers } from "./ecomercemockData/customerData";
import { orders } from "./ecomercemockData/ordersData";
import { campaigns } from "./campaignMockData";
import { savingsGoals } from "./financemockData/savingsData";
import { events as calendarEvents } from "./calendarMockData";
import { tasks as projectTasks } from "./projectMockData";
import { conversations } from "./chatMockData";

// Static pages that can be jumped to directly
export const staticPages = [
  { title: "Dashboard", subtitle: "Overview", path: "/", group: "Pages" },
  { title: "My Card", subtitle: "Finance", path: "/finance/my-card", group: "Pages" },
  { title: "Savings", subtitle: "Finance", path: "/finance/savings", group: "Pages" },
  { title: "In & Out", subtitle: "Finance", path: "/finance/in-out", group: "Pages" },
  { title: "Product", subtitle: "E-Commerce", path: "/ecommerce/product", group: "Pages" },
  { title: "Categories", subtitle: "E-Commerce", path: "/ecommerce/category", group: "Pages" },
  { title: "Orders", subtitle: "E-Commerce", path: "/ecommerce/orders", group: "Pages" },
  { title: "Customer", subtitle: "E-Commerce", path: "/ecommerce/customer", group: "Pages" },
  { title: "Project", subtitle: "Kanban board", path: "/project", group: "Pages" },
  { title: "Campaign", subtitle: "Marketing", path: "/campaign", group: "Pages" },
  { title: "Calendar", subtitle: "Schedule", path: "/calendar", group: "Pages" },
  { title: "Chat", subtitle: "Messages", path: "/chat", group: "Pages" },
  { title: "Support", subtitle: "Help center", path: "/support", group: "Pages" },
  { title: "Contact Us", subtitle: "Get in touch", path: "/contact-us", group: "Pages" },
  { title: "My Profile", subtitle: "Account", path: "/profile", group: "Pages" },
];

function buildIndex() {
  const index = [...staticPages];

  products.forEach((p) =>
    index.push({
      title: p.productName,
      subtitle: `Product · ${p.category} · $${p.price}`,
      path: "/ecommerce/product",
      group: "Products",
    })
  );

  categories.forEach((c) =>
    index.push({
      title: c.productName,
      subtitle: "Category",
      path: "/ecommerce/category",
      group: "Categories",
    })
  );

  customers.forEach((c) =>
    index.push({
      title: c.name,
      subtitle: `Customer · ${c.email}`,
      path: "/ecommerce/customer",
      group: "Customers",
    })
  );

  orders.forEach((o) =>
    index.push({
      title: o.id,
      subtitle: `Order · ${o.customer.name} · $${o.total.toFixed(2)}`,
      path: "/ecommerce/orders",
      group: "Orders",
    })
  );

  campaigns.forEach((c) =>
    index.push({
      title: c.name,
      subtitle: `Campaign · ${c.channel} · ${c.status}`,
      path: "/campaign",
      group: "Campaigns",
    })
  );

  savingsGoals.forEach((s) =>
    index.push({
      title: s.title,
      subtitle: `Savings goal · $${s.currentAmount} of $${s.goalAmount}`,
      path: "/finance/savings",
      group: "Savings",
    })
  );

  calendarEvents.forEach((e) =>
    index.push({
      title: e.title,
      subtitle: `Event · ${e.date}`,
      path: "/calendar",
      group: "Calendar",
    })
  );

  projectTasks.forEach((t) =>
    index.push({
      title: t.title,
      subtitle: `Task · ${t.priority} priority`,
      path: "/project",
      group: "Project Tasks",
    })
  );

  conversations.forEach((c) =>
    index.push({
      title: c.name,
      subtitle: "Conversation",
      path: "/chat",
      group: "Chat",
    })
  );

  return index;
}

export const searchIndex = buildIndex();

export function searchApp(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    )
    .slice(0, limit);
}
