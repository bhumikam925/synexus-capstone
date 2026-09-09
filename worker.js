// ======================================================
// DAY 41 - WEB WORKER
// ======================================================

self.onmessage = function (e) {

    if (e.data === "START") {

        let result = 0;

        // Heavy calculation
        for (let i = 0; i < 100000000; i++) {
            result += i;
        }

        // Send result back to main thread
        self.postMessage(result);
    }
};
