"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function SecretariatCases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await API.get("/cases");
        setCases(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCases();
  }, []);

  const assignCase = async (caseId, managerId) => {
    try {
      const res = await API.put(`/cases/${caseId}/assign`, { managerId });
      setCases((prev) => prev.map((c) => (c._id === caseId ? res.data : c)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Inbox - Secretariat</h2>
      {cases.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Tracking ID:</strong> {c.trackingId}</p>
          <p><strong>Department:</strong> {c.department}</p>
          <p><strong>Status:</strong> {c.status}</p>
          <p><strong>Notes:</strong> {c.notes?.join(", ") || "None"}</p>
          <button onClick={() => assignCase(c._id, "managerUserIdHere")}>Assign to Manager</button>
        </div>
      ))}
    </div>
  );
}