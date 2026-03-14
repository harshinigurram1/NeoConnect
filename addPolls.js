// backend/addPolls.js
const axios = require("axios");

// Make sure your backend is running and change port if needed
const API_URL = "http://localhost:5000/api/polls"; 

// 10 example polls for staff
const polls = [
  {
    question: "How satisfied are you with your workplace environment?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
  },
  {
    question: "How effective is internal communication in your department?",
    options: ["Excellent", "Good", "Average", "Poor"]
  },
  {
    question: "Which facility would you like the company to improve first?",
    options: ["Cafeteria", "Restrooms", "Meeting Rooms", "Parking", "Workspace"]
  },
  {
    question: "Do you feel the company policies are fair?",
    options: ["Yes, very fair", "Somewhat fair", "Neutral", "Not fair"]
  },
  {
    question: "How likely are you to recommend NeoConnect to a colleague?",
    options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"]
  },
  {
    question: "How satisfied are you with the IT support services?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
  },
  {
    question: "Do you feel management listens to staff feedback?",
    options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
  },
  {
    question: "Which type of training would help you most?",
    options: ["Technical", "Soft Skills", "Leadership", "Compliance", "Other"]
  },
  {
    question: "How safe do you feel in your workplace?",
    options: ["Very Safe", "Safe", "Neutral", "Unsafe", "Very Unsafe"]
  },
  {
    question: "Do you feel your workload is manageable?",
    options: ["Yes, very manageable", "Mostly manageable", "Neutral", "Too heavy", "Overwhelming"]
  }
];

// Function to add polls with proper error logging
async function addPolls() {
  for (let poll of polls) {
    try {
      const res = await axios.post(API_URL, poll, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(`✅ Poll added: "${res.data.question}"`);
    } catch (err) {
      console.error("❌ Error adding poll:", err.response ? err.response.data : err.message);
    }
  }
}

addPolls();