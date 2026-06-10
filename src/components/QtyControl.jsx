export default function QtyControl({ value, onChange, min = 0, max = 10 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button className="qty-btn" disabled={value <= min} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span className="qty-num">{value}</span>
      <button className="qty-btn" disabled={value >= max} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
