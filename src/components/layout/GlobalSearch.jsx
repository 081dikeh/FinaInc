import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { searchApp } from "../../data/searchIndex";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const results = searchApp(query);
  const grouped = results.reduce((acc, item) => {
    acc[item.group] = acc[item.group] || [];
    acc[item.group].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-200 focus:border-transparent text-gray-700 placeholder-gray-400 border border-transparent focus:border-gray-200"
      />

      {isOpen && query && (
        <div className="absolute left-0 top-full mt-2 w-96 max-h-96 overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-2">
          {results.length === 0 ? (
            <p className="text-sm text-brand-100 text-center py-6">
              No results for "{query}"
            </p>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="mb-1">
                <p className="text-[11px] font-semibold text-brand-100 uppercase px-4 py-1.5">
                  {group}
                </p>
                {items.map((item, idx) => (
                  <button
                    key={`${group}-${idx}`}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-brand-500">{item.title}</p>
                      {item.subtitle && (
                        <p className="text-xs text-brand-100">{item.subtitle}</p>
                      )}
                    </div>
                    <ArrowRight size={14} className="text-brand-100 flex-shrink-0" />
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
