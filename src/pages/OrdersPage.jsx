import { useAuth } from "../context/AuthContext";
import { useOrders } from "../hooks/useOrders";

export default function OrdersPage() {
  const { user } = useAuth();
  const { userOrders } = useOrders(user.id);

  const statusColor = {
    pending: "amber",
    confirmed: "teal",
    in_progress: "teal",
    ready: "green",
    delivered: "green",
    cancelled: "red",
  };

  return (
    <div className="animate-fade">
      <div className="section-title" style={{ marginBottom: 4 }}>My Orders</div>
      <p className="section-sub">{userOrders.length} order{userOrders.length !== 1 ? "s" : ""} total</p>

      {userOrders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <p style={{ color: "#8892a4" }}>No orders yet. Place your first order!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {userOrders.map((order) => (
            <div key={order.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16 }}>{order.id}</div>
                  <div style={{ color: "#8892a4", fontSize: 12, marginTop: 4 }}>{new Date(order.createdAt).toLocaleString()}</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {order.items?.map((item) => (
                      <span key={item.id} className="tag">{item.icon} {item.name} ×{item.qty}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`badge badge-${statusColor[order.status] || "amber"}`}>{order.status?.replace("_", " ")}</span>
                  <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#00c9b1", fontSize: 18, marginTop: 8 }}>₦{order.total?.toLocaleString()}</div>
                </div>
              </div>

              {order.schedule && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 10, fontSize: 12, color: "#8892a4" }}>
                  📅 Pickup: {order.schedule.pickupDate} at {order.schedule.pickupTime} · 🚚 {order.delivery} delivery
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width:
                        {
                          pending: "15%",
                          confirmed: "35%",
                          in_progress: "60%",
                          ready: "85%",
                          delivered: "100%",
                          cancelled: "0%",
                        }[order.status] || "15%",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
