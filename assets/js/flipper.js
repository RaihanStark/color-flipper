let colors = ["#272727", "#fed766", "#009fb7", "#696773", "#eff1f3"];

// STATE
let isSidebarOpen = false;
let selectedColor = undefined;

// DOM
const content_html = document.getElementById("content");
const setting_html = document.getElementById("setting");
const color_name_html = document.getElementById("color-hex");
const setting_link_html = document.getElementById("setting-link");
const backdrop_html = document.getElementById("backdrop");
const colors_select_html = document.getElementById("colors-select");
const delete_btn_html = document.getElementById("delete-btn");

document.addEventListener("DOMContentLoaded", function () {
  changeColor(content_html, color_name_html);

  // fill colors select
  colors.forEach(function (color) {
    appendColorsToManagement(colors_select_html, color);
  });
});

content_html.addEventListener("click", function () {
  changeColor(this, color_name_html);
});

setting_link_html.addEventListener("click", function () {
  toggleSidebar(setting_html, backdrop_html);
});

backdrop_html.addEventListener("click", function () {
  toggleSidebar(setting_html, backdrop_html);
});

delete_btn_html.addEventListener("click", function () {
  const colorIndex = colors.indexOf(selectedColor);
  colors.splice(colorIndex, 1);
  colors_select_html.remove(colorIndex);

  console.log(colors);
});

function changeColor(background_html, display_html) {
  const chosen_color = colors[Math.floor(Math.random() * colors.length)];

  background_html.style.backgroundColor = chosen_color;
  display_html.innerHTML = chosen_color;
}

function toggleSidebar(setting_html, backdrop_html) {
  setting_html.style.left = isSidebarOpen ? "-100vw" : "0";
  backdrop_html.style.display = isSidebarOpen ? "none" : "block";
  isSidebarOpen = !isSidebarOpen;
}

function appendColorsToManagement(colors_select_html, color) {
  const option = document.createElement("option");
  option.text = color;
  option.value = color;
  colors_select_html.appendChild(option);
}

function colorOnChange(selected) {
  selectedColor = selected.options[selected.selectedIndex].value;
}
