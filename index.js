const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());


app.use(cors());

let userProfiles = {};

const getCareerSuggestions = (skills, interests) => {
  let suggestions = [];

  if (skills.includes("coding") || interests.includes("tech")) {
    suggestions.push("Software Developer", "AI Engineer", "Cybersecurity Analyst");
  }
  if (skills.includes("design") || interests.includes("art")) {
    suggestions.push("UX/UI Designer", "Creative Director", "Game Designer");
  }
  if (skills.includes("leadership") || interests.includes("business")) {
    suggestions.push("Project Manager", "Startup Consultant", "Business Analyst");
  }
  if (skills.includes("communication") || interests.includes("media")) {
    suggestions.push("Marketing Specialist", "Content Creator", "PR Manager");
  }
  if (skills.includes("empathy") || interests.includes("healthcare")) {
    suggestions.push("Psychologist", "Nutritionist", "Medical Researcher");
  }

  return suggestions;
};

// Endpoint to save profile data
app.post("/api/saveProfile", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required!" });
  }

  // Save the user profile (in-memory for this example)
  userProfiles[email] = { name, email };

  res.status(200).json({ message: "Profile saved successfully!" });
});

app.post("/api/analyzeCareer", (req, res) => {
  const { skills, interests } = req.body;

  if (!skills || !interests) {
    return res.status(400).json({ message: "Skills and interests are required!" });
  }

  // Get career suggestions based on skills and interests
  const suggestions = getCareerSuggestions(skills.toLowerCase(), interests.toLowerCase());

  res.status(200).json({ suggestions });
});

// Start the server
app.listen(port, () => {
  console.log('Server//localhost:${port}')
  }
);
