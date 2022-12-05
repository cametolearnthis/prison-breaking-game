class Prisoner {
  constructor() {
    this.positionX = 0;
    this.positionY = 225;
    this.width = 50;
    this.height = 50;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = "prisoner";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveRigth() {
    if (this.positionX >= 750) {
      this.positionX;
    } else {
      this.positionX = this.positionX + 5;
    }
    this.domElement.style.left = this.positionX + "px";
  }
  moveLeft() {
    if (this.positionX <= 0) {
      this.positionX;
    } else {
      this.positionX = this.positionX - 5;
    }
    this.domElement.style.left = this.positionX + "px";
  }
  moveUp() {
    if (this.positionY >= 450) {
      this.positionY;
    } else {
      this.positionY = this.positionY + 5;
    }
    this.domElement.style.bottom = this.positionY + "px";
  }
  moveDown() {
    if (this.positionY <= 0) {
      this.positionY;
    } else {
      this.positionY = this.positionY - 5;
    }
    this.domElement.style.bottom = this.positionY + "px";
  }
}
class Hole {
  constructor() {
    this.positionX = 750;
    this.positionY = Math.floor(Math.random() * 450);
    this.width = 25;
    this.height = 25;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = "hole";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
}
class TopLight {
  constructor() {
    this.positionX = Math.floor(Math.random() * 750);
    this.positionY = 450;
    this.width = 50;
    this.height = 50;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "light";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY = this.positionY - 5;
    this.domElement.style.bottom = this.positionY + "px";
  }
}
class Dog {
  constructor() {
    this.positionX = 750;
    this.positionY = Math.floor(Math.random() * 450);
    this.width = 50;
    this.height = 25;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "dog";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveLeft() {
    this.positionX = this.positionX - 10;
    this.domElement.style.left = this.positionX + "px";
  }
}
const prisoner = new Prisoner();
const hole = new Hole()
const topLigths = [];
const dogs = [];



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

}, 2000);

setInterval(() => {
  const newDog = new Dog();
  dogs.push(newDog);

}, 2000);



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
  if (topLightInstance.positionY === 0) {
    //console.log('remove obstacle with position...', obstacleInstance.positionY);
    topLightInstance.domElement.remove();
    topLigths.shift();
    //console.log(this.obstacles.length);
  }
  });

  

}, 50); 

setInterval(() => {
  dogs.forEach((dogInstance) => {
    dogInstance.moveLeft();
    
    if (
      prisoner.positionX < dogInstance.positionX + dogInstance.width &&
      prisoner.positionX + prisoner.width > dogInstance.positionX &&
      prisoner.positionY < dogInstance.positionY + dogInstance.height &&
      prisoner.height + prisoner.positionY > dogInstance.positionY
    ) {
      console.log("collision");
     location.href = 'gameover.html';
    }

    if (dogInstance.positionX === 0) {
      //console.log('remove obstacle with position...', obstacleInstance.positionY);
      dogInstance.domElement.remove();
      dogs.shift();
      //console.log(this.obstacles.length);
    }
  

 
  });

  

}, 50); 


setInterval(() => {

  if (
    prisoner.positionX < hole.positionX + hole.width &&
    prisoner.positionX + prisoner.width > hole.positionX &&
    prisoner.positionY < hole.positionY + hole.height &&
    prisoner.height + prisoner.positionY > hole.positionY
  ) {
    console.log("you escaped");
   location.href = 'win.html';
  }

  }, 50);

  




