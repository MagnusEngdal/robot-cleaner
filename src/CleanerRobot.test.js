const CleanerRobot = require("./CleanerRobot");

test("Assignment example to equal 4", (done) => {
  const robot = new CleanerRobot();
  robot.allowedCommandCount = 2;
  robot.currentCoordinates = [10, 22];
  robot.onComplete = (cleaneCount) => {
    expect(cleaneCount).toEqual(4);
    expect(robot.currentCoordinates).toEqual([12, 21]);
    done();
  };

  robot.addCommand("E", 2);
  robot.addCommand("N", 1);

  robot.start();
});

test("Crossing 0,0 to behave as expected", (done) => {
  const robot = new CleanerRobot();
  robot.allowedCommandCount = 20;
  robot.currentCoordinates = [-10, 0];
  robot.onComplete = (cleaneCount) => {
    expect(cleaneCount).toEqual(21);
    expect(robot.currentCoordinates).toEqual([10, 0]);
    done();
  };

  for (let i = 0; i < robot.allowedCommandCount; i++) {
    robot.addCommand("E", 1);
  }

  robot.start();
});

test("Each vertice to only be counted once", (done) => {
  const robot = new CleanerRobot();
  robot.allowedCommandCount = 4;
  robot.currentCoordinates = [10, 22];
  robot.onComplete = (cleaneCount) => {
    expect(cleaneCount).toEqual(5);
    expect(robot.currentCoordinates).toEqual([10, 22]);
    done();
  };

  robot.addCommand("E", 4);
  robot.addCommand("W", 4);
  robot.addCommand("E", 4);
  robot.addCommand("W", 4);

  robot.start();
});

test("Negative coordinates to behave as expected", (done) => {
  const robot = new CleanerRobot();
  robot.allowedCommandCount = 4;
  robot.currentCoordinates = [-10, -22];
  robot.onComplete = (cleaneCount) => {
    expect(cleaneCount).toEqual(7);
    expect(robot.currentCoordinates).toEqual([-10, -21]);
    done();
  };

  robot.addCommand("E", 2);
  robot.addCommand("N", 1);
  robot.addCommand("W", 2);
  robot.addCommand("S", 2);

  robot.start();
});

test("Command amount 0 to equal clean count 1", (done) => {
  const robot = new CleanerRobot();
  robot.allowedCommandCount = 0;
  robot.currentCoordinates = [-10, -22];
  robot.onComplete = (cleaneCount) => {
    expect(cleaneCount).toEqual(1);
    expect(robot.currentCoordinates).toEqual([-10, -22]);
    done();
  };

  robot.start();
});
