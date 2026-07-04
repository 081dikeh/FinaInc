export const conversations = [
  {
    id: 1,
    name: "Alicia Keys",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Sounds good, let's sync tomorrow",
    time: "09:41",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "I've pushed the fix to staging",
    time: "08:15",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Marketing Team",
    avatar: "https://i.pravatar.cc/150?img=20",
    lastMessage: "Maria: Campaign assets are ready",
    time: "Yesterday",
    unread: 5,
    online: false,
  },
  {
    id: 4,
    name: "Tom Wilson",
    avatar: "https://i.pravatar.cc/150?img=15",
    lastMessage: "Thanks for the update!",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Priya Singh",
    avatar: "https://i.pravatar.cc/150?img=48",
    lastMessage: "Can you review my PR?",
    time: "Mon",
    unread: 0,
    online: true,
  },
  {
    id: 6,
    name: "Fina Support",
    avatar: "https://i.pravatar.cc/150?img=60",
    lastMessage: "Your ticket has been resolved",
    time: "Sun",
    unread: 0,
    online: false,
  },
];

export const messagesByConversation = {
  1: [
    { id: 1, fromMe: false, text: "Hey! Did you get a chance to look at the new designs?", time: "09:12" },
    { id: 2, fromMe: true, text: "Yes, they look great. Just a few tweaks needed on the header.", time: "09:20" },
    { id: 3, fromMe: false, text: "Sure, I can update it today.", time: "09:25" },
    { id: 4, fromMe: false, text: "Sounds good, let's sync tomorrow", time: "09:41" },
  ],
  2: [
    { id: 1, fromMe: false, text: "The bug on the orders page is fixed.", time: "08:02" },
    { id: 2, fromMe: true, text: "Nice, thank you!", time: "08:10" },
    { id: 3, fromMe: false, text: "I've pushed the fix to staging", time: "08:15" },
  ],
  3: [
    { id: 1, fromMe: false, text: "Maria: Campaign assets are ready", time: "Yesterday" },
  ],
  4: [
    { id: 1, fromMe: true, text: "Here's the report you asked for.", time: "Yesterday" },
    { id: 2, fromMe: false, text: "Thanks for the update!", time: "Yesterday" },
  ],
  5: [
    { id: 1, fromMe: false, text: "Can you review my PR?", time: "Mon" },
  ],
  6: [
    { id: 1, fromMe: false, text: "Your ticket has been resolved", time: "Sun" },
  ],
};
