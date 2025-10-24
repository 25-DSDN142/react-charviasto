let showGlasses = true;
let showScar = true;
let showTie = true;
let showHat = false;
let showBeard = false;

let glassesImg;
let scar;
let tie;
let hat;
let beard;

function prepareInteraction() {
  glassesImg = loadImage('/images/glasses2.webp');
  scar = loadImage('/images/scar.png');
  tie = loadImage('/images/tie.png');
  hat = loadImage('/images/hat.png');
  beard = loadImage('/images/beard.png');
}

function drawInteraction(faces, hands) {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let whatGesture = detectHandGesture(hand);

    // Thumbs Up = Harry Potter
    if (whatGesture == "Thumbs Up") {
      showGlasses = true;
      showScar = true;
      showTie = true;

      showHat = false;
      showBeard = false;
    }

    // Open Palm = Dumbledore
    if (whatGesture == "Open Palm") {
      showGlasses = false;
      showScar = false;
      showTie = false;

      showHat = true;
      showBeard = true;
    }
  }

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    let faceWidth = face.faceOval.width;
    let faceHeight = face.faceOval.height;
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;

    // Harry Potter 
    if (showGlasses) {
      let glassesWidth = faceWidth * 1.2;
      let glassesHeight = (glassesWidth / glassesImg.width) * glassesImg.height;
      let glassesX = faceCenterX - glassesWidth / 2;
      let glassesY = faceCenterY - glassesHeight / 1.5;
      image(glassesImg, glassesX, glassesY, glassesWidth, glassesHeight);
    }

    if (showScar) {
      let scarWidth = faceWidth / 4;
      let scarHeight = (scarWidth / scar.width) * scar.height;
      let scarX = face.keypoints[151].x - scarWidth / 2;
      let scarY = face.keypoints[151].y - scarHeight / 2;
      image(scar, scarX, scarY, scarWidth, scarHeight);
    }

    if (showTie) {
      let tieWidth = faceWidth / 0.3;
      let tieHeight = (tieWidth / tie.width) * tie.height;
      let tieX = faceCenterX - tieWidth / 2;
      let tieY = face.keypoints[152].y + faceHeight / 50;
      image(tie, tieX, tieY, tieWidth, tieHeight);
    }

    // Dumbledore
    if (showHat) {
      let hatWidth = faceWidth * 2.5;
      let hatHeight = (hatWidth / hat.width) * hat.height;
      let hatX = faceCenterX - hatWidth / 2;
      let hatY = faceCenterY - faceHeight / 0.37;
      image(hat, hatX, hatY, hatWidth, hatHeight);
    }

    if (showBeard) {
      let beardWidth = faceWidth * 2.5;
      let beardHeight = (beardWidth / beard.width) * beard.height;
      let beardX = faceCenterX - beardWidth / 2;
      let beardY = face.keypoints[152].y - beardHeight / 5;
      image(beard, beardX, beardY, beardWidth, beardHeight);
    }
  }
}



function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}

// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}