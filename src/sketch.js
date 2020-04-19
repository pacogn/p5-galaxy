let galaxyOffset;
let galaxySelected;
let nSectorsX;
let nSectorsY;
let starSelected;
let mouse;
let fps = true;

let terminalFont;

// function preload() {
//   terminalFont = loadFont('./assets/Inconsolata.otf');
// }

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  galaxySelected = false;
  galaxyOffset = createVector(0, 0);
  starSelected = createVector(0, 0);
  nSectorsX = width / 16;
  nSectorsY = height / 16;
  starSelected = false;
  mouse = createVector(0, 0);

  // textFont(terminalFont);
}

function mousePressed() {
  const x = Math.floor(mouseX / 16) + galaxyOffset.x;
  const y = Math.floor(mouseY / 16) + galaxyOffset.y;

  const star = new StarSystem(x, y, true);
  starSelected = star.exists ? createVector(x, y) : false;

  console.log(star);
}

function draw() {
  handleKeypress();

  drawGalaxy();
  starSelected && drawStarData(starSelected);

  fps && showFPS();
}

function handleKeypress() {
  const delta = 1;

  if (keyIsDown(keyCode['w'])) galaxyOffset.y -= delta;
  if (keyIsDown(keyCode['s'])) galaxyOffset.y += delta;
  if (keyIsDown(keyCode['a'])) galaxyOffset.x -= delta;
  if (keyIsDown(keyCode['d'])) galaxyOffset.x += delta;
}

function drawGalaxy() {
  background(0);

  let screenSector = createVector(10, 0);

  for (screenSector.x = 0; screenSector.x < nSectorsX; screenSector.x++) {
    for (screenSector.y = 0; screenSector.y < nSectorsY; screenSector.y++) {
      const x = screenSector.x + galaxyOffset.x;
      const y = Math.floor(screenSector.y + galaxyOffset.y);
      let star = new StarSystem(x, y);

      if (star.exists) {
        noStroke();
        fill(color(star.color));
        circle(screenSector.x * 16 + 8, screenSector.y * 16 + 8, star.diameter / 8);

        if (Math.floor(mouseX / 16) == screenSector.x && Math.floor(mouseY / 16) == screenSector.y) {
          drawStarSelectionIndicator(screenSector.x, screenSector.y);
        }
      }
    }
  }
}

function drawStarSelectionIndicator(x, y) {
  noFill();
  stroke(selectedColor);
  strokeWeight(2);
  circle(x * 16 + 8, y * 16 + 8, 16);
}

function drawStarData(starPosition) {
  const star = new StarSystem(starPosition.x, starPosition.y, true);

  const box = {
    padding: 30,
    height: 150,
    stroke: 'white',
    fill: boxColor.fill
  };

  // why is not persistent??
  drawStarSelectionIndicator(star.x - galaxyOffset.x, star.y - galaxyOffset.y);

  drawDialog(box);
  fill(activeColor)
    .strokeWeight(0)
    .textSize(10);
  text('Seed: ' + star.seed, 30 + 10, height - box.height - 15);

  fill(star.color)
    .stroke('#E8E8E8')
    .strokeWeight(1);

  // TODO: the fact that the circle is not aligned on the center
  // is driving me crazy. Just take a breath and think how to align
  // them.
  const posX = box.padding * 2 + star.diameter * 1.375;
  const posY = height - 10 - box.height / 2 - (star.diameter * 1.375) / 2;

  circle(posX, posY, star.diameter);
}

function keyPressed() {}
