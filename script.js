let elevatorPosition = 2; // 0 = Ground Level, 1 = Level 1, 2 = Level 2
let direction = ""; // To track the direction of movement
let destinationQueue = []; // Queue to store the destinations
let moveUp = false;
let moveDown = false;
const elevator = document.getElementById("elevator");
elevator.style.top = "445px";

function moveElevator(newPosition) {
  // Add the new position to the destination queue
  destinationQueue.push(newPosition);

  // If the elevator is not already moving, start moving
  if (destinationQueue.length === 1) {
    move();
  }
}

function move() {
  if (destinationQueue.length > 0) {
    const newPosition = destinationQueue[0];
    const duration = Math.abs(newPosition - elevatorPosition) * 5000; // 5s per level
    const elevatorSound = new Audio("sound.mp3"); // Bonus: Add sound effect

    console.log(
      `Moving from level ${elevatorPosition} to level ${newPosition} in ${duration}ms`
    );

    // Determine the direction of movement
    direction = newPosition > elevatorPosition ? "up" : "down";

    // Move the elevator
    elevator.style.top = `${newPosition * 200 + 45}px`;
    elevator.style.transition = `top ${duration}ms linear`;

    // Play sound effect
    // elevatorSound.play();

    // Update elevator position after the transition is complete
    setTimeout(() => {
      elevatorPosition = newPosition;
      destinationQueue.shift(); // Remove the reached destination from the queue
      move(); // Move to the next destination
    }, duration);

    // Check conditions to stop at Level 1 or skip Level 1
    setTimeout(() => {
      if (elevatorPosition === 1) {
        if (
          (direction === "up" &&
            document
              .getElementById(`upButton1`)
              .classList.contains("active")) ||
          (direction === "down" &&
            document.getElementById(`downButton1`).classList.contains("active"))
        ) {
          // If UP or DOWN button pressed on Level 1, stop at Level 1
          elevatorPosition = 1;
        } else {
          // Skip Level 1
          elevatorPosition = direction === "up" ? 2 : 0;
          elevator.style.top = `${elevatorPosition * 200 + 45}px`;
          destinationQueue.shift(); // Remove the skipped destination from the queue
          move(); // Move to the next destination
        }
      }
    }, duration);
  }
}

// Ground Floor
// document.querySelector("#upButton0").addEventListener("click", () => {
//   moveElevator(0);
//   currentFloor=2
// });

// // First Floor
// document.querySelector("#upButton1").addEventListener("click", () => {
//   moveElevator(1);
// });
// document.querySelector("#downButton1").addEventListener("click", () => {
//   moveElevator(0);
// });

// // Second Floor
// document.querySelector("#downButton2").addEventListener("click", () => {
//   moveElevator(2);
// });

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("upButton0").addEventListener("click", () => {
    
      moveUp = true;

      currentFloor = 0;

      moveElevator(0);
    
  });

  document.getElementById("upButton1").addEventListener("click", () => {
    if (moveUp && !moveDown && currentFloor === 0) {
      currentFloor = 1;

      moveElevator(1);

      moveUp = false;
    }
  });

  document.getElementById("downButton1").addEventListener("click", () => {
    if (!moveUp && !moveDown && currentFloor === 2) {
      currentFloor = 1;

      moveElevator(1);

      moveDown = false;
    }
  });

  document.getElementById("downButton2").addEventListener("click", () => {
    if (!moveUp && !moveDown) {
      moveDown = true;

      currentFloor = 2;

      moveElevator(2);
    }
  });
});
