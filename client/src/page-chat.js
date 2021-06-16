import { registerCallbacks, sendMessage, signout, chatMessageLoop } from './chat-api';
import fisherman2 from './fisherman2';
import fish2 from './fish2';

let spriteList = [];
let ctx = null;
let canvas = null;
let backgroundImg3 = new Image();
let rockImg = new Image();
backgroundImg3.src = "img/background3.jpg";
rockImg.src = "img/rock.png";
let counter = 0;
let mouseX = 0;
let mouseY = 0;
let chatColor = true;

window.addEventListener("load", () => {
    document.querySelector("textarea").onkeyup = function (evt) {
        sendMessage(evt, this)
    };
    document.querySelector("#sign-out-btn").onclick = signout;
    registerCallbacks(newMessage, memberListUpdate);
    chatMessageLoop();

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    spriteList.push(new fisherman2());
    canvas.onclick = evt => {
        mouseX = evt.pageX;
        mouseY = evt.pageY;
     }
    tick();
})

const newMessage = (fromUser, message, isPrivate) => {

    fromUser += " :";

    let templateChatHTML = document.getElementById("templateChat").innerHTML;
    let divEle = document.createElement("div");
    divEle.className = "chatPrint";
    divEle.innerHTML = templateChatHTML;

    if (chatColor) {
        divEle.style.backgroundColor = "black";
        divEle.style.color = "white";
        chatColor = false;
    }
    else {
        divEle.style.backgroundColor = "white";
        divEle.style.color = "black";
        divEle.style.justifyContent = "flex-start";
        chatColor = true;
    }
    console.log(chatColor);
    divEle.querySelector("strong").innerHTML = fromUser;
    divEle.querySelector("h5").innerHTML = message;
    document.getElementById("chatOutput").appendChild(divEle);
    document.getElementById("chatOutput").scrollTop = document.getElementById("chatOutput").scrollHeight;
}

const memberListUpdate = members => {

    if (counter != members.length) {
        for (let i = 1; i < spriteList.length; i++) {
            spriteList.splice(i, 1);
            i--;
        }
        console.log(spriteList);
        for (let i = 0; i < members.length; i++) {
            spriteList.push(new fish2(members[i]));
        }
    }
    counter = members.length;
}

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (backgroundImg3.complete && rockImg.complete) {
        ctx.drawImage(backgroundImg3, 0, 0, 1920, 1080);
        ctx.drawImage(rockImg, -250, 750, 840, 417.2);
    }

    for (let i = 0; i < spriteList.length; i++) {
        let alive = spriteList[i].tick(ctx, mouseX, mouseY, spriteList);

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }

    }
    mouseX = 0;
    mouseY = 0;
    window.requestAnimationFrame(tick);
}