import { register } from './chat-api';
import fisherman from './fisherman';
import fishShadow from './fishShadow';

let canvas = null;
let ctx = null;
let backgroundImg2 = new Image();
backgroundImg2.src = "img/background2.png";
let spriteList = [];

window.addEventListener("load", () => {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    document.querySelector("form").onsubmit = function () {
        return register(this);
    }

    spriteList.push(new fisherman());

    canvas.onclick = () => {
        spriteList.push(new fishShadow());
    }
    tick();
})

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (backgroundImg2.complete) {
        ctx.drawImage(backgroundImg2, 0, 0, 1920, 1080);
    }
    for (let i = 0; i < spriteList.length; i++) {
        let alive = spriteList[i].tick(ctx);

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    window.requestAnimationFrame(tick);
}
