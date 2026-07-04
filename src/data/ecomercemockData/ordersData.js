export const orderStats = [
  { title: "Total Orders", value: "8,540", isPositive: true, change: "+6%" },
  { title: "Completed", value: "6,120", isPositive: true, change: "+10%" },
  { title: "Processing", value: "1,340", isPositive: true, change: "+2%" },
  { title: "Cancelled", value: "1,080", isPositive: false, change: "-4%" },
];

export const trackingSteps = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

export const orders = [
  {
    id: "ORD-7841",
    customer: { name: "Wade Warren", avatar: "https://i.pravatar.cc/150?img=11", email: "wade.warren@example.com" },
    date: "01 Jul 2026",
    items: [
      { id: 1, name: "Headphone G1", image: "https://images.unsplash.com/photo-1505740420928-efe6ff27a629?w=200&q=80", qty: 1, price: 174.0 },
      { id: 2, name: "TWS Earphone M1", image: "https://images.unsplash.com/photo-1606220588913-b474a7e24a33?w=200&q=80", qty: 2, price: 40.0 },
    ],
    total: 254.0,
    payment: "Card",
    status: "Delivered",
    currentStep: 4,
    address: "2118 Thornridge Cir, Syracuse, NY 13202",
  },
  {
    id: "ORD-7842",
    customer: { name: "Esther Howard", avatar: "https://i.pravatar.cc/150?img=32", email: "esther.howard@example.com" },
    date: "02 Jul 2026",
    items: [
      { id: 1, name: "Berry Smartwatch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80", qty: 1, price: 174.0 },
    ],
    total: 174.0,
    payment: "PayPal",
    status: "Shipped",
    currentStep: 3,
    address: "4517 Washington Ave, Manchester, KY 39495",
  },
  {
    id: "ORD-7843",
    customer: { name: "Jenny Wilson", avatar: "https://i.pravatar.cc/150?img=25", email: "jenny.wilson@example.com" },
    date: "02 Jul 2026",
    items: [
      { id: 1, name: "Keyboard MX Low Profile", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80", qty: 1, price: 104.0 },
    ],
    total: 104.0,
    payment: "Card",
    status: "Processing",
    currentStep: 2,
    address: "2464 Royal Ln, Mesa, New Jersey 45463",
  },
  {
    id: "ORD-7844",
    customer: { name: "Cameron Williamson", avatar: "https://i.pravatar.cc/150?img=51", email: "cameron.w@example.com" },
    date: "03 Jul 2026",
    items: [
      { id: 1, name: "Logic G Pro Wireless Mouse", image: "https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg", qty: 3, price: 40.0 },
    ],
    total: 120.0,
    payment: "Card",
    status: "Pending",
    currentStep: 1,
    address: "3891 Ranchview Dr, Richardson, California 62639",
  },
  {
    id: "ORD-7845",
    customer: { name: "Brooklyn Simmons", avatar: "https://i.pravatar.cc/150?img=44", email: "brooklyn.s@example.com" },
    date: "03 Jul 2026",
    items: [
      { id: 1, name: "Headphone G1", image: "https://images.unsplash.com/photo-1505740420928-efe6ff27a629?w=200&q=80", qty: 1, price: 174.0 },
    ],
    total: 174.0,
    payment: "Bank Transfer",
    status: "Cancelled",
    currentStep: 0,
    address: "1901 Thornridge Cir, Ohio 15234",
  },
  {
    id: "ORD-7846",
    customer: { name: "Leslie Alexander", avatar: "https://i.pravatar.cc/150?img=47", email: "leslie.alexander@example.com" },
    date: "04 Jul 2026",
    items: [
      { id: 1, name: "Berry Smartwatch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80", qty: 2, price: 174.0 },
    ],
    total: 348.0,
    payment: "Card",
    status: "Delivered",
    currentStep: 4,
    address: "8502 Preston Rd, Boston, MA 02110",
  },
  {
    id: "ORD-7847",
    customer: { name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?img=53", email: "guy.hawkins@example.com" },
    date: "05 Jul 2026",
    items: [
      { id: 1, name: "Keyboard MX Low Profile", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80", qty: 1, price: 104.0 },
    ],
    total: 104.0,
    payment: "Card",
    status: "Shipped",
    currentStep: 3,
    address: "220 Elm St, Denver, CO 80202",
  },
];
