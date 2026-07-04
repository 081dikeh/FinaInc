// Categories Array with Real Images (No Background)
const Categories = [
  {
    id: 1,
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&bg=remove',
    productName: 'Wireless Headphones',
    productDescription: 'Premium noise-cancelling wireless headphones with exceptional sound quality',
    productAmount: 140,
    stockAmount: 134
  },
  {
    id: 2,
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&bg=remove',
    productName: 'Laptop Computer',
    productDescription: 'High-performance laptop with latest processor and stunning display',
    productAmount: 85,
    stockAmount: 78
  },
  {
    id: 3,
    productImage: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&bg=remove',
    productName: 'Gaming Mouse',
    productDescription: 'Ergonomic gaming mouse with RGB lighting and programmable buttons',
    productAmount: 220,
    stockAmount: 198
  },
  {
    id: 4,
    productImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop&bg=remove',
    productName: 'Mechanical Keyboard',
    productDescription: 'RGB mechanical keyboard with customizable keys and tactile feedback',
    productAmount: 165,
    stockAmount: 152
  },
  {
    id: 5,
    productImage: 'https://images.unsplash.com/photo-1585790050230-5dd28404f905?w=400&h=300&fit=crop&bg=remove',
    productName: 'Smartwatch',
    productDescription: 'Fitness tracking smartwatch with heart rate monitor and GPS',
    productAmount: 310,
    stockAmount: 287
  },
  {
    id: 6,
    productImage: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop&bg=remove',
    productName: 'Smart Speaker',
    productDescription: 'Voice-activated smart speaker with premium audio and assistant',
    productAmount: 195,
    stockAmount: 180
  },
  {
    id: 7,
    productImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&bg=remove',
    productName: 'Portable Charger',
    productDescription: 'High-capacity power bank for charging devices on the go',
    productAmount: 425,
    stockAmount: 401
  },
  {
    id: 8,
    productImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop&bg=remove',
    productName: 'Wireless Earbuds',
    productDescription: 'True wireless earbuds with active noise cancellation',
    productAmount: 280,
    stockAmount: 265
  },
  {
    id: 9,
    productImage: 'https://images.unsplash.com/photo-1585232350370-2795f8b09f0c?w=400&h=300&fit=crop&bg=remove',
    productName: 'USB-C Hub',
    productDescription: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader',
    productAmount: 340,
    stockAmount: 312
  },
  {
    id: 10,
    productImage: 'https://images.unsplash.com/photo-1616627781708-19e8f0430e8d?w=400&h=300&fit=crop&bg=remove',
    productName: 'Webcam HD',
    productDescription: '1080p HD webcam with auto-focus and built-in microphone',
    productAmount: 145,
    stockAmount: 128
  },
  {
    id: 11,
    productImage: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop&bg=remove',
    productName: 'External SSD',
    productDescription: 'Portable solid state drive with fast transfer speeds and durability',
    productAmount: 115,
    stockAmount: 98
  },
  {
    id: 12,
    productImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop&bg=remove',
    productName: 'Monitor 27"',
    productDescription: '4K ultra HD monitor with HDR support and thin bezels',
    productAmount: 92,
    stockAmount: 85
  },
  {
    id: 13,
    productImage: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=300&fit=crop&bg=remove',
    productName: 'Graphics Tablet',
    productDescription: 'Digital drawing tablet with pressure-sensitive stylus',
    productAmount: 78,
    stockAmount: 69
  },
  {
    id: 14,
    productImage: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=300&fit=crop&bg=remove',
    productName: 'Laptop Stand',
    productDescription: 'Adjustable aluminum laptop stand for better ergonomics',
    productAmount: 235,
    stockAmount: 221
  },
  {
    id: 15,
    productImage: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=300&fit=crop&bg=remove',
    productName: 'Desk Lamp LED',
    productDescription: 'Adjustable LED desk lamp with touch control and USB charging',
    productAmount: 188,
    stockAmount: 175
  },
  {
    id: 16,
    productImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&bg=remove',
    productName: 'Backpack Tech',
    productDescription: 'Water-resistant laptop backpack with multiple compartments',
    productAmount: 156,
    stockAmount: 142
  },
  {
    id: 17,
    productImage: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=300&fit=crop&bg=remove',
    productName: 'Messenger Bag',
    productDescription: 'Professional leather messenger bag for laptop and documents',
    productAmount: 94,
    stockAmount: 87
  },
  {
    id: 18,
    productImage: 'https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=400&h=300&fit=crop&bg=remove',
    productName: 'Phone Stand',
    productDescription: 'Adjustable phone stand for desk with cable management',
    productAmount: 312,
    stockAmount: 298
  },
  {
    id: 19,
    productImage: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=300&fit=crop&bg=remove',
    productName: 'Bluetooth Speaker',
    productDescription: 'Portable waterproof Bluetooth speaker with 360° sound',
    productAmount: 267,
    stockAmount: 251
  },
  {
    id: 20,
    productImage: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop&bg=remove',
    productName: 'Ring Light',
    productDescription: 'Professional ring light for photography and video calls',
    productAmount: 142,
    stockAmount: 129
  },
  {
    id: 21,
    productImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&bg=remove',
    productName: 'Microphone USB',
    productDescription: 'Professional USB microphone for podcasting and streaming',
    productAmount: 108,
    stockAmount: 95
  },
  {
    id: 22,
    productImage: 'https://images.unsplash.com/photo-1621271835469-fd988d593ff9?w=400&h=300&fit=crop&bg=remove',
    productName: 'Gaming Controller',
    productDescription: 'Wireless gaming controller with haptic feedback',
    productAmount: 198,
    stockAmount: 183
  },
  {
    id: 23,
    productImage: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop&bg=remove',
    productName: 'Cable Organizer',
    productDescription: 'Desktop cable management system to keep cords tidy',
    productAmount: 445,
    stockAmount: 428
  },
  {
    id: 24,
    productImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=300&fit=crop&bg=remove',
    productName: 'Mouse Pad XL',
    productDescription: 'Extended gaming mouse pad with anti-slip rubber base',
    productAmount: 278,
    stockAmount: 264
  },
  {
    id: 25,
    productImage: 'https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?w=400&h=300&fit=crop&bg=remove',
    productName: 'Travel Adapter',
    productDescription: 'Universal travel adapter with multiple USB ports',
    productAmount: 365,
    stockAmount: 341
  }
];

export { Categories };