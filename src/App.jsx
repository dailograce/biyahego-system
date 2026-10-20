import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { BusFront, CalendarCheck, LayoutDashboard, LogOut, Menu, Route as RouteIcon, ShieldCheck, TicketCheck, UserRound, X } from "lucide-react";
import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import RoutesPage from "./pages/RoutesPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import TicketsPage from "./pages/TicketsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/routes", label: "Routes", icon: RouteIcon },
  { to: "/book", label: "Book", icon: CalendarCheck },
  { to: "/tickets", label: "Tickets", icon: TicketCheck }
];

function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => sessionStorage.getItem("biyahego-user"));

  const login = (name) => {
    const formattedName = name.replace(/\b\w/g, (letter) => letter.toUpperCase());
    sessionStorage.setItem("biyahego-user", formattedName);
    setUser(formattedName);
  };

  const logout = () => {
    sessionStorage.removeItem("biyahego-user");
    setUser("");
    setOpen(false);
  };

  if (!user) {
    return <Routes><Route path="/login" element={<LoginPage onLogin={login} />} /><Route path="*" element={<Navigate to="/login" replace />} /></Routes>;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true"><BusFront size={26} /></span>
          <div>
            <strong>BIYAHEGO</strong>
            <span>Transport Hub</span>
          </div>
        </div>
        <nav className="nav-list">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="side-note">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>Accessible booking flow with mock API route data.</span>
        </div>
        <button className="sidebar-logout" type="button" onClick={logout}><LogOut size={18} aria-hidden="true" /> Sign out</button>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div>
            <p className="eyebrow">Transportation Sector</p>
            <h1>Smart route booking for Butuan City commuters</h1>
          </div>
          <div className="user-status" aria-label={`Signed in as ${user}`}>
            <span className="user-avatar" aria-hidden="true"><UserRound size={17} /></span>
            <span><strong>{user}</strong><small>Passenger account</small></span>
          </div>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
