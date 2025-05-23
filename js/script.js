const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const languageSelector = document.getElementById("language");
const myDate = document.querySelector("#datee");

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

function switchTheme(e) {
  const theme = e.target.checked ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function setLanguage() {
  const savedLanguage = localStorage.getItem("language") || "/";
  languageSelector.value = savedLanguage;
}

function changeLanguage(select) {
  const selectedLanguage = select.value;
  localStorage.setItem("language", selectedLanguage);
  window.location.href = selectedLanguage;
}

function showFullNames(select) {
  Array.from(select.options).forEach(option => {
    option.text = option.getAttribute("data-full");
  });
}

function resetNames(select) {
  Array.from(select.options).forEach(option => {
    option.text = option.value.slice(0, 2).toUpperCase();
  });
}

function setTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleSwitch.checked = (currentTheme === "light");
}
function showCategory(category = 'frontend') {
  document.querySelectorAll('.skills-category').forEach(cat => {
    cat.style.display = 'none';
  });
  const selectedCategory = document.querySelector(`.${category}`);
  if (selectedCategory) {
    selectedCategory.style.display = 'block';
  }
}
function scrollToTarget(e) {
  const target = this.hash;
  const $target = document.querySelector(target);

  if ($target) {
    e.preventDefault();
    const targetOffset = $target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetOffset,
      behavior: "smooth"
    });
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

myDate.innerHTML = new Date().getFullYear();
hamburger.addEventListener("click", mobileMenu);
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    closeMenu();
    if (link.getAttribute('href').startsWith('#')) {
      scrollToTarget.call(link, e);
    }
  });
});
toggleSwitch.addEventListener("change", switchTheme);
languageSelector.addEventListener("change", (e) => changeLanguage(e.target));

document.addEventListener("DOMContentLoaded", () => {
  setLanguage();
  setTheme();
  showCategory();
});


