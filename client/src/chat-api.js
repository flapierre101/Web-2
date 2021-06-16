let newMessageCallack = null;
let memberListUpdateCallback = null;

export const signin = formNode => {
    localStorage["username"] = formNode.username.value;

    fetch("/api/signin", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
            "username" : formNode.username.value,
            "password" : formNode.password.value
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })			
    .then(response => response.json())
    .then(data => {        
        if (data == "SIGNED_IN") {
            window.location.href = "chat.html";
        }
        else {
            document.querySelector("#api-message").innerText = data;
        }
    });

    return false;
}

export const signout = () => {
    fetch("/api/signout", {
        method: "POST",
        credentials: 'include'
    })			
    .then(response => response.json())
    .then(data => {
        window.location.href = "index.html";
    });

    return false;
}

export const register = formNode => {
    fetch("/api/register", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
            "username" : formNode.username.value,
            "password" : formNode.password.value,
            "no" : formNode.no.value,
            "welcomeText" : formNode.welcomeText.value,
            "firstName" : formNode.firstName.value,
            "lastName" : formNode.lastName.value,
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })			
    .then(response => response.json())
    .then(data => {
        document.querySelector("#api-message").innerText = data;
    });

    return false;
}

export const chatMessageLoop = () => {
    setTimeout(() => {
        fetch("/api/latest-messages", {
            method: "POST",
            credentials: 'include'
        })			
        .then(response => response.json())
        .then(data => {
            if (data instanceof Array) {
                data.forEach(msg => {
                    newMessageCallack(msg.nomUsager, msg.message, msg.prive === "true");
                });
    
                membersLoop();
            }
            else {
                window.location.href = "index.html";
            }
        });
    },  1000);
}

export const membersLoop = () => {
    setTimeout(() => {
        fetch("/api/active-members", {
            method: "POST",
            credentials: 'include'
        })			
        .then(response => response.json())
        .then(data => {
            if (data instanceof Array) {
                memberListUpdateCallback(data);
                chatMessageLoop();
            }
            else {
                window.location.href = "index.html";
            }
        });
    },  1000);
}

export const sendMessage = (event, fieldNode) => {
    if (event.which === 13) {
        let val = fieldNode.value;
        fieldNode.value = "";

        val = val.replace(/\n+$/, "");
        
        fetch("/api/write-message", {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                "message" : val,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })			
        .then(response => response.json())
        .then(data => {        
            newMessageCallack(localStorage["username"], val, val.indexOf("/w") === 0);
        });
    }

    return false;
}

export const registerCallbacks = (newMessage, memberListUpdate) => {
    newMessageCallack = newMessage;
    memberListUpdateCallback = memberListUpdate;
}