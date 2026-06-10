import { useApp } from "../context/AppContext";
import { useCart } from "../context/CartContext";

export default function CartPage({ onCheckout }) {
  const { state, dispatch } = useCart();
  const { addToast } = useApp();
  const { items, schedule, delivery } = state;

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = delivery === "express" ? 2500 : delivery === "standard" ? 1200 : 800;

  if (items.length === 0) {
    return (
      <div className="animate-fade" style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Your cart is empty</div>
        <p style={{ color: "#8892a4", marginBottom: 24 }}>Add some laundry items or services to get started</p>
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div className="section-title">Cart ({items.length} items)</div>
            <button className="btn btn-ghost btn-sm" onClick={() => { dispatch({ type: "CLEAR" }); addToast("Cart cleared", "info"); }}>
              Clear All
            </button>
          </div>

          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="cart-item animate-fade" style={{ animationDelay: `${index * 0.05}s` }}>
              <div style={{ fontSize: 36, flex: "0 0 auto" }}>{item.icon || "👕"}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                <div className="badge badge-teal" style={{ marginTop: 4, marginBottom: 8 }}>{item.serviceName || item.serviceType}</div>
                {item.note && <div style={{ fontSize: 12, color: "#8892a4", marginBottom: 8 }}>📝 {item.note}</div>}
                <textarea
                  className="input-field"
                  placeholder="Add washing instructions..."
                  defaultValue={item.note || ""}
                  onBlur={(event) => dispatch({ type: "UPDATE_NOTE", id: item.id, serviceType: item.serviceType, note: event.target.value })}
                  style={{ minHeight: 50, fontSize: 12 }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#00c9b1", fontSize: 16, whiteSpace: "nowrap" }}>
                  ₦{(item.price * item.qty).toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button className="qty-btn" disabled={item.qty <= 1} onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, serviceType: item.serviceType, qty: item.qty - 1 })}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" disabled={item.qty >= 10} onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, serviceType: item.serviceType, qty: item.qty + 1 })}>+</button>
                </div>
                <button style={{ background: "none", border: "none", color: "#8892a4", cursor: "pointer", fontSize: 18 }} onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id, serviceType: item.serviceType })}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "sticky", top: 20 }}>
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Pickup & Delivery</div>

            <div className="form-group">
              <label className="form-label">Pickup Date</label>
              <input
                className="input-field"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={schedule?.pickupDate || ""}
                onChange={(event) => dispatch({ type: "SET_SCHEDULE", schedule: { ...schedule, pickupDate: event.target.value } })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pickup Time</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  "8:00 AM",
                  "9:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                ].map((slot) => (
                  <div
                    key={slot}
                    className={`time-slot ${schedule?.pickupTime === slot ? "selected" : ""}`}
                    onClick={() => dispatch({ type: "SET_SCHEDULE", schedule: { ...schedule, pickupTime: slot } })}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Type</label>
              <select
                className="input-field"
                value={delivery || "standard"}
                onChange={(event) => dispatch({ type: "SET_DELIVERY", delivery: event.target.value })}
              >
                <option value="standard">Standard (48hr) — ₦1,200</option>
                <option value="next-day">Next Day — ₦800</option>
                <option value="express">Express 4hr — ₦2,500</option>
              </select>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Order Summary</div>
            {items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: "#8892a4" }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ color: "#ffffff" }}>₦{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: "#8892a4" }}>
              <span>Delivery fee</span>
              <span style={{ color: "#ffffff" }}>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Syne", fontWeight: 700, fontSize: 18, marginTop: 12 }}>
              <span>Total</span>
              <span style={{ color: "#00c9b1" }}>₦{(total + deliveryFee).toLocaleString()}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16, padding: "14px" }}
              onClick={() => onCheckout(total + deliveryFee)}
            >
              Proceed to Payment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
