class Game {
  constructor() {
    this.prisoner = null;
    this.hole = null;
    this.topLigths = [];
    this.dogs = [];
    this.bones = [];
  }
  start() {
    this.prisoner = new Prisoner();
    this.hole = new Hole();
    this.attachEventListeners();
    this.attachBoneEventListener();
    this.detectCollision();
    
    setInterval(() => {
      const newTopLight = new TopLight();
      this.topLigths.push(newTopLight);
    }, 2000);
    setInterval(() => {
      const newDog = new Dog();
      this.dogs.push(newDog);
    }, 2000);
    setInterval(() => {
      this.topLigths.forEach((topLightInstance) => {
        topLightInstance.moveDown();
        this.detectLightCollision(topLightInstance);
        this.removeTopLightIfOutside(topLightInstance);
      });
    }, 50);
    setInterval(() => {
      this.detectCollision();
      this.dogs.forEach((dogInstance) => {
        dogInstance.moveLeft();
        this.detectDogCollision(dogInstance);
        this.removeDogIfOutside(dogInstance);
        
      });
    }, 50);

    setInterval(() => {
      this.bones.forEach((boneInstance, boneIndex) => {
        boneInstance.throwBone();
        this.detectBoneCollision(boneInstance, boneIndex);
        this.removeBoneIfOutside(boneInstance);
      });
    }, 75) 
  }
  attachEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        this.prisoner.moveUp();
      } else if (e.key === "ArrowDown") {
        this.prisoner.moveDown();
      } else if (e.key === "ArrowRight") {
        this.prisoner.moveRigth();
      } else if (e.key === "ArrowLeft") {
        this.prisoner.moveLeft();
      } 
    });
  }
  attachBoneEventListener () {
    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        const newBone = new Bone(this.prisoner);
        this.bones.push(newBone);
      }
    })
  }
  
  
  detectLightCollision(topLightInstance) {
    if (
      this.prisoner.positionX <
        topLightInstance.positionX + topLightInstance.width &&
        this.prisoner.positionX + this.prisoner.width > topLightInstance.positionX &&
        this.prisoner.positionY <
        topLightInstance.positionY + topLightInstance.height &&
        this.prisoner.height + this.prisoner.positionY > topLightInstance.positionY
    ) {

      location.href = 'gameover.html';
    }
  }
  detectDogCollision(dogInstance) {
    if (
      this.prisoner.positionX < dogInstance.positionX + dogInstance.width &&
      this.prisoner.positionX + this.prisoner.width > dogInstance.positionX &&
      this.prisoner.positionY < dogInstance.positionY + dogInstance.height &&
      this.prisoner.height + this.prisoner.positionY > dogInstance.positionY
    ) {
      
      location.href = "gameover.html";
    }  
  }
  detectBoneCollision(boneInstance, boneIndex) {
    this.dogs.forEach((dogInstance, index) => {
      if (
        dogInstance.positionX < boneInstance.positionX + boneInstance.width &&
        dogInstance.positionX + dogInstance.width > boneInstance.positionX &&
        dogInstance.positionY < boneInstance.positionY + boneInstance.height &&
        dogInstance.height + dogInstance.positionY > boneInstance.positionY
      ) {

        dogInstance.domElement.remove();
        boneInstance.domElement.remove()
        this.dogs.splice(index, 1);
        this.bones.splice(boneIndex, 1);
      } 
    })
  }
  
  detectCollision() {
    if (
      this.prisoner.positionX < this.hole.positionX + this.hole.width &&
      this.prisoner.positionX + this.prisoner.width > this.hole.positionX &&
      this.prisoner.positionY < this.hole.positionY + this.hole.height &&
      this.prisoner.height + this.prisoner.positionY > this.hole.positionY
    ) {

      location.href = "win.html";
    }
  }
 
  removeTopLightIfOutside(topLightInstance) {
    if (topLightInstance.positionY === 0) {
      topLightInstance.domElement.remove();
      this.topLigths.shift();

    }
  }
  removeDogIfOutside(dogInstance) {
    if (dogInstance.positionX === 0) {
      dogInstance.domElement.remove();
      this.dogs.shift();

    }
  }
  removeBoneIfOutside(boneInstance, boneIndex) {
    if (boneInstance.positionX >= 780 ) {
      boneInstance.domElement.remove();
      this.bones.splice(boneIndex, 1);
    }
  }
 
}
class Prisoner {
  constructor() {
    this.positionX = 0;
    this.positionY = 225;
    this.width = 25;
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
  constructor(player) {
    this.positionX = player.positionX + 50;
   
    this.positionY = player.positionY + 15;

    this.width = 30;
    this.height = 15;

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
    this.positionX = this.positionX + 25;
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
    this.width = 80;
    this.height = 80;

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
    this.positionY = this.positionY - 4;
    this.domElement.style.bottom = this.positionY + "px";
  }
}
class Dog {
  constructor() {
    this.positionX = 750;
    this.positionY = Math.floor(Math.random() * 450);
    this.width = 45;
    this.height = 30;

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



const game = new Game();
game.start();


