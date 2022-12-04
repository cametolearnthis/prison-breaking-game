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
    if (this.positionX >= 100) {
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
    if (this.positionY >= 100) {
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

class Light {
  constructor() {
    this.positionX = 50;
    this.positionY = 80;
    this.width = 5;
    this.height = 20;

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
}
const prisoner = new Prisoner();
const light = new Light();
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
