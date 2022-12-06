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
class Bone {
  constructor() {
    this.positionX = prisoner.positionX + 50;
    this.positionY = prisoner.positionY + 15;
    this.width = 20;
    this.height = 20;

    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "bone";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  throwBone() {

    this.positionX = this.positionX + 50;
    this.domElement.style.left = this.positionX + "px";

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
    this.positionX = Math.floor(Math.random() * 700);
    this.positionY = 400;
    this.width = 100;
    this.height = 100;

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
const hole = new Hole();
const topLigths = [];
const dogs = [];
const bones = [];

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

document.addEventListener ("keydown", (e) => {

  if (e.key === " ") {
    const newBone = new Bone();
    bones.push(newBone);
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
      prisoner.positionX <
        topLightInstance.positionX + topLightInstance.width &&
      prisoner.positionX + prisoner.width > topLightInstance.positionX &&
      prisoner.positionY <
        topLightInstance.positionY + topLightInstance.height &&
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
      //location.href = "gameover.html";
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
  bones.forEach((boneInstance, boneIndex) => {
    boneInstance.throwBone();

    if (boneInstance.positionX >= 780 ) {
      boneInstance.domElement.remove();
      bones.splice(boneIndex, 1);
      //console.log(this.obstacles.length);
    }
    dogs.forEach((dogInstance, index) => {
      if (
        dogInstance.positionX < boneInstance.positionX + boneInstance.width &&
        dogInstance.positionX + dogInstance.width > boneInstance.positionX &&
        dogInstance.positionY < boneInstance.positionY + boneInstance.height &&
        dogInstance.height + dogInstance.positionY > boneInstance.positionY
      ) {
        console.log(dogs, "before")
        console.log("YUMMY BONE WOF WOF");
        dogInstance.domElement.remove();
        boneInstance.domElement.remove()
        dogs.splice(index, 1);
        bones.shift();
        console.log(dogs, 'after')
      } 
    })
 

  });


}, 100)


setInterval(() => {
  if (
    prisoner.positionX < hole.positionX + hole.width &&
    prisoner.positionX + prisoner.width > hole.positionX &&
    prisoner.positionY < hole.positionY + hole.height &&
    prisoner.height + prisoner.positionY > hole.positionY
  ) {
    console.log("you escaped");
    //location.href = "win.html";
  }
}, 50);
