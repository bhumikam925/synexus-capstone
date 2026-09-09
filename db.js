// ======================================================
// SYNEXUS DB.JS
// DAY 40 - INDEXEDDB OFFLINE DATA
// ======================================================

const DB_NAME = "PlatformDB";
const DB_VERSION = 1;
const STORE_NAME = "offline_proposals";

// ======================================================
// OPEN DATABASE
// ======================================================

function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {

            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });

            }
        };

        request.onsuccess = () => {

            resolve(request.result);

        };

        request.onerror = () => {

            reject(request.error);

        };

    });

}


// ======================================================
// SAVE OFFLINE DATA
// ======================================================

export async function saveOfflineData(payload) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORE_NAME
        );

        const request = store.add(payload);

        request.onsuccess = () => {

            resolve();

        };

        request.onerror = () => {

            reject(request.error);

        };

    });

}


// ======================================================
// GET OFFLINE DATA - BONUS
// ======================================================

export async function getOfflineData() {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(
            STORE_NAME,
            "readonly"
        );

        const store = transaction.objectStore(
            STORE_NAME
        );

        const request = store.getAll();

        request.onsuccess = () => {

            console.log(
                "Offline data:",
                request.result
            );

            resolve(request.result);

        };

        request.onerror = () => {

            reject(request.error);

        };

    });

}
