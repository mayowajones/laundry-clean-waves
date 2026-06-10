import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { ADMIN_HEAD_CONTACT } from "../data/constants";

export default function AdminDashboard() {
  const { orders, updateOrderStatus, employees } = useApp();

  const stats = {
    totalOrders: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    inProgress: orders.filter((order) => order.status === "in_progress").length,
    revenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    totalEmployees: employees.length,
    totalStaff: employees.filter((employee) => employee.role === "staff").length,
  };

  const statusFlow = ["pending", "confirmed", "in_progress", "ready", "delivered"];

  const orderAlerts = useMemo(
    () => orders.filter((order) => order.status === "pending" || order.status === "confirmed"),
    [orders],
  );

  const handleWhatsApp = (orderId) => {
    const phone = ADMIN_HEAD_CONTACT.whatsapp.replace(/\D/g, "");
    const text = encodeURIComponent(`Payment confirmation request for order ${orderId}. Please verify and respond.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const handleBankAlert = (orderId) => {
    const message = `Bank alert voice note prepared for order ${orderId}. Notify ${ADMIN_HEAD_CONTACT.name} at ${ADMIN_HEAD_CONTACT.phone}.`;
    alert(message);
  };

  return (
    <div className="animate-fade">
      <div className="dashboard-header">
        <div>
          <div className="section-title">Admin Panel</div>
          <p className="section-subtitle">FreshWave operations dashboard for orders, alerts, and team performance.</p>
        </div>
        <div className="badge badge-teal">Live</div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: 28 }}>
        {[
          { label: "Total Orders", value: stats.totalOrders, icon: "ORD", color: "#00c9b1" },
          { label: "Employees", value: stats.totalEmployees, icon: "EMP", color: "#f4a261" },
          { label: "Staff", value: stats.totalStaff, icon: "STF", color: "#a78bfa" },
        ].map((metric) => (
          <div key={metric.label} className="card stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="stat-num" style={{ color: metric.color }}>{metric.value}</div>
                <div className="stat-label">{metric.label}</div>
              </div>
              <div style={{ fontSize: 32 }}>{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="section-title">Admin Contact</div>
            <div className="section-subtitle">All payment confirmations are routed through the admin head.</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{ADMIN_HEAD_CONTACT.name}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{ADMIN_HEAD_CONTACT.phone}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>WhatsApp only</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="section-title">Payment Confirmation Alerts</div>
            <div className="section-subtitle">Send payment notifications to the admin head via WhatsApp or bank alert voice note.</div>
          </div>
          <div className="status-pill">Admin Head</div>
        </div>

        {orderAlerts.length === 0 ? (
          <div className="empty-state">No recent payment alerts.</div>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {orderAlerts.map((order) => (
              <div key={order.id} className="order-row">
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>{order.id}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{order.userName || "Customer"} - {new Date(order.createdAt).toLocaleString()}</div>
                  <div style={{ marginTop: 8, fontSize: 13 }}>
                    Status: <span className="status-pill">{order.status.replace("_", " ")}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <button className="btn btn-outline" type="button" onClick={() => handleWhatsApp(order.id)} style={{ minWidth: 180 }}>
                    Send WhatsApp Alert
                  </button>
                  <button className="btn btn-primary" type="button" onClick={() => handleBankAlert(order.id)} style={{ minWidth: 180 }}>
                    Bank Alert Voice Note
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 20, flexWrap: "wrap" }}>
          <div>
            <div className="section-title">All Orders</div>
            <div className="section-subtitle">Review order status and update progress from pending to delivered.</div>
          </div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#00c9b1", fontSize: 22 }}>NGN {stats.revenue.toLocaleString()} revenue</div>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#8892a4" }}>No orders yet</div>
        ) : (
          orders.map((order, index) => (
            <div key={order.id} className="order-row animate-fade" style={{ animationDelay: `${index * 0.04}s` }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14 }}>{order.id}</div>
                <div style={{ fontSize: 12, color: "#8892a4" }}>{order.userName} - {new Date(order.createdAt).toLocaleString()}</div>
                <div style={{ marginTop: 4, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {order.items?.slice(0, 3).map((item) => (
                    <span key={item.id} className="tag">{item.icon} {item.name}</span>
                  ))}
                  {(order.items?.length || 0) > 3 && <span className="tag">+{order.items.length - 3} more</span>}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#00c9b1" }}>NGN {order.total?.toLocaleString()}</div>
                <select
                  className="input-field"
                  style={{ padding: "6px 10px", fontSize: 12, width: "auto" }}
                  value={order.status}
                  onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                >
                  {statusFlow.map((status) => (
                    <option key={status} value={status}>{status.replace("_", " ")}</option>
                  ))}
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
            </div>
          )))}
      </div>
    </div>
  );
}
