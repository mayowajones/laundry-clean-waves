import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useCart } from "../context/CartContext";
import { PRODUCTS, SERVICES } from "../data/constants";
import QtyControl from "../components/QtyControl";

export default function ProductsPage() {
  const { addToast } = useApp();
  const { dispatch } = useCart();
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [quantities, setQuantities] = useState({});
  const [notes, setNotes] = useState({});
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(PRODUCTS.map((product) => product.category))];
  const filteredProducts = filter === "All" ? PRODUCTS : PRODUCTS.filter((product) => product.category === filter);

  const getQty = (id) => quantities[id] || 0;
  const setQty = (id, qty) => setQuantities((prev) => ({ ...prev, [id]: Math.max(0, Math.min(10, qty)) }));

  const getNote = (id) => notes[id] || "";
  const setNote = (id, value) => setNotes((prev) => ({ ...prev, [id]: value }));

  const handleAddToCart = (product) => {
    const qty = getQty(product.id);
    if (qty === 0) {
      addToast("Please set quantity before adding", "error");
      return;
    }

    const price = Math.round(product.basePrice * (selectedService.price / 1200));
    const itemId = `${product.id}-${selectedService.id}`;
    dispatch({
      type: "ADD_ITEM",
      item: {
        id: itemId,
        name: product.name,
        icon: product.icon,
        serviceType: selectedService.id,
        serviceName: selectedService.name,
        price,
        note: getNote(product.id),
      },
    });
    dispatch({ type: "UPDATE_QTY", id: itemId, serviceType: selectedService.id, qty });

    addToast(`${qty}x ${product.name} added to cart`, "success");
    setQty(product.id, 0);
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: 24 }}>
        <div className="section-title">Select Items</div>
        <p className="section-sub">Choose your garments, set quantity and instructions</p>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div className="form-label">Select Service Type</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          {SERVICES.map((service) => (
            <button
              key={service.id}
              className={`chip ${selectedService.id === service.id ? "active" : ""}`}
              onClick={() => setSelectedService(service)}
            >
              {service.icon} {service.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {categories.map((category) => (
          <button
            key={category}
            className={`chip ${filter === category ? "active" : ""}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 32, marginBottom: 6 }}>{product.icon}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14 }}>{product.name}</div>
                <div className="tag" style={{ marginTop: 4 }}>{product.category}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, color: "#00c9b1", fontSize: 16 }}>₦{product.basePrice.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "#8892a4" }}>per item</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#8892a4" }}>Quantity</span>
              <QtyControl value={getQty(product.id)} onChange={(quantity) => setQty(product.id, quantity)} />
            </div>

            <div style={{ marginBottom: 12 }}>
              <textarea
                className="input-field"
                placeholder="Special instructions (e.g. gentle wash, no bleach...)"
                value={getNote(product.id)}
                onChange={(event) => setNote(product.id, event.target.value)}
                style={{ minHeight: 60, fontSize: 12 }}
              />
            </div>

            <button
              className="btn btn-primary btn-sm"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => handleAddToCart(product)}
              disabled={getQty(product.id) === 0}
            >
              {getQty(product.id) === 0 ? "Set quantity" : `Add ${getQty(product.id)} to Cart`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
