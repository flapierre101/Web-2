import TiledImage from './TiledImage';

export default class fisherman2 {
    constructor() {
        let columnCount = 10;
        let rowCount = 7;
        let refreshDelay = 300;
        let scale = 5;
        let loopColumn = true;

        this.tiledImage = new TiledImage("img/resultat.png", columnCount, rowCount, refreshDelay, loopColumn, scale);
        this.tiledImage.changeRow(5);
        this.tiledImage.changeMinMaxInterval(0, 0);
        this.x = 275;
        this.y = 500;
    }

    fishOn() {
        this.tiledImage.changeRow(2);
        this.tiledImage.changeMinMaxInterval(0, 3, () => {

            this.tiledImage.changeRow(0);
            this.tiledImage.changeMinMaxInterval(0, 9, () => {

                this.tiledImage.changeRow(5);
                this.tiledImage.changeMinMaxInterval(0, 0)

            })
        })
    }

    tick(ctx) {
        let alive = true;
        this.tiledImage.tick(this.x, this.y, ctx);
        return alive;
    }
}
