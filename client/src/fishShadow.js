import TiledImage from './TiledImage';

export default class fishShadow {
    constructor() {
        let columnCount = 10;
        let rowCount = 2;
        let refreshDelay = 200;
        let scale = Math.random() > 0.5 ? 1.5 : 2;
        let loopColumn = true;

        this.row = 1;
        this.tiledImage = new TiledImage("img/fish-shadow.png", columnCount, rowCount, refreshDelay, loopColumn, scale);
        this.tiledImage.changeRow(this.row);
        this.tiledImage.changeMinMaxInterval(0, 5);
        this.tiledImage.setOpacity(0.6);
        this.x = Math.floor(Math.random() * canvas.width) + 300;
        this.y = Math.random() < 0.5 ? 600 : 800;
    }

    tick(ctx) {
        let alive = true;
        this.tiledImage.tick(this.x, this.y, ctx);

        if (this.row == 0) {
            this.x += 2;
        }
        else {
            if (this.x < 450) {

                this.tiledImage.changeMinMaxInterval(7, 8);
                if (this.x < 400) {
                    this.row = 0;
                    this.tiledImage.changeRow(this.row);
                    this.tiledImage.changeMinMaxInterval(0, 5)
                    this.x++;
                }
            }
            console.log(this.row);
            this.x -= 2;
        }
        if (this.x > 1920) {
            alive = false;
        }
        return alive;
    }
}