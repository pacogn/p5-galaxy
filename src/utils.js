function showFPS() {
  let fps = frameRate();
  fill(255);
  stroke(0);
  text('FPS: ' + fps.toFixed(2), 10, height - 10);
}

function printText(txt) {
  textSize(32);
  text(txt, 10, 90);
}

function drawDialog(box) {
  fill(box.fill)
    .stroke(box.stroke)
    .strokeWeight(2);
  rect(box.padding, height - box.padding - box.height, width - box.padding * 2, box.height);
}
