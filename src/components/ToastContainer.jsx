import { COLORS } from "../data/constants";

export default function ToastContainer({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide"
          style={{
            padding: "12px 20px",
            borderRadius: 12,
            minWidth: 220,
            maxWidth: 320,
            background:
              toast.type === "success"
                ? "rgba(6,214,160,0.15)"
                : toast.type === "error"
                ? "rgba(230,57,70,0.15)"
                : "rgba(0,201,177,0.12)",
            border: `1px solid ${
              toast.type === "success"
                ? "rgba(6,214,160,0.4)"
                : toast.type === "error"
                ? "rgba(230,57,70,0.4)"
                : "rgba(0,201,177,0.3)"
            }`,
            color: toast.type === "success" ? COLORS.green : toast.type === "error" ? COLORS.red : COLORS.teal,
            fontSize: 13,
            fontWeight: 500,
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>{toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
