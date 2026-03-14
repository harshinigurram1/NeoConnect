import "./globals.css"

export default function Home() {
  return (

<div className="home-container">

<h1 className="home-title">NeoConnect</h1>

<p className="home-subtitle">
Staff Feedback & Complaint Platform
</p>

<div className="home-grid">

<a href="/submit" className="home-card">
<h3>Submit Complaint</h3>
<p>Report workplace issues safely</p>
</a>

<a href="/track" className="home-card">
<h3>Track Complaint</h3>
<p>Check the status using tracking ID</p>
</a>

<a href="/dashboard" className="home-card">
<h3>Analytics Dashboard</h3>
<p>View complaints and statistics</p>
</a>

<a href="/polls" className="home-card">
<h3>Staff Polls</h3>
<p>Vote on organizational topics</p>
</a>

<a href="/hub" className="home-card">
<h3>Public Hub</h3>
<p>View updates and resolved cases</p>
</a>

</div>

</div>

  )
}