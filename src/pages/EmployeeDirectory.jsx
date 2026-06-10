import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";

export default function EmployeeDirectory() {
  const { employees } = useApp();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");

  const departments = useMemo(
    () => [...new Set(employees.map((employee) => employee.department))],
    [employees],
  );

  const filteredEmployees = useMemo(
    () =>
      employees
        .filter((employee) =>
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.email.toLowerCase().includes(search.toLowerCase()) ||
          employee.jobRole.toLowerCase().includes(search.toLowerCase()),
        )
        .filter((employee) => (department === "all" ? true : employee.department === department))
        .filter((employee) => (role === "all" ? true : employee.role === role)),
    [employees, search, department, role],
  );

  return (
    <div className="animate-fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
        <div>
          <div className="section-title">Employee Directory</div>
          <p className="section-sub">Browse admin and staff profiles with job, department, and payroll details.</p>
        </div>
        <div style={{ color: "#8892a4", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {filteredEmployees.length} results
        </div>
      </div>

      <div className="filter-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or job title"
          style={{ flex: 1, minWidth: 200, padding: "12px 14px", borderRadius: 12, border: "1px solid #d8e0ed", outline: "none" }}
        />
        <select value={department} onChange={(event) => setDepartment(event.target.value)} style={{ minWidth: 160, padding: "12px 14px", borderRadius: 12, border: "1px solid #d8e0ed", background: "#fff" }}>
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select value={role} onChange={(event) => setRole(event.target.value)} style={{ minWidth: 140, padding: "12px 14px", borderRadius: 12, border: "1px solid #d8e0ed", background: "#fff" }}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 18 }}>
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="card" style={{ padding: 24, background: "#f8fbff", border: "1px solid rgba(16, 75, 145, 0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #00c9b1, #0a5cbf)", display: "grid", placeItems: "center", color: "#fff", fontSize: 18, fontWeight: 700 }}>
                    {employee.name?.[0]}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{employee.name}</div>
                    <div style={{ fontSize: 13, color: "#5b7192" }}>{employee.jobRole} • {employee.department}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gap: 10, fontSize: 13, color: "#344060" }}>
                  <div><strong>Email:</strong> {employee.email}</div>
                  <div><strong>Employee ID:</strong> {employee.employeeId}</div>
                  <div><strong>Staff Number:</strong> {employee.staffNumber}</div>
                  <div><strong>Phone:</strong> {employee.phone}</div>
                  <div><strong>Address:</strong> {employee.address}</div>
                </div>
              </div>
              <div style={{ minWidth: 180, textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#8892a4", marginBottom: 8 }}>Role</div>
                <div style={{ display: "inline-flex", padding: "8px 12px", borderRadius: 999, background: employee.role === "admin" ? "#e8f5ff" : "#eff7f7", color: employee.role === "admin" ? "#0b4d8c" : "#0a5c49", fontWeight: 700, textTransform: "capitalize" }}>
                  {employee.role}
                </div>
                <div style={{ marginTop: 18, fontSize: 12, color: "#8892a4" }}>Monthly salary</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>₦{employee.salary.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
