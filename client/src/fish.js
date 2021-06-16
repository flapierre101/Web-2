
export default class fish {
    constructor() {
        this.node = document.createElement("div");
        this.node.className = "trout " + "trout_" + Math.ceil(Math.random() * 3);
        this.x = Math.floor(Math.random() * 700) + 200;
        this.node.style.left = this.x + "px";
        this.y = Math.floor(Math.random() * 500) + 200;
        this.node.style.top = this.y + "px";
        this.parentNode = document.getElementById("action");
        this.parentNode.appendChild(this.node);
        this.speed = 1;
        this.velocity = 10;
        this.move = false;
        this.bubble = true;
    }

    tick(spriteList) {
        let alive = true;

        if (this.move == false) {
            this.x -= this.speed;
            if (this.x < 10) {
                this.node.style.transform = "scaleX(1)";
                this.move = true;
            }
        }
        else {
            this.node.style.transform = "scaleX(-1)";
            this.x += this.speed;
            if (this.x > 1920 || this.x < -1) {
                alive = false;
                this.node.remove();
            }
        }

        this.node.style.left = this.x + "px";

        this.node.onmouseover = evt => {
            let mousePosX = evt.pageX;
            let mousePosY = evt.pageY;
            this.speed += this.velocity;
            if (this.bubble == true) {
                spriteList.push(new bubbles(mousePosX, mousePosY));

                this.bubble = false;
            }
        }
        return alive;
    }
}

class bubbles {
    constructor(x, y) {
        this.node = document.createElement("div");
        this.node.className = "bubbles";
        this.x = x;
        this.y = y;
        this.node.style.left = this.x + "px";
        this.node.style.top = this.y - 50 + "px";
        this.parentNode = document.getElementById("action");
        this.parentNode.appendChild(this.node);
        this.speed = 1;
        this.velocity = 0.1;
    }

    tick() {
        let alive = true;

        this.speed += this.velocity;
        this.y -= this.speed;
        this.node.style.top = this.y + "px";

        if (this.y < 0) {
            alive = false;
            this.node.remove();
        }
        return alive;
    }
}