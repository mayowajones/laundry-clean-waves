import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ChatBox from "./ChatBox";

export default function MainLayout({ children, page, setPage }) {
  const { user } = useAuth();
  const { state } = useCart();

  const cartCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  const userNavItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "services", label: "Services", icon: "✨" },
    { id: "products", label: "Order Items", icon: "👕" },
    { id: "cart", label: "Cart", icon: "🛒", badge: cartCount },
    { id: "orders", label: "My Orders", icon: "📦" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const adminNavItems = [
    { id: "admin", label: "Dashboard", icon: "📊" },
    { id: "directory", label: "Directory", icon: "👥" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : userNavItems;

  return (
    <div className="main-layout" style={{ display: "flex", minHeight: "100vh" }}>
      <aside className="sidebar" style={{
          background: "#112240",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 14px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        <div className="logo-mark" style={{ marginBottom: 32, paddingLeft: 8 }}>
          Fresh<span>Wave</span>
        </div>

        <nav className="sidebar-nav" style={{ flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#00c9b1",
                    color: "#0a1628",
                    borderRadius: "50px",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "1px 7px",
                    fontFamily: "Syne",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00c9b1, #f4a261)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Syne",
                fontWeight: 800,
                fontSize: 14,
                color: "#0a1628",
                flexShrink: 0,
              }}
            >
              {user?.name?.[0]}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.name}
              </div>
              <div style={{ fontSize: 11, color: "#8892a4" }}>{user?.role}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="content-area" style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
        <div style={{ padding: "32px 32px", maxWidth: 1100, margin: "0 auto" }}>{children}</div>
        <ChatBox />
      </main>
    </div>
  );
}
