import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useCart } from "../context/CartContext";
import { SERVICES } from "../data/constants";

export default function ServicesPage() {
  const { addToast } = useApp();
  const { dispatch } = useCart();
  const [selected, setSelected] = useState(null);

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: 32 }}>
        <div className="section-title">Our Services</div>
        <p className="section-sub">Choose from our range of professional laundry solutions</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 40 }}>
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`card service-card ${selected === service.id ? "selected" : ""}`}
            onClick={() => setSelected(selected === service.id ? null : service.id)}
          >
            <div className="service-icon">{service.icon}</div>
            <div className="service-name">{service.name}</div>
            <p className="service-desc">{service.desc}</p>
            <div className="service-price">
              ₦{service.price.toLocaleString()}
              <span style={{ fontSize: 12, color: "#8892a4", fontWeight: 400 }}>{service.unit}</span>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch({ type: "ADD_ITEM", item: { id: service.id, name: service.name, icon: service.icon, serviceType: service.id, price: service.price, unit: service.unit } });
                  addToast(`${service.name} added to cart`, "success");
                }}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 36 }}>🚚</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Free Pickup & Delivery</div>
            <p style={{ color: "#8892a4", fontSize: 13 }}>We pick up from your door and return cleaned clothes within 24–48 hours anywhere in Lagos.</p>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              ["📍", "All of Lagos"],
              ["⏱", "24-48 hrs"],
              ["🔒", "Insured"],
            ].map(([icon, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div style={{ fontSize: 12, color: "#8892a4", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
