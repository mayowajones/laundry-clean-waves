import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { ADMIN_HEAD_CONTACT } from "../data/constants";

const AI_RESPONSES = [
  "I’ve forwarded this to the admin team and they will follow up shortly.",
  "Thanks for the update — the admin head will receive a notification via WhatsApp.",
  "For payment confirmation, our admin head will review the bank alert and get back to you.",
  "I’m checking the current order status for you now.",
];

export default function ChatBox() {
  const { user } = useAuth();
  const { addToast } = useApp();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    { id: 1, sender: "system", text: `Hello ${user?.name || "guest"}! This chat can connect customers, staff and admin.` },
  ]);

  const userLabel = useMemo(() => {
    if (!user) return "Guest";
    if (user.role === "admin") return "Admin";
    if (user.role === "staff") return "Staff";
    return "Customer";
  }, [user]);

  const addMessage = (sender, text) => {
    setConversation((prev) => [...prev, { id: Date.now() + Math.random(), sender, text }]);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    addMessage("user", message.trim());
    const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    setMessage("");
    setTimeout(() => {
      addMessage("assistant", reply);
    }, 650);
    if (message.toLowerCase().includes("payment")) {
      addToast("A payment alert will be delivered to the admin head.", "success");
    }
  };

  const handleWhatsApp = () => {
    const phone = ADMIN_HEAD_CONTACT.whatsapp.replace(/\D/g, "");
    const text = encodeURIComponent(`Hello ${ADMIN_HEAD_CONTACT.name}, please confirm the payment alert from ${user?.name || "a user"}.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <div className={`chat-widget ${open ? "open" : ""}`}>
      <div className="chat-header" onClick={() => setOpen((prev) => !prev)}>
        <div>
          <div style={{ fontWeight: 700 }}>AI Support</div>
          <div style={{ fontSize: 12, color: "#aab8cf" }}>{userLabel} chat</div>
        </div>
        <div style={{ fontSize: 20 }}>{open ? "–" : "+"}</div>
      </div>

      {open ? (
        <>
          <div className="chat-body">
            {conversation.map((item) => (
              <div key={item.id} className={`chat-message ${item.sender}`}>
                <div>{item.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="button" onClick={handleSend}>Send</button>
          </div>

          <div className="chat-actions">
            <button type="button" onClick={handleWhatsApp}>Alert Admin via WhatsApp</button>
            <button type="button" onClick={() => addToast("Bank alert voice note sent to admin head.", "success")}>Bank Alert Voice Note</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
