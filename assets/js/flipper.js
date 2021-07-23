// STATE
let isSidebarOpen = false;
let selectedColor = undefined;
let web_storage_supported = undefined;
checkWebStorageSupport();

let colors = getColorsFromLocalStorage();

// DOM
const content_html = document.getElementById("content");
const color_name_html = document.getElementById("color-hex");
const colors_select_html = document.getElementById("color-list");
const color_delete_btn_html = document.querySelectorAll(".btn-delete");

$(document).ready(function () {
  // -- Init App --
  // Display Color
  changeColor(content_html, color_name_html);

  // Load and Render Colors to Management
  colors.forEach(function (color, i) {
    renderColorsToManagement(colors_select_html, color);
  });

  // -- Handler --
  // Add New Color - Button
  $(document).on("click", ".btn-add", function (e) {
    addAndRenderColorHandler();
  });

  // Add New Color - Enter
  onEnterHandler("#color-add", function () {
    addAndRenderColorHandler();

    // Clear Input
    $("#color-add").val("");
  });

  // Delete Color - Button
  $(document).on("click", ".btn-delete", function (e) {
    const clicked_value = $(this).parent().attr("data-value");
    deleteColorByValue(clicked_value);
    $(this).parent().remove();
  });

  // Change Color - Button
  $("#guide").on("click", function () {
    changeColor(content_html, color_name_html);
  });

  // Change Color - SpaceBar
  onSpaceBarHandler("body", function () {
    changeColor(content_html, color_name_html);
  });

  // Open Color Management - Button
  $("#color-management-btn").on("click", function () {
    $("#colorModal").modal("show");
  });
});

function changeColor(background_html, display_html) {
  const chosen_color = colors[Math.floor(Math.random() * colors.length)];

  background_html.style.backgroundColor = chosen_color;
  display_html.innerHTML = chosen_color;
}

function renderColorsToManagement(colors_select_html, color) {
  let div = document.createElement("div");
  div.className = "color-item";
  div.setAttribute("data-value", color);
  div.innerHTML = `
    
    <div class="color-preview-container">
      <div class="color-preview" style="background-color:${color};"></div>
      ${color}
    </div>

    <span class="btn-action btn-delete"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="15"
        fill="white"
      >
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

function addNewColor(color) {
  colors.push(color);
  saveColorsToLocalStorage(colors);
}

function addAndRenderColorHandler() {
  const typedColors = $("#color-add").val();
  if (typedColors) {
    addNewColor(typedColors);
    renderColorsToManagement(colors_select_html, typedColors);
  }
}

function onEnterHandler(selector, callback) {
  $(selector).on("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      callback();
    }
  });
}

function onSpaceBarHandler(selector, callback) {
  $(selector).on("keyup", function (e) {
    if (e.key === " " || e.keyCode === 32 || e.key === "Spacebar") {
      callback();
    }
  });
}

function saveColorsToLocalStorage(colors) {
  localStorage.setItem("colors_list", colors);
  return colors;
}

function getColorsFromLocalStorage() {
  try {
    return localStorage.getItem("colors_list").split(",");
  } catch (err) {
    const default_colors = [
      "#272727",
      "#fed766",
      "#009fb7",
      "#696773",
      "#eff1f3",
    ];

    return saveColorsToLocalStorage(default_colors);
  }
}

function checkWebStorageSupport() {
  if (typeof Storage !== "undefined") {
    // Code for localStorage/sessionStorage.
    web_storage_supported = true;
  } else {
    // Sorry! No Web Storage support..
    web_storage_supported = false;
    alert(
      "Your Browser Doesn't Support Web Storage: Colors will be reset everytime"
    );
  }
}
