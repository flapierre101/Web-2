import { signin } from './chat-api';
import fish from './fish';

let spriteList = [];

window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }
    tick();
});

const tick = () => {
    if (Math.random() < 0.01) {
        spriteList.push(new fish());
    }
    for (let i = 0; i < spriteList.length; i++) {
        const element = spriteList[i];
        let alive = element.tick(spriteList);

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    window.requestAnimationFrame(tick);
}