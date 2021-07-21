const colors = ["#272727", "#fed766", "#009fb7", "#696773", "#eff1f3"];
const content_html = document.getElementById("content");
const color_name_html = document.getElementById("color-hex");

document.addEventListener("DOMContentLoaded", function () {
  changeColor(content_html, color_name_html);
});

content_html.addEventListener("click", function () {
  changeColor(this, color_name_html);
});

function changeColor(background_html, display_html) {
  const chosen_color = colors[Math.floor(Math.random() * colors.length)];

  background_html.style.backgroundColor = chosen_color;
  display_html.innerHTML = chosen_color;
}
