import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { addToast, updateEmployee } = useApp();
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    department: user.department || "",
    jobRole: user.jobRole || "",
    employeeId: user.employeeId || "",
    staffNumber: user.staffNumber || "",
    salary: user.salary || "",
  });

  const handleSave = () => {
    updateEmployee({
      ...user,
      name: form.name,
      phone: form.phone,
      address: form.address,
      department: form.department,
      jobRole: form.jobRole,
    });
    addToast("Profile updated!", "success");
  };

  return (
    <div className="animate-fade" style={{ maxWidth: 640 }}>
      <div className="section-title" style={{ marginBottom: 4 }}>Profile</div>
      <p className="section-sub">Review and manage your employee details</p>

      <div className="card" style={{ padding: 28, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #00c9b1, #f4a261)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: 24, color: "#0a1628", flex: "0 0 auto" }}>
            {user.name[0]}
          </div>
          <div>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18 }}>{user.name}</div>
            <div style={{ color: "#8892a4", fontSize: 13 }}>{user.email}</div>
            <span className={`badge ${user.role === "admin" ? "badge-amber" : "badge-teal"}`} style={{ marginTop: 6 }}>{user.role}</span>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="input-field" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="input-field" value={form.email} disabled />
          </div>
        </div>

        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input className="input-field" value={form.employeeId} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Staff Number</label>
            <input className="input-field" value={form.staffNumber} disabled />
          </div>
        </div>

        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input className="input-field" value={form.department} onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Job Role</label>
            <input className="input-field" value={form.jobRole} onChange={(event) => setForm((prev) => ({ ...prev, jobRole: event.target.value }))} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Salary</label>
          <input className="input-field" value={`₦${Number(form.salary).toLocaleString()}`} disabled />
        </div>

        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="input-field" value={form.phone} placeholder="08012345678" onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="input-field" value={form.address} placeholder="Your default address" onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))} />
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
      </div>

      <button className="btn btn-danger" style={{ width: "100%", justifyContent: "center" }} onClick={logout}>Sign Out</button>
    </div>
  );
}
