import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import PageTitle from "../components/layout/PageTitle";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@finainc.com" },
  { icon: Phone, label: "Phone", value: "+1 (469) 227-9044" },
  { icon: MapPin, label: "Office", value: "27 Prather Son Drive, Loganville, GA 30052, USA" },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="mb-6">
        <PageTitle title="Contact Us" navigationRoute="Contact Us" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Info column */}
        <div className="flex flex-col gap-4">
          {contactInfo.map((info) => (
            <div key={info.label} className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-800 text-primary-light flex items-center justify-center flex-shrink-0">
                <info.icon size={20} />
              </div>
              <div>
                <p className="text-xs text-brand-100 font-semibold uppercase mb-1">{info.label}</p>
                <p className="text-sm font-medium text-brand-500">{info.value}</p>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-xs text-brand-100 font-semibold uppercase mb-3">Business Hours</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-300">Monday - Friday</span>
                <span className="text-brand-500 font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-300">Saturday</span>
                <span className="text-brand-500 font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-300">Sunday</span>
                <span className="text-brand-500 font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form column */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-brand-500 mb-1">Send us a message</h3>
          <p className="text-sm text-brand-100 mb-6">
            Fill out the form below and our team will get back to you shortly.
          </p>

          {submitted && (
            <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              <CheckCircle2 size={18} />
              Your message has been sent. We'll be in touch soon!
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  className={inputClass}
                  placeholder="e.g. Bryan Adams"
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="e.g. bryanadams@mail.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Subject</label>
              <input
                className={inputClass}
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange("subject")}
              />
            </div>
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                className={inputClass}
                rows={6}
                placeholder="Type your message here..."
                value={form.message}
                onChange={handleChange("message")}
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg mt-2 w-fit"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
