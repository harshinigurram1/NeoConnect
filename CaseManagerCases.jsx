"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function CaseManagerCases({ managerId }) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchAssignedCases = async () => {
      try {
        const res = await API.get(`/cases/assigned/${managerId}`);
        setCases(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAssignedCases();
  }, [managerId]);

  const updateCase = async (caseId, status, note) => {
    try {
      const res = await API.put(`/cases/${caseId}/update`, { status, notes: note });
      setCases((prev) => prev.map((c) => (c._id === caseId ? res.data : c)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Cases - Case Manager</h2>
      {cases.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Tracking ID:</strong> {c.trackingId}</p>
          <p><strong>Department:</strong> {c.department}</p>
          <p><strong>Status:</strong> {c.status}</p>
          <p><strong>Notes:</strong> {c.notes?.join(", ") || "None"}</p>
          <input type="text" placeholder="Add note" id={`note-${c._id}`} />
          <select id={`status-${c._id}`}>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button onClick={() => {
            const note = document.getElementById(`note-${c._id}`).value;
            const status = document.getElementById(`status-${c._id}`).value;
            updateCase(c._id, status, note);
          }}>Update Case</button>
        </div>
      ))}
    </div>
  );
}