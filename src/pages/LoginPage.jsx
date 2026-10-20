import { BusFront, Eye, EyeOff, LockKeyhole, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const name = form.email.split("@")[0].replace(/[._-]/g, " ");
    onLogin(name || "Commuter");
    navigate("/");
  };

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="BIYAHEGO introduction">
        <div className="login-brand">
          <span className="brand-mark" aria-hidden="true"><BusFront size={27} /></span>
          <div><strong>BIYAHEGO</strong><span>Butuan City Transport Hub</span></div>
        </div>

        <div className="login-intro-copy">
          <p className="eyebrow">Plan your local journey</p>
          <h1>Move through Butuan City with a clearer route.</h1>
          <p>Check routes, compare fares, reserve your seat, and keep your trip details in one place.</p>
        </div>

        <div className="login-route-preview" aria-label="Butuan route corridor">
          <div className="login-route-line" />
          <span>Bancasi</span><span>Libertad</span><span>Langihan</span><span>Baan</span><span>CSU</span><span>Ampayon</span>
        </div>

        <p className="login-assurance"><ShieldCheck size={18} aria-hidden="true" /> Local route information for commuters, students, and visitors.</p>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to BIYAHEGO</h2>
            <p className="login-subtitle">Use any valid email and a password with at least 6 characters for this frontend demo.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {error && <p className="error-message" role="alert">{error}</p>}
            <label>
              Email address
              <span className="input-with-icon"><Mail size={18} aria-hidden="true" />
                <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="grace.dailo@email.com" autoComplete="email" />
              </span>
            </label>
            <label>
              Password
              <span className="input-with-icon password-input"><LockKeyhole size={18} aria-hidden="true" />
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => updateField("password", event.target.value)} placeholder="Enter your password" autoComplete="current-password" />
                <button type="button" className="password-toggle" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </span>
            </label>
            <div className="login-options">
              <label className="remember-option"><input type="checkbox" /> Remember me</label>
              <button type="button" className="text-button">Forgot password?</button>
            </div>
            <button className="primary-button login-submit" type="submit"><MapPin size={18} aria-hidden="true" /> Sign in and view routes</button>
          </form>
          <p className="login-footer">New passenger? <Link to="/login">Create an account</Link></p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
