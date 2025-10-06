const ids = ["personal-statement", "skills", "education", "work-experience", "hobbies"];
const navElements = ["nav-personal-statement", "nav-skills", "nav-education", "nav-work-experience", "nav-hobbies"];

function updateActiveNav() {
  // Remove active from all
  navElements.forEach(id => document.getElementById(id).className = "");

  let active = "";

  for (let i = 0; i < ids.length; i++) {
    const section = document.getElementById(ids[i]);
    if (window.scrollY >= section.offsetTop - 100) {
      active = ids[i];
    }
  }

  if (active) {
    document.getElementById("nav-" + active).className = "active";
  }
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("resize", updateActiveNav); // recalc on resize
updateActiveNav(); // run on load
