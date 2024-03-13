const resultContainer = document.querySelector(".result-container");
const createGridBtn = document.querySelector("#create-grid");
const clearGridBtn = document.querySelector("#clear-grid");
const gridWidth = document.querySelector("#range-width");
const widthValue = document.querySelector(".width-value");
const gridHeight = document.querySelector("#range-height");
const heightValue = document.querySelector(".height-value");
const color = document.querySelector("#color");
const paintButton = document.querySelector("#paint");
const eraseButton = document.querySelector("#erase");

const events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";
let draw = false;
let erase = false;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};
isTouchDevice();

createGridBtn.addEventListener("click", () => {
  resultContainer.innerHTML = "";
  let count = 0;
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement("div");
    div.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `girdCol${count}`);
      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = color.value;
        }
      });
      col.addEventListener(events[deviceType].move, (e) => {
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        checker(elementId);
      });
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });
      div.appendChild(col);
    }
    resultContainer.appendChild(div);
  }
});

function checker(elementId) {
  let gridColumns = document.querySelectorAll(".gridCol");
  gridColumns.forEach((element) => {
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = color.value;
      } else {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

clearGridBtn.addEventListener("click", () => {
  resultContainer.innerHTML = "";
});

eraseButton.addEventListener("click", () => {
  erase = true;
});
paintButton.addEventListener("click", () => {
  draw = true;
  erase = false;
});
gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});
gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};
