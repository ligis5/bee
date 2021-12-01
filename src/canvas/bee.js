import beeImg from "./bee.png";
import beeLeftImg from "./bee-left.png";

function Bee(ctx, width, height) {
  this.currentPos = { x: width / 5, y: height / 3 };
  this.beeWidth = 32;
  this.beeHeight = 32;
  this.velocity = { x: 0.1, y: 0 };
  this.acc = { x: 0, y: 0 };
  this.direction = { x: Math.random() * width, y: Math.random() * height };
  this.mouse = { x: 0, y: 0 };

  let loadedR = false;
  let loadedL = false;
  let img = new Image();
  img.src = beeImg;
  img.onload = () => {
    loadedR = true;
  };
  let imgLeft = new Image();
  imgLeft.src = beeLeftImg;
  imgLeft.onload = () => {
    loadedL = true;
  };

  this.createBee = (x, y) => {
    if (this.velocity.x >= 0 && loadedR) {
      ctx.clearRect(0, 0, width, height, this.bee);
      ctx.drawImage(img, x, y, this.beeHeight, this.beeHeight);
    }
    if (this.velocity.x < 0 && loadedL) {
      ctx.clearRect(0, 0, width, height, this.bee);
      ctx.drawImage(imgLeft, x, y, this.beeHeight, this.beeHeight);
    }
  };

  window.addEventListener("mousemove", (e) => {
    this.mouse = { x: e.clientX, y: e.clientY };
  });

  let goTo = (x, y) => {
    let v = {
      x: this.currentPos.x - x,
      y: this.currentPos.y - y,
    };
    let mag = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    let normalize = { x: v.x / mag, y: v.y / mag };
    this.acc.x -= normalize.x;
    this.acc.y -= normalize.y;
    this.velocity.x += this.acc.x / 50;
    this.velocity.y += this.acc.y / 50;
    this.currentPos.x += this.velocity.x;
    this.currentPos.y += this.velocity.y;

    this.acc.x = 0;
    this.acc.y = 0;

    if (this.currentPos.x >= width - this.beeWidth) {
      this.currentPos.x = width - this.beeWidth;
      this.velocity.x = 0;
    }
    if (this.currentPos.x <= 0) {
      this.currentPos.x = 0;
      this.velocity.x = 0;
    }
    if (this.currentPos.y >= height - this.beeHeight) {
      this.currentPos.y = height - this.beeHeight;
      this.velocity.y = 0;
    }
    if (this.currentPos.y <= 0) {
      this.currentPos.y = 0;
      this.velocity.y = 0;
    }
    this.createBee(this.currentPos.x, this.currentPos.y);
    ctx.beginPath();
    ctx.arc(this.direction.x, this.direction.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
  };

  this.move = () => {
    let mouseV = {
      x: this.currentPos.x - this.mouse.x,
      y: this.currentPos.y - this.mouse.y,
    };
    let mouseMag = Math.sqrt(Math.pow(mouseV.x, 2) + Math.pow(mouseV.y, 2));

    if (mouseMag < 500) {
      goTo(this.mouse.x, this.mouse.y);
    } else {
      let dirV = {
        x: this.currentPos.x - this.direction.x,
        y: this.currentPos.y - this.direction.y,
      };
      let dirMag = Math.sqrt(Math.pow(dirV.x, 2) + Math.pow(dirV.y, 2));
      if (dirMag <= 100) {
        this.direction = {
          x: Math.random() * width,
          y: Math.random() * height,
        };
      }
      goTo(this.direction.x, this.direction.y);
    }
  };
}

export default Bee;
