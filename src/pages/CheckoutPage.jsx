import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage({ total, onSuccess }) {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({ card: "", expiry: "", cvv: "", name: "" });
  const [loading, setLoading] = useState(false);
  const { addToast, addOrder } = useApp();
  const { state, dispatch } = useCart();
  const { user } = useAuth();

  const handleInput = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const order = addOrder({
        userId: user.id,
        userName: user.name,
        items: state.items,
        schedule: state.schedule,
        delivery: state.delivery,
        total,
        paymentMethod: method,
      });
      dispatch({ type: "CLEAR" });
      addToast(`Order ${order.id} placed successfully! 🎉`, "success");
      setLoading(false);
      onSuccess(order);
    }, 1800);
  };

  const steps = ["Confirm", "Payment", "Done"];

  return (
    <div className="animate-fade" style={{ maxWidth: 540, margin: "0 auto" }}>
      <div className="step-indicator">
        {steps.map((label, index) => (
          <span key={label} style={{ display: "contents" }}>
            <div className="step">
              <div className={`step-circle ${index < step ? "done" : index === step ? "active" : "todo"}`}>
                {index < step ? "✓" : index + 1}
              </div>
              <span className={`step-label ${index === step ? "active" : "todo"}`}>{label}</span>
            </div>
            {index < steps.length - 1 && <div className={`step-connector ${index < step ? "done" : ""}`} />}
          </span>
        ))}
      </div>

      {step === 0 && (
        <div className="card" style={{ padding: 28 }}>
          <div className="section-title" style={{ marginBottom: 20 }}>Order Review</div>
          {state.items.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name} × {item.qty}</div>
                  <div style={{ fontSize: 12, color: "#8892a4" }}>{item.serviceName || item.serviceType}</div>
                </div>
              </div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#00c9b1" }}>₦{(item.price * item.qty).toLocaleString()}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 0", fontFamily: "Syne", fontWeight: 700, fontSize: 20 }}>
            <span>Total</span>
            <span style={{ color: "#00c9b1" }}>₦{total.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} onClick={() => setStep(1)}>
            Continue to Payment →
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="card" style={{ padding: 28 }}>
          <div className="section-title" style={{ marginBottom: 20 }}>Payment</div>

          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {["card", "transfer", "ussd"].map((value) => (
              <button
                key={value}
                className={`chip ${method === value ? "active" : ""}`}
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => setMethod(value)}
              >
                {value === "card" ? "💳 Card" : value === "transfer" ? "🏦 Transfer" : "📱 USSD"}
              </button>
            ))}
          </div>

          {method === "card" && (
            <>
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input className="input-field" name="name" placeholder="As on card" value={form.name} onChange={handleInput} />
              </div>
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  className="input-field"
                  name="card"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={form.card}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      card: event.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim(),
                    }))
                  }
                />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Expiry</label>
                  <input className="input-field" name="expiry" placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={handleInput} />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input className="input-field" name="cvv" type="password" placeholder="•••" maxLength={4} value={form.cvv} onChange={handleInput} />
                </div>
              </div>
            </>
          )}

          {method === "transfer" && (
            <div className="card" style={{ padding: 20, background: "rgba(0,201,177,0.06)", textAlign: "center" }}>
              <div style={{ color: "#8892a4", fontSize: 13, marginBottom: 12 }}>Transfer to:</div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 22, color: "#00c9b1" }}>0123456789</div>
              <div style={{ color: "#8892a4", fontSize: 13 }}>Access Bank — FreshWave Laundry Ltd</div>
              <div className="divider" />
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20 }}>₦{total.toLocaleString()}</div>
            </div>
          )}

          {method === "ussd" && (
            <div className="card" style={{ padding: 20, background: "rgba(0,201,177,0.06)", textAlign: "center" }}>
              <div style={{ color: "#8892a4", fontSize: 13, marginBottom: 12 }}>Dial on your phone:</div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, color: "#00c9b1" }}>*737*{total}#</div>
              <div style={{ color: "#8892a4", fontSize: 12, marginTop: 8 }}>Valid for 10 minutes</div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(0)}>
              ← Back
            </button>
            <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={handlePay} disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" /> Processing…
                </>
              ) : (
                `Pay ₦${total.toLocaleString()}`
              )}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <div className="section-title">Order Placed!</div>
          <p style={{ color: "#8892a4", marginTop: 8 }}>Your laundry will be picked up at the scheduled time.</p>
        </div>
      )}
    </div>
  );
}
