import { useState } from "react";
import { Search, Send, Paperclip, Phone, Video, MoreVertical } from "lucide-react";
import PageTitle from "../components/layout/PageTitle";
import { conversations, messagesByConversation } from "../data/chatMockData";

export default function Chat() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState(messagesByConversation);
  const [draft, setDraft] = useState("");

  const activeConversation = conversations.find((c) => c.id === activeId);
  const activeMessages = messages[activeId] || [];

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!draft.trim()) return;
    const newMsg = {
      id: Date.now(),
      fromMe: true,
      text: draft,
      time: "Now",
    };
    setMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMsg],
    }));
    setDraft("");
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="mb-6">
        <PageTitle title="Chat" navigationRoute="Chat" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm flex overflow-hidden h-[70vh]">
        {/* Conversation List */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${
                  activeId === c.id
                    ? "bg-brand-800 border-primary-light"
                    : "border-transparent"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover" />
                  {c.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-brand-500 truncate">{c.name}</p>
                    <span className="text-[11px] text-brand-100 flex-shrink-0">{c.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-brand-100 truncate">{c.lastMessage}</p>
                    {c.unread > 0 && (
                      <span className="bg-primary-light text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {activeConversation && (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-brand-500">
                      {activeConversation.name}
                    </p>
                    <p className="text-xs text-brand-100">
                      {activeConversation.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-200">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {activeMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                        m.fromMe
                          ? "bg-primary-light text-white rounded-br-sm"
                          : "bg-gray-100 text-brand-500 rounded-bl-sm"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          m.fromMe ? "text-white/70" : "text-brand-100"
                        }`}
                      >
                        {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100 flex items-center gap-3">
                <button className="p-2.5 rounded-xl bg-gray-100 text-brand-300 hover:bg-gray-200 transition-colors">
                  <Paperclip size={20} />
                </button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
                <button
                  onClick={handleSend}
                  className="p-2.5 rounded-xl bg-primary-light text-white hover:opacity-90 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
