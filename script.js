const lift = document.getElementById("lift"); // rectangle
const liftText = document.getElementById("usedLiftAndText"); // defs call
const moveUpBtn = document.getElementById("moveUpBtn");
const moveDownBtn = document.getElementById("moveDownBtn");
const moveUpBtn_1 = document.getElementById("moveUpBtn_1");
const moveDownBtn_1 = document.getElementById("moveDownBtn_1");

let motion = null;
let whenLiftMovesUp = false;
let whenLiftMovesDown = false;
let lift_stopped_while_moving_up = false;
let lift_stopped_while_moving_down = false;
var value_of_y = 0;
let xx = false;
let yy = false;
console.log(value_of_y);

window.addEventListener("DOMContentLoaded", () => {
  moveUpBtn.addEventListener("click", () => {
    whenLiftMovesUp = true;
    whenLiftMovesDown = false;
    clearInterval(motion);
    motion = setInterval(animateUp, 30);
  });

  // when the moveDownBtn is clicked
  moveDownBtn.addEventListener("click", () => {
    whenLiftMovesUp = false;
    whenLiftMovesDown = true;
    clearInterval(motion);
    motion = setInterval(animateDown, 30);
  });

  moveUpBtn_1.addEventListener("click", () => {
    // when lift moves from level 0
    if (whenLiftMovesUp == true && whenLiftMovesDown == false) {
      lift_stopped_while_moving_up = true;
      lift_stopped_while_moving_down = false;
      xx = true;
    }
    if (lift_stopped_while_moving_down) {
      clearInterval(motion);
      motion = setInterval(animateDown, 30);
    }
  });

  moveDownBtn_1.addEventListener("click", () => {
    if (whenLiftMovesUp == false && whenLiftMovesDown == true) {
      lift_stopped_while_moving_up = false;
      lift_stopped_while_moving_down = true;
      console.log("yyyyy", value_of_y);
      yy = true;
    }
    if (lift_stopped_while_moving_up) {
      clearInterval(motion);
      motion = setInterval(animateUp, 30);
    }
  });
});

const animateUp = () => {
  let y = liftText.getAttribute("y");
  let newY = parseInt(y) - 1;
  value_of_y = newY;
  animate(newY);
  if (xx && whenLiftMovesUp && value_of_y === 150) {
    clearInterval(motion);
  }
};

const animateDown = () => {
  let y = liftText.getAttribute("y");
  let newY = parseInt(y) + 1;
  value_of_y = newY;
  animate(newY);
  if (yy && whenLiftMovesDown && value_of_y === 150) {
    clearInterval(motion);
  }
};

const animate = (newY) => {
  if (newY > 300) {
    clearInterval(motion);
    motion = null;
  } else if (newY < 0) {
    clearInterval(motion);
    motion = null;
  } else {
    if ((newY + 150) % 150 == 0) {
      lift.style.fill = "green";
    } else {
      lift.style.fill = "#b5651d";
    }
    // change the y attribute of svg element g which has a rect and text
    liftText.setAttribute("y", newY);
  }
};
