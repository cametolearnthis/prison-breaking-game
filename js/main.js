class Prisoner {
  constructor() {
    this.positionX = 0;
    this.positionY = 50;
    this.width = 5;
    this.height = 20;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = "prisoner";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveRigth() {
    if (this.positionX >= 95) {
      this.positionX;
    } else {
      this.positionX = this.positionX + 5;
    }
    this.domElement.style.left = this.positionX + "vw";
  }
  moveLeft() {
    if (this.positionX <= 0) {
      this.positionX;
    } else {
      this.positionX = this.positionX - 5;
    }
    this.domElement.style.left = this.positionX + "vw";
  }
  moveUp() {
    if (this.positionY >= 80) {
      this.positionY;
    } else {
      this.positionY = this.positionY + 5;
    }
    this.domElement.style.bottom = this.positionY + "vh";
  }
  moveDown() {
    if (this.positionY <= 0) {
      this.positionY;
    } else {
      this.positionY = this.positionY - 5;
    }
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

class TopLight {
  constructor() {
    this.positionX = Math.floor(Math.random() * 100);
    this.positionY = 80;
    this.width = 5;
    this.height = 10;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "light";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
  removeTopLightifOutside(topLightInstance) {
    if (topLightInstance.positionY === 0 - topLightInstance.height) {
      //console.log('remove obstacle with position...', obstacleInstance.positionY);
      topLightInstance.domElement.remove();

      this.obstacles.shift();
      console.log(this.obstacles.length);
    }
  }
}
const prisoner = new Prisoner();
const topLigths = [];


document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    prisoner.moveUp();
  } else if (e.key === "ArrowDown") {
    prisoner.moveDown();
  } else if (e.key === "ArrowRight") {
    prisoner.moveRigth();
  } else if (e.key === "ArrowLeft") {
    prisoner.moveLeft();
  }
});



//create light
setInterval(() => {
  const newTopLight = new TopLight();
  topLigths.push(newTopLight);
  
}, 500);

//move light & detect collision
setInterval(() => {
  topLigths.forEach((topLightInstance) => {
    topLightInstance.moveDown();
    
  //collision detector must be inside this interval, because our prisoner is moving in four directions

  if (
    prisoner.positionX < topLightInstance.positionX + topLightInstance.width &&
    prisoner.positionX + prisoner.width > topLightInstance.positionX &&
    prisoner.positionY < topLightInstance.positionY + topLightInstance.height &&
    prisoner.height + prisoner.positionY > topLightInstance.positionY
  ) {
    console.log("collision");
    //location.href = 'gameover.html';
  }

  });

}, 50); 


