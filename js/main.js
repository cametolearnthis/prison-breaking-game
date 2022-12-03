class Prisoner {
  constructor() {
    this.positionX = 0;
    this.positionY = 50;
    this.width = 40;
    this.height = 40;
    this.createDomElement();
  }
  createDomElement() {
    const domElement = document.createElement('div');
    domElement.id = "prisoner";
    domElement.style.width = this.width + "px";
    domElement.style.height = this.height + "px";
    domElement.style.left = this.positionX;
    domElement.style.bottom = this.positionY + "vh"
    const boardElm = document.getElementById("board")
    boardElm.appendChild(domElement);
  }
  moveRigth() {
    if (this.positionX >= 100) {
      this.positionX;
    } else {
      this.positionX = this.positionX + 5;
    }
  }
  moveLeft() {
    if (this.positionX <= 0) {
      this.positionX;
    } else {
      this.positionX = this.positionX - 5;
    }
  }
  moveUp() {
    if (this.positionY >= 100) {
      this.positionY;
    } else {
      this.positionY = this.positionY + 5;
    }
  }
  moveDown() {
    if (this.positionY <= 0) {
      this.positionY;
    } else {
      this.positionY = this.positionY - 5;
    }
  }
}

const prisoner = new Prisoner();

document.addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp") {
        prisoner.moveUp();
    } else if(e.key === "ArrowDown") {
        prisoner.moveDown();
    } else if (e.key === "ArrowRight") {
        prisoner.moveRigth();
    } else if (e.key === "ArrowLeft") {
        prisoner.moveLeft();
    }

});

