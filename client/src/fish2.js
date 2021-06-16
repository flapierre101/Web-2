
export default class fish2 {
    constructor(member) {
        this.trout = new Image();
        this.trout.src = "img/trout_medium.png";
        this.x = Math.floor(Math.random() * 1300) + 550;
        this.y = Math.floor(Math.random() * 500) + 625;
        this.member = member;
    }

    tick(ctx, mouseX, mouseY, spriteList) {
        let alive = true;

        ctx.font = "30px Arial, Helvetica, sans-serif";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.textAlign = "center";

        if (this.y > 900) {
            this.y = 900;
        }
        if (this.x > 1500) {
            this.x = 1500;
        }
        ctx.drawImage(this.trout, this.x, this.y, 142, 116);
        ctx.fillText(this.member, this.x + 70, this.y + 20);
        ctx.strokeText(this.member, this.x + 70, this.y + 20);
        if (this.x < mouseX && this.x + this.trout.width > mouseX &&
            this.y < mouseY && this.y + this.trout.height > mouseY) {
            console.log("ici", mouseX, mouseY);
            console.log("laa", this.x, this.y);

            spriteList[0].fishOn();
            alive = false;
        }
        return alive;
    }
}