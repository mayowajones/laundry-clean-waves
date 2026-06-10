import { useState } from "react";
import { useApp } from "../context/AppContext";
import { EMPLOYEES } from "../data/constants";

const ADMIN_EMAIL = "olumayowajones@gmail.com";
const ADMIN_PASSWORD = "oluwaseun44@";

export default function AuthPage({ onLogin }) {
  const [role, setRole] = useState("Customer");
  const [customerTab, setCustomerTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToast } = useApp();

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    if (error) setError("");
  };

  const handleCustomerLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const userName = form.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ").trim() || "Customer";
      const user = {
        id: `u_${Date.now()}`,
        name: `${userName.charAt(0).toUpperCase() + userName.slice(1)}`,
        email: form.email,
        password: form.password,
        role: "user",
        phone: form.phone,
        address: form.address,
      };

      addToast(`Welcome back, ${user.name.split(" ")[0]}!`, "success");
      onLogin(user);
      setLoading(false);
    }, 900);
  };

  const handleCustomerRegister = (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please complete name, email, and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser = {
        id: `u_${Date.now()}`,
        name: form.name,
        email: form.email,
        password: form.password,
        role: "user",
        phone: form.phone,
        address: form.address,
      };
      addToast("Account created! Welcome to Clean Waves 🎉", "success");
      onLogin(newUser);
      setLoading(false);
    }, 900);
  };

  const handleEmployeeLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (role === "Admin") {
        const employee = EMPLOYEES.find(
          (item) =>
            item.role === "admin" &&
            item.email === ADMIN_EMAIL &&
            form.email === ADMIN_EMAIL &&
            form.password === ADMIN_PASSWORD,
        );

        if (!employee) {
          setError("Admin credentials not found. Use the correct admin email and password.");
        } else {
          addToast(`Welcome back, ${employee.name.split(" ")[0]}!`, "success");
          onLogin(employee);
        }
      } else {
        const staffName = form.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ").trim() || "Staff Member";
        const formattedName = `${staffName.charAt(0).toUpperCase() + staffName.slice(1)}`;
        const staff = {
          id: `s_${Date.now()}`,
          name: formattedName,
          email: form.email,
          password: form.password,
          role: "staff",
          employeeId: `STF-${Date.now()}`,
          staffNumber: `CW-${Math.floor(1000 + Math.random() * 9000)}`,
          department: "General",
          jobRole: "Staff",
          salary: 0,
          phone: "",
          address: "",
        };

        addToast(`Welcome back, ${staff.name.split(" ")[0]}!`, "success");
        onLogin(staff);
      }
      setLoading(false);
    }, 900);
  };

  const isCustomer = role === "Customer";

  return (
    <div style={styles.page}>
      <div style={styles.deco1} />
      <div style={styles.deco2} />

      <div style={styles.wavesWrapper}>
        <svg
          viewBox="0 0 700 90"
          preserveAspectRatio="none"
          width="100%"
          height="90"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 C100,20 200,70 350,45 C500,20 600,65 700,40 L700,90 L0,90Z"
            fill="#132040"
          />
          <path
            d="M0,65 C120,40 250,80 400,60 C550,40 650,75 700,55 L700,90 L0,90Z"
            fill="#1a2d50"
          />
        </svg>
      </div>

      <div className="card auth-card" style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logoCircle}>
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 25 C9 17 13 29 17 21 C21 13 25 27 29 19 C33 11 37 23 37 23"
                stroke="#1a5cbf"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M5 32 C9 24 13 36 17 28 C21 20 25 34 29 26 C33 18 37 30 37 30"
                stroke="#0a3a8c"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="31" cy="12" r="5" fill="#1a5cbf" />
              <path
                d="M28 12 L30.5 14.5 L34 10"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={styles.brandName}>Clean Waves</div>
          <div style={styles.tagline}>Lagos' best laundry solution for customers, staff & admin</div>
        </div>

        <div style={styles.tabs}>
          {['Customer', 'Admin', 'Staff'].map((item) => (
            <button
              key={item}
              style={{
                ...styles.tab,
                ...(role === item ? styles.tabActive : {}),
              }}
              onClick={() => {
                setRole(item);
                setError("");
                setLoading(false);
                setCustomerTab("login");
                setForm({ name: "", email: "", password: "", phone: "", address: "" });
              }}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {isCustomer && (
          <div style={styles.subTabs}>
            {['login', 'register'].map((tab) => (
              <button
                key={tab}
                style={{
                  ...styles.subTab,
                  ...(customerTab === tab ? styles.subTabActive : {}),
                }}
                onClick={() => {
                  setCustomerTab(tab);
                  setError("");
                }}
                type="button"
              >
                {tab === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>
        )}

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={isCustomer ? (customerTab === 'login' ? handleCustomerLogin : handleCustomerRegister) : handleEmployeeLogin}>
          {isCustomer && customerTab === 'register' && (
            <>
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Your full name"
              />
            </>
          )}

          <label className="form-label" htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={isCustomer ? "you@example.com" : "staff@cleanwaves.ng"}
            value={form.email}
            onChange={handleChange}
            className="input-field"
          />

          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="input-field"
          />

          {isCustomer && customerTab === 'register' && (
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <label className="form-label" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="08012345678"
                />
              </div>
              <div style={styles.formColumn}>
                <label className="form-label" htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your address"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              ...styles.btn,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading
              ? 'Working...'
              : isCustomer
              ? customerTab === 'login'
                ? 'Sign in as Customer'
                : 'Create Customer Account'
              : `Sign in as ${role}`}
          </button>
        </form>

        <div style={styles.footerText}>
          {isCustomer
            ? customerTab === 'login'
              ? 'New customer? Use the register tab to create an account.'
              : 'Already have an account? Switch to Sign In.'
            : 'Admin and staff should login with their company credentials.'}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #020d23 0%, #071a3f 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  deco1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: '#132040',
    top: '-80px',
    left: '-80px',
  },
  deco2: {
    position: 'absolute',
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: '#132040',
    bottom: '-40px',
    right: '-40px',
    opacity: 0.6,
  },
  wavesWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90px',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '2rem',
    width: '100%',
    maxWidth: '440px',
    position: 'relative',
    zIndex: 2,
    boxSizing: 'border-box',
  },
  logoWrap: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  logoCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    background: '#dbeeff',
    marginBottom: '10px',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#0a1628',
    letterSpacing: '-0.3px',
  },
  tagline: {
    fontSize: '12px',
    color: '#7a8aaa',
    marginTop: '4px',
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    background: '#f0f4f8',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '1rem',
    gap: '4px',
  },
  subTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    background: '#f8fafc',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '1rem',
    gap: '4px',
  },
  tab: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    background: 'transparent',
    borderRadius: '7px',
    cursor: 'pointer',
    color: '#7a8aaa',
    transition: 'all 0.2s',
    minWidth: '100px',
  },
  subTab: {
    flex: 1,
    padding: '8px 10px',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    background: 'transparent',
    borderRadius: '7px',
    cursor: 'pointer',
    color: '#7a8aaa',
    transition: 'all 0.2s',
    minWidth: '110px',
  },
  tabActive: {
    background: '#0a1628',
    color: '#ffffff',
  },
  subTabActive: {
    background: '#0a1628',
    color: '#ffffff',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#eef3fd',
    border: '1px solid #c7d8f8',
    borderRadius: '10px',
    padding: '10px 14px',
    marginBottom: '1rem',
    fontSize: '13px',
  },
  badgeText: {
    fontSize: '12px',
    color: '#1a5cbf',
  },
  errorMessage: {
    background: 'rgba(230,57,70,0.1)',
    border: '1px solid rgba(230,57,70,0.3)',
    borderRadius: 10,
    padding: '12px 14px',
    color: '#e63946',
    fontSize: 13,
    marginBottom: 16,
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#344060',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    border: '1.5px solid #d8e0ed',
    borderRadius: '12px',
    background: '#f8fafc',
    color: '#0a1628',
    outline: 'none',
    marginBottom: '1rem',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    padding: '14px',
    fontSize: '15px',
    fontWeight: 700,
    background: '#0a1628',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginTop: '0.5rem',
  },
  forgot: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '12px',
    color: '#7a8aaa',
  },
  forgotLink: {
    color: '#1a5cbf',
    cursor: 'pointer',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '13px',
    color: '#8892a4',
    lineHeight: 1.5,
  },
  formRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  formColumn: {
    flex: '1 1 200px',
    minWidth: '140px',
  },
};
