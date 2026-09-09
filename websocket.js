// ======================================================
// WEBSOCKET CONNECTION - DAY 38
// ======================================================

let socket;


// ======================================================
// LIVE FEED
// ======================================================

function addLiveMessage(message) {

    const liveFeed =
        document.getElementById("live-feed");

    if (!liveFeed) {
        return;
    }

    const messageElement =
        document.createElement("p");

    messageElement.textContent =
        message;

    liveFeed.appendChild(
        messageElement
    );

}


// ======================================================
// CREATE WEBSOCKET CONNECTION
// ======================================================

function connectWebSocket() {

    socket = new WebSocket(
        "wss://ws.postman-echo.com/raw"
    );


    // ==================================================
    // CONNECTION OPEN
    // ==================================================

    socket.onopen = function () {

        console.log(
            "WebSocket connection established."
        );

        addLiveMessage(
            "Connected to live server."
        );

    };


    // ==================================================
    // RECEIVE MESSAGE
    // ==================================================

    socket.onmessage = function (event) {

        addLiveMessage(
            event.data
        );

    };


    // ==================================================
    // ERROR HANDLING
    // ==================================================

    socket.onerror = function (error) {

        console.error(
            "WebSocket error:",
            error
        );

        addLiveMessage(
            "WebSocket connection error."
        );

    };


    // ==================================================
    // CONNECTION CLOSED
    // ==================================================

    socket.onclose = function () {

        console.log(
            "WebSocket connection closed."
        );

        addLiveMessage(
            "Connection closed. Reconnecting in 3 seconds..."
        );


        // ==============================================
        // BONUS - AUTO RECONNECT
        // ==============================================

        setTimeout(
            function () {

                connectWebSocket();

            },
            3000
        );

    };

}


// ======================================================
// START CONNECTION
// ======================================================

connectWebSocket();


// ======================================================
// SEND MESSAGE
// ======================================================

export function sendLiveMessage(text) {

    if (
        socket &&
        socket.readyState === WebSocket.OPEN
    ) {

        socket.send(text);

    } else {

        console.log(
            "WebSocket is not connected."
        );

    }

}
