let colors = ["#272727", "#fed766", "#009fb7", "#696773", "#eff1f3"];

// STATE
let isSidebarOpen = false;
let selectedColor = undefined;

// DOM
const content_html = document.getElementById("content");
const color_name_html = document.getElementById("color-hex");
const color_btn_html = document.getElementById("color-management-btn");
const colors_select_html = document.getElementById("color-list");
const color_delete_btn_html = document.querySelectorAll(".btn-delete");

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    changeColor(content_html, color_name_html);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  changeColor(content_html, color_name_html);

  colors.forEach(function (color, i) {
    appendColorsToManagement(colors_select_html, { value: color, index: i });
  });

  $(".btn-delete").on("click", function (e) {
    const clicked_value = $(this).parent().attr("data-value");
    console.log(typeof clicked_value);
    deleteColorByValue(clicked_value);
    console.log(colors);
    $(this).parent().remove();
  });
});

color_btn_html.addEventListener("click", function () {
  $("#colorModal").modal("show");
});

function changeColor(background_html, display_html) {
  const chosen_color = colors[Math.floor(Math.random() * colors.length)];

  background_html.style.backgroundColor = chosen_color;
  display_html.innerHTML = chosen_color;
}

function appendColorsToManagement(colors_select_html, color) {
  let div = document.createElement("div");
  div.className = "color-item";
  div.setAttribute("data-value", color.value);
  div.innerHTML = `
    ${color.value}
    <span class="btn-delete"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="15"
        fill="white"
      >
        <!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) -->
        <path
          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
        /></svg
    ></span>
  `;
  colors_select_html.appendChild(div);
}

function deleteColorByValue(color) {
  var index = colors.indexOf(color);
  colors.splice(index, 1);
}
