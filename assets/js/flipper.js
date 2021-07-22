let colors = ["#272727", "#fed766", "#009fb7", "#696773", "#eff1f3"];

// STATE
let isSidebarOpen = false;
let selectedColor = undefined;

// DOM
const content_html = document.getElementById("content");
const color_name_html = document.getElementById("color-hex");
const color_btn_html = document.getElementById("color-management-btn");

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    changeColor(content_html, color_name_html);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  changeColor(content_html, color_name_html);
});

// content_html.addEventListener("click", function () {
//   changeColor(this, color_name_html);
// });

color_btn_html.addEventListener("click", function () {
  $("#colorModal").modal("show");
});

function changeColor(background_html, display_html) {
  const chosen_color = colors[Math.floor(Math.random() * colors.length)];

  background_html.style.backgroundColor = chosen_color;
  display_html.innerHTML = chosen_color;
}

function appendColorsToManagement(colors_select_html, color) {
  const option = document.createElement("option");
  option.text = color;
  option.value = color;
  colors_select_html.appendChild(option);
}
