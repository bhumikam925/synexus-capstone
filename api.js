// ======================================================
// SYNEXUS API.JS
// DAY 32 - API MODULE
// ======================================================

import { fetchWithRetry } from "./utils.js";
import { saveOfflineData } from "./db.js"; // DAY 40

const userCache = new Map();

// ======================================================
// GITHUB DEVELOPER PROFILE
// ======================================================

export async function getDeveloperProfile(username) {
    if (userCache.has(username)) {

        console.log("Serving from cache!");

        return userCache.get(username);

    }

    try {

        const response = await fetchWithRetry(
            `https://api.github.com/users/${username}`
        );

        if (response.status === 404) {

            throw new Error(
                "Developer not found."
            );

        }

        if (
            response.status === 403 ||
            response.status === 429
        ) {

            throw new Error(
                "API Rate Limit exceeded. Please wait a moment."
            );

        }

        if (!response.ok) {

            throw new Error(
                "Unable to fetch developer profile."
            );

        }

        const data = await response.json();
        userCache.set(username, data);

        return data;

    } catch (error) {

        throw error;

    }

}


// ======================================================
// GITHUB REPOSITORIES
// ======================================================

export async function fetchRepositories(username) {

    try {

        const response = await fetchWithRetry(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );

        if (
            response.status === 403 ||
            response.status === 429
        ) {

            throw new Error(
                "API Rate Limit exceeded. Please wait a moment."
            );

        }

        if (!response.ok) {

            throw new Error(
                "Unable to fetch repositories."
            );

        }

        const data = await response.json();

        return data;

    } catch (error) {

        throw error;

    }

}


// ======================================================
// SUBMIT PROPOSAL - POST
// ======================================================

export async function submitProposal(newInitiative) {

    // ==================================================
    // DAY 40 - OFFLINE DATA
    // ==================================================

    if (!navigator.onLine) {

        await saveOfflineData(newInitiative);

        alert(
            "You are offline. Your data has been saved locally."
        );

        return;

    }


    const response = await fetchWithRetry(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",

            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            },

            body: JSON.stringify(newInitiative)
        }
    );

    const data = await response.json();

    return {
        response,
        data
    };

}


// ======================================================
// UPDATE PROPOSAL - PUT
// ======================================================

export async function updateInitiative(id) {

    const response = await fetchWithRetry(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        {
            method: "PUT",

            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            },

            body: JSON.stringify({
                id: id,
                title: "Synexus Initiative [UPDATED]",
                body: "This initiative has been updated.",
                userId: 1
            })
        }
    );

    const data = await response.json();

    return {
        response,
        data
    };

}


// ======================================================
// DELETE PROPOSAL - DELETE
// ======================================================

export async function deleteInitiative(id) {

    const response = await fetchWithRetry(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        {
            method: "DELETE"
        }
    );

    return response;

}


export async function secureDeleteResource(targetId) {

    const token =
        localStorage.getItem("auth_token");


    if (!token) {

        throw new Error(
            "Access Denied: No authentication token found."
        );

    }

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${targetId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );

    if (response.status === 401) {

        throw new Error(
            "Unauthorized: Session expired"
        );

    }

}


// ======================================================
// DAY 37 - PARALLEL ASYNC DASHBOARD
// ======================================================

export async function fetchDashboardData(username) {

    const profilePromise = fetchWithRetry(
        `https://api.github.com/users/${username}`
    );

    const reposPromise = fetchWithRetry(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );

    const followersPromise = fetchWithRetry(
        `https://api.github.com/users/${username}/followers`
    );

    const responses = await Promise.all([
        profilePromise,
        reposPromise,
        followersPromise
    ]);

    const parsedData = await Promise.all(
        responses.map(response => response.json())
    );

    const [profile, repos, followers] = parsedData;

    return {
        profile,
        repos,
        followers
    };

}
