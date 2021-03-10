#! /usr/bin/env node

const readline = require("readline");
const CleanerRobot = require("./CleanerRobot");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const robot = new CleanerRobot();

robot.onComplete = (cleanCount) => {
  process.stdout.write(`Cleaned: ${cleanCount}\n`);
  rl.close();
};

let lineNumber = 0;

rl.on("line", (line) => {
  switch (lineNumber) {
    case 0:
      /*
       * First input line: A single integer, representing the
       * number of commands the robot should expect to execute.
       */
      robot.allowedCommandCount = parseInt(line);
      break;
    case 1:
      /*
       * Second input line: Two integers, representing the
       * starting coordinates of the robot.
       */
      robot.currentCoordinates = line.split(" ").map((x) => parseInt(x));
      robot.start();
      break;
    default:
      /*
       * Third and any subsequent line: A single uppercase letter
       * and an integer, representing the direction {E, W, S, N} and
       * the number of steps the robot should take in that direction.
       */
      const direction = line.split(" ");
      robot.addCommand(direction[0], parseInt(direction[1]));
      robot.start();
  }

  lineNumber++;
});
