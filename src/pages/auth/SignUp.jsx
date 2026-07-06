import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import FinaLogo from "../../assets/FinaLogo.png";

const inputClass =
  "w-full pl-11 pr-4 py-3 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useProfile();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("Please agree to the Terms of Service to continue.");
      return;
    }
    setError("");
    signup(form);
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 font-Geist px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <img src={FinaLogo} alt="Fina Inc" className="h-10 mb-4" />
          <h1 className="text-2xl font-semibold text-brand-500">Create your account</h1>
          <p className="text-sm text-brand-100 mt-1">Start managing your business with Fina Inc</p>
        </div>

        {error && (
          <div className="bg-[#FEF0F0] text-brand-900 text-sm font-medium px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className={inputClass}
                placeholder="e.g. Bryan Adams"
                value={form.name}
                onChange={handleChange("name")}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className={inputClass}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className={labelClass}>Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className={inputClass}
                placeholder="Re-enter your password"
                value={form.confirm}
                onChange={handleChange("confirm")}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-brand-400 font-medium">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 accent-primary-light"
            />
            I agree to the Terms of Service and Privacy Policy
          </label>

          <button
            type="submit"
            className="bg-primary-light text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition-colors mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-brand-100 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-light font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
