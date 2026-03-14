"use client"

import { useState } from "react"
import API from "@/lib/api"
import "../globals.css"

export default function Track(){

const [trackingId,setTrackingId] = useState("")
const [caseData,setCaseData] = useState(null)

const handleTrack = async ()=>{

 try{

  const res = await API.get(`/cases/track/${trackingId}`)

  setCaseData(res.data)

 }catch(err){

  alert("Complaint not found")

 }

}

return(

<div className="track-container">

<div className="track-card">

<h2 className="track-title">Track Your Complaint</h2>

<div className="track-search">

<input
type="text"
placeholder="Enter Tracking ID (Example: NEO-2026-001)"
value={trackingId}
onChange={(e)=>setTrackingId(e.target.value)}
/>

<button onClick={handleTrack}>
Track
</button>

</div>

{caseData && (

<div className="track-result">

<h3>Complaint Details</h3>

<div className="result-grid">

<p><b>Tracking ID</b><br/>{caseData.trackingId}</p>

<p><b>Category</b><br/>{caseData.category}</p>

<p><b>Department</b><br/>{caseData.department}</p>

<p><b>Status</b><br/>
<span className={`status ${caseData.status.toLowerCase()}`}>
{caseData.status}
</span>
</p>

</div>

<div className="description">

<b>Description</b>

<p>{caseData.description}</p>

</div>

</div>

)}

</div>

</div>

)

}