module.exports = class CleanerRobot {
  #commands = [];
  #cleaned = [];

  constructor() {
    this.allowedCommandCount = 0;
    this.currentCoordinates = [];
    this.onComplete;
  }

  addCommand(direction, steps) {
    this.#commands.push({
      direction,
      steps,
    });
  }

  start() {
    if (this.#commands.length === this.allowedCommandCount) {
      // Set starting coordinates to cleaned.
      this.#cleaned[this.currentCoordinates[1]] = [];
      this.#cleaned[this.currentCoordinates[1]][
        this.currentCoordinates[0]
      ] = true;

      // Weeee, off we go!
      const cleanedCount = this.#runCleaner();

      if (typeof this.onComplete === "function") {
        this.onComplete(cleanedCount);
      }
    }
  }

  #runCleaner() {
    let cleanedCount = 1;

    const move = (steps, direction) => {
      if (steps <= 0) return;

      switch (direction) {
        case "N":
          this.currentCoordinates[1] -= 1;
          break;
        case "S":
          this.currentCoordinates[1] += 1;
          break;
        case "W":
          this.currentCoordinates[0] -= 1;
          break;
        case "E":
          this.currentCoordinates[0] += 1;
          break;
      }

      if (!this.#cleaned[this.currentCoordinates[1]]) {
        this.#cleaned[this.currentCoordinates[1]] = [];
      }

      /*
       * Check if this.#cleaned[x,y] has already been cleaned,
       * otherwise, increase cleanedCount and set it to cleaned.
       */
      if (
        !this.#cleaned[this.currentCoordinates[1]][this.currentCoordinates[0]]
      ) {
        cleanedCount++;
        this.#cleaned[this.currentCoordinates[1]][
          this.currentCoordinates[0]
        ] = true;
      }

      move(steps - 1, direction);
    };

    /*
     * Iterate over each command. Update position and cleanCount
     * for each step.
     */
    this.#commands.forEach((dir) => move(dir.steps, dir.direction));

    return cleanedCount;
  }
};
