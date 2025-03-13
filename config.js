const form = document.getElementById("careerForm");
const resultArea = document.getElementById("result");
const careerCards = document.getElementById("careerCards");

const profileForm = document.getElementById("profileForm");
const profileBox = document.getElementById("profileBox");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");

// Save Profile Info
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;


  fetch("http://localhost:3000/api/saveProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Profile saved successfully!") {
        displayName.textContent = name;
        displayEmail.textContent = email;
        profileBox.classList.remove("hidden");
        profileForm.reset();
      }
    })
    .catch((error) => console.error("Error saving profile:", error));
});


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const skills = document.getElementById("skills").value;
  const interests = document.getElementById("interests").value;


  fetch("http://localhost:3000/api/analyzeCareer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ skills, interests }),
  })
    .then((response) => response.json())
    .then((data) => {
      const suggestions = data.suggestions;

      careerCards.innerHTML = "";
      if (suggestions.length > 0) {
        suggestions.forEach((career) => {
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
    })
    .catch((error) => console.error("Error analyzing career:", error));
});
