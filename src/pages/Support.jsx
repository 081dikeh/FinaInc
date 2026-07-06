import { useState } from "react";
import { Search, ChevronDown, LifeBuoy, MessageCircle, Mail, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/layout/PageTitle";
import { faqCategories, faqs } from "../data/supportData";

const helpCards = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real time.",
    action: "Start Chat",
    to: "/chat",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and we'll respond within 24 hours.",
    action: "Contact Us",
    to: "/contact-us",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Browse detailed guides on every feature.",
    action: "View Docs",
    to: "/support",
  },
];

export default function Support() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return search ? matchesSearch : matchesCategory;
  });

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="mb-6">
        <PageTitle title="Support" navigationRoute="Support" />
      </div>

      {/* Hero search */}
      <div className="bg-primary-light rounded-2xl p-10 text-center text-white mb-8">
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
          <LifeBuoy size={28} />
        </div>
        <h2 className="text-2xl font-semibold mb-2">How can we help you?</h2>
        <p className="text-white/80 mb-6">Search our help center or browse categories below</p>
        <div className="relative max-w-lg mx-auto">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for answers..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-brand-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      {/* Help cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {helpCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-800 text-primary-light flex items-center justify-center">
              <card.icon size={20} />
            </div>
            <h3 className="font-semibold text-brand-500">{card.title}</h3>
            <p className="text-sm text-brand-100">{card.description}</p>
            <button
              onClick={() => navigate(card.to)}
              className="text-sm font-semibold text-primary-light hover:underline"
            >
              {card.action} &rarr;
            </button>
          </div>
        ))}
      </div>

      {/* FAQ section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-brand-500 mb-4">
          Frequently Asked Questions
        </h3>

        {!search && (
          <div className="flex gap-3 mb-6 flex-wrap">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary-light text-white"
                    : "bg-brand-800 text-brand-400 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col divide-y divide-gray-100">
          {filteredFaqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-medium text-brand-500 text-sm">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-brand-200 transition-transform flex-shrink-0 ml-4 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <p className="text-sm text-brand-100 mt-3 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-sm text-brand-100 text-center py-8">
              No results found. Try a different search or{" "}
              <button
                onClick={() => navigate("/contact-us")}
                className="text-primary-light font-semibold hover:underline"
              >
                contact us
              </button>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
