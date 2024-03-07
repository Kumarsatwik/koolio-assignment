const elevator = document.getElementById("elevator");
const floor = document.getElementsByClassName("floor")[0];
const sound = new Audio("sound.mp3");

let curr_floor = 0;
let stop_one_up = false;
let stop_one_down = false;

let elevator_moving = false;

zero_up.addEventListener("click", async () => {
  if (elevator_moving == true) return;
  elevator_moving = true;
  await moveUp();
  if (stop_one_up) await wait(1000);
  stop_one_up = false;
  await moveUp();
  elevator_moving = false;
});

two_down.addEventListener("click", async () => {
  if (elevator_moving == true) return;
  elevator_moving = true;
  await moveDown();
  if (stop_one_down) await wait(1000);
  stop_one_down = false;
  await moveDown();
  elevator_moving = false;
});

sound.addEventListener("ended", function () {
  this.currentTime = 0;
  this.play();
});

one_up.addEventListener("click", () => (stop_one_up = true));
one_down.addEventListener("click", () => (stop_one_down = true));

async function moveUp() {
  sound.play();
  elevator.style.transform = `translateY(${
    -floor.offsetHeight * (curr_floor + 1)
  }px)`;
  curr_floor += 1;
  await wait(5000);
  sound.pause();
}

async function moveDown() {
  sound.play();
  elevator.style.transform = `translateY(${
    -floor.offsetHeight * (curr_floor - 1)
  }px)`;
  curr_floor -= 1;
  await wait(5000);
  sound.pause();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
