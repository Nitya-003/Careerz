const form = document.getElementById("careerForm");
const resultArea = document.getElementById("result");
const careerCards = document.getElementById("careerCards");

const profileForm = document.getElementById("profileForm");
const profileBox = document.getElementById("profileBox");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");

profileForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  displayName.textContent = name;
  displayEmail.textContent = email;
  profileBox.classList.remove("hidden");

  profileForm.reset();
});


form.addEventListener("submit", function(e) {
  e.preventDefault();
  const skills = document.getElementById("skills").value.toLowerCase();
  const interests = document.getElementById("interests").value.toLowerCase();

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

  careerCards.innerHTML = "";
  if (suggestions.length > 0) {
    suggestions.forEach(career => {
      const card = document.createElement("div");
      card.className = "career-card";
      card.innerHTML = `<h3><i class="fas fa-check-circle"></i> ${career}</h3>
      <p>This career aligns with your current skills and interests. Explore courses or jobs in this area to grow further!</p>`;
      careerCards.appendChild(card);
    });
  } else {
    careerCards.innerHTML = `<p>No suggestions found. Try more diverse inputs!</p>`;
  }

  resultArea.classList.remove("hidden");
  resultArea.scrollIntoView({ behavior: "smooth" });
});
