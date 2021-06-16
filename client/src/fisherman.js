import TiledImage from './TiledImage';

let counter = 0;

export default class fisherman {
    constructor() {
        let columnCount = 10;
        let rowCount = 7;
        let refreshDelay = 300;
        let scale = 4;
        let loopColumn = true;

        this.chatBubble = new Image();
        this.chatBubble.src = "img/chat-bubble.png";
        this.tiledImage = new TiledImage("img/resultat.png", columnCount, rowCount, refreshDelay, loopColumn, scale);
        this.tiledImage.changeRow(1);
        this.tiledImage.changeMinMaxInterval(2, 9);
        this.x = 175;
        this.y = 450;
    }

    tick(ctx) {
        ctx.font = "40px Lucida Console bold";
        ctx.fillStyle = "black"
        ctx.textAlign = "center";
        counter++;
        this.tiledImage.tick(this.x, this.y, ctx);

        if (counter > 155 && counter < 500) {
            this.tiledImage.setPaused(true);
            ctx.drawImage(this.chatBubble, 125, 225, 350, 350);
            ctx.fillText("Lets go fishing!!", 305, 375);
            ctx.strokeText("Lets go fishing!!", 305, 375);

        }
        if (counter > 500) {
            counter = 0;
            this.tiledImage.setPaused(false);
        }
        return true;
    }
}