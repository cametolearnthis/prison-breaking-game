class Prisoner {
  constructor() {
    this.positionX = 0;
    this.positionY = 50;
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

