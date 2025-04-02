const Coordinates = (function () {
  function getRandom(steps) {
    const coordinates = [];
    let x, y, z;
    for (let i = 0; i < steps; i++) {
      x = Math.random() * 40 - 20;
      y = 0;
      z = Math.random() * 40 - 20;
      coordinates.push({ x: x, y: y, z: z });
    }
    return coordinates;
  }

  function getArchimedeanSpiral(
    steps,
    rotations = 2,
    spiralTightness = 2,
    initialRadius = 5,
  ) {
    const coordinates = [];
    const angleStep = (2 * Math.PI * rotations) / steps;
    let x, y, z;

    for (let i = 0; i < steps; i++) {
      const angle = i * angleStep;
      const radius = initialRadius + spiralTightness * angle;
      x = radius * Math.cos(angle);
      z = radius * Math.sin(angle);
      y = 0;
      coordinates.push({ x: x, y: y, z: z });
    }
    return coordinates;
  }

  function getSquareSpiral(steps, gap = 1) {
    const coordinates = [];
    let x = 0,
      y = 0;
    let direction = "right"; // initial direction
    let segmentLength = 1;
    let stepsInSegment = 0;

    for (let i = 0; i < steps; i++) {
      coordinates.push({ x: x * gap, y: 0, z: y * gap });

      // Move in current direction
      switch (direction) {
        case "right":
          x++;
          break;
        case "up":
          y++;
          break;
        case "left":
          x--;
          break;
        case "down":
          y--;
          break;
      }

      stepsInSegment++;

      // Check if we need to change direction
      if (stepsInSegment === segmentLength) {
        stepsInSegment = 0;

        // Change direction (right → up → left → down → right...)
        switch (direction) {
          case "right":
            direction = "up";
            break;
          case "up":
            direction = "left";
            segmentLength++;
            break;
          case "left":
            direction = "down";
            break;
          case "down":
            direction = "right";
            segmentLength++;
            break;
        }
      }
    }

    return coordinates;
  }

  return {
    getRandom,
    getArchimedeanSpiral,
    getSquareSpiral,
  };
})();

export default Coordinates;
