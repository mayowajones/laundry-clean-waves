import { useAuth } from "../context/AuthContext";
import { useOrders } from "../hooks/useOrders";
import { SERVICES } from "../data/constants";

export default function UserHome({ setPage }) {
  const { user } = useAuth();
  const { userOrders } = useOrders(user.id);

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: 32, padding: "28px 28px", background: "linear-gradient(135deg, rgba(0,201,177,0.12), rgba(244,162,97,0.06))", borderRadius: 20, border: "1px solid rgba(0,201,177,0.15)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -10, top: -10, fontSize: 100, opacity: 0.07 }}>🌊</div>
        <div style={{ fontSize: 13, color: "#00c9b1", fontFamily: "Syne", fontWeight: 600, marginBottom: 6 }}>Welcome back 👋</div>
        <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26 }}>{user.name}</div>
        {user.address && <p style={{ color: "#8892a4", fontSize: 13, marginTop: 6 }}>📍 {user.address}</p>}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn btn-primary" onClick={() => setPage("products")}>+ New Order</button>
          <button className="btn btn-outline" onClick={() => setPage("orders")}>My Orders ({userOrders.length})</button>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 28 }}>
        {[
          { icon: "📦", label: "Total Orders", value: userOrders.length },
          { icon: "✅", label: "Completed", value: userOrders.filter((order) => order.status === "delivered").length },
          { icon: "💰", label: "Total Spent", value: `₦${userOrders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}` },
        ].map((metric) => (
          <div key={metric.label} className="card stat-card">
            <div style={{ fontSize: 28, marginBottom: 8 }}>{metric.icon}</div>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, color: "#00c9b1" }}>{metric.value}</div>
            <div className="stat-label">{metric.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 28 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>Quick Services</div>
        <div className="grid-3">
          {SERVICES.slice(0, 3).map((service) => (
            <div key={service.id} className="card service-card" onClick={() => setPage("services")} style={{ cursor: "pointer" }}>
              <div className="service-icon">{service.icon}</div>
              <div className="service-name">{service.name}</div>
              <div className="service-price">
                ₦{service.price.toLocaleString()}
                <span style={{ fontSize: 11, color: "#8892a4", fontWeight: 400 }}>{service.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
