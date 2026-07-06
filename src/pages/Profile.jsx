import { useState } from "react";
import { Camera, CheckCircle2, Lock, Eye, EyeOff } from "lucide-react";
import PageTitle from "../components/layout/PageTitle";
import { useProfile } from "../context/ProfileContext";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

function ProfileInfoTab() {
  const { profile, updateProfile } = useProfile();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
          <CheckCircle2 size={18} />
          Profile updated successfully.
        </div>
      )}

      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={form.avatar}
            alt={form.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-primary-light p-2 rounded-full cursor-pointer hover:opacity-90 transition-colors"
          >
            <Camera size={14} color="white" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-brand-500">{form.name}</h3>
          <p className="text-sm text-brand-100">{form.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input className={inputClass} value={form.name} onChange={handleChange("name")} />
        </div>
        <div>
          <label className={labelClass}>Role</label>
          <input className={inputClass} value={form.role} onChange={handleChange("role")} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={handleChange("email")}
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input className={inputClass} value={form.phone} onChange={handleChange("phone")} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Address</label>
        <input className={inputClass} value={form.address} onChange={handleChange("address")} />
      </div>

      <div>
        <label className={labelClass}>Bio</label>
        <textarea
          className={inputClass}
          rows={3}
          value={form.bio}
          onChange={handleChange("bio")}
        />
      </div>

      <button
        type="submit"
        className="bg-primary-light text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-colors w-fit"
      >
        Save Changes
      </button>
    </form>
  );
}

function SecurityTab() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.current || !form.next) {
      setMessage("error:Please fill in all password fields.");
      return;
    }
    if (form.next !== form.confirm) {
      setMessage("error:New passwords do not match.");
      return;
    }
    setMessage("success:Password updated successfully.");
    setForm({ current: "", next: "", confirm: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      {message && (
        <div
          className={`text-sm font-medium px-4 py-3 rounded-xl ${
            message.startsWith("error")
              ? "bg-[#FEF0F0] text-brand-900"
              : "bg-green-50 text-green-600"
          }`}
        >
          {message.split(":")[1]}
        </div>
      )}

      <div>
        <label className={labelClass}>Current Password</label>
        <div className="relative">
          <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={show ? "text" : "password"}
            className={`${inputClass} pl-11`}
            value={form.current}
            onChange={handleChange("current")}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>New Password</label>
        <div className="relative">
          <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={show ? "text" : "password"}
            className={`${inputClass} pl-11`}
            value={form.next}
            onChange={handleChange("next")}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Confirm New Password</label>
        <div className="relative">
          <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={show ? "text" : "password"}
            className={`${inputClass} pl-11`}
            value={form.confirm}
            onChange={handleChange("confirm")}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary-light text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-colors w-fit mt-2"
      >
        Update Password
      </button>
    </form>
  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Profile Info");
  const tabs = ["Profile Info", "Security"];

  return (
    <section className="w-full min-w-7xl font-Geist">
      <div className="mb-6">
        <PageTitle title="My Profile" navigationRoute="Profile" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex gap-6 border-b border-gray-100 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-primary-light border-primary-light"
                  : "text-brand-300 border-transparent hover:text-brand-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Profile Info" ? <ProfileInfoTab /> : <SecurityTab />}
      </div>
    </section>
  );
}
