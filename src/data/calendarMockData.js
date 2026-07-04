// Mock events for the Calendar page
// date format: "YYYY-MM-DD"
export const eventColors = {
  meeting: { bg: "bg-[#EDE9FE]", text: "text-primary-light", dot: "bg-primary-light" },
  design: { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-500" },
  personal: { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
  deadline: { bg: "bg-[#FEF0F0]", text: "text-brand-900", dot: "bg-brand-900" },
};

export const events = [
  { id: 1, title: "Product Design Review", date: "2026-07-01", startTime: "09:00", endTime: "10:00", type: "design", location: "Zoom", guests: ["Alice", "Ben"], description: "Review the new dashboard UI kit before launch." },
  { id: 2, title: "Team Standup", date: "2026-07-01", startTime: "11:00", endTime: "11:30", type: "meeting", location: "Meeting Room 2", guests: ["Team"], description: "Daily sync with the product team." },
  { id: 3, title: "Client Call - Fina Inc", date: "2026-07-03", startTime: "14:00", endTime: "15:00", type: "meeting", location: "Google Meet", guests: ["Bryan Adams"], description: "Quarterly business review call." },
  { id: 4, title: "Dentist Appointment", date: "2026-07-03", startTime: "17:00", endTime: "18:00", type: "personal", location: "Downtown Clinic", guests: [], description: "Routine checkup." },
  { id: 5, title: "Marketing Campaign Deadline", date: "2026-07-08", startTime: "18:00", endTime: "18:30", type: "deadline", location: "-", guests: ["Marketing team"], description: "Submit final campaign assets." },
  { id: 6, title: "1:1 with Manager", date: "2026-07-10", startTime: "10:00", endTime: "10:30", type: "meeting", location: "Office", guests: ["Manager"], description: "Monthly performance check-in." },
  { id: 7, title: "Design Sprint Workshop", date: "2026-07-14", startTime: "09:00", endTime: "13:00", type: "design", location: "Studio A", guests: ["Design Team"], description: "Full day workshop for new feature ideation." },
  { id: 8, title: "Birthday Party", date: "2026-07-17", startTime: "19:00", endTime: "22:00", type: "personal", location: "Home", guests: ["Family"], description: "Celebrate with family and friends." },
  { id: 9, title: "Project Handoff", date: "2026-07-21", startTime: "12:00", endTime: "13:00", type: "deadline", location: "Office", guests: ["Dev team"], description: "Hand off finished project to client." },
  { id: 10, title: "Investor Meeting", date: "2026-07-24", startTime: "15:00", endTime: "16:00", type: "meeting", location: "Board Room", guests: ["Investors"], description: "Present Q3 results." },
];
