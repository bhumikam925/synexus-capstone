// ======================================================
// SYNEXUS MAIN.JS
// DAY 32 - ES6 MODULES
// ======================================================

import { debounce } from "./utils.js";
import { globalStore } from "./core/store.js";
import {
    getDeveloperProfile,
    fetchRepositories,
    submitProposal,
    updateInitiative,
    deleteInitiative,
    secureDeleteResource,
    fetchDashboardData

} from "./api.js";
import { sendLiveMessage } from "./websocket.js";
import { saveOfflineData, getOfflineData } from "./db.js";
import { router, navigateTo } from "./router.js";
import "./components/UserCard.js";
import "./components/CartCounter.js";
import "./components/ProductButton.js";
import "./components/CustomModal.js";
import "./components/DataFeed.js";

// ======================================================
// INFINITE SCROLL - DAY 31
// ======================================================

let currentPage = 1;
const limit = 10;
let isLoading = false;

async function fetchNextPage() {

    if (isLoading) {
        return;
    }

    isLoading = true;

    const dataFeed =
        document.getElementById("data-feed");

    const sentinel =
        document.getElementById("scroll-sentinel");

    if (!dataFeed || !sentinel) {
        isLoading = false;
        return;
    }

    try {

      sentinel.innerHTML = `<span class="loading-spinner"></span> Loading more...`;

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
        );

        const data = await response.json();

        if (data.length === 0) {

            sentinel.textContent =
                "You've reached the end!";

            if (window.infiniteScrollObserver) {
                window.infiniteScrollObserver.disconnect();
            }

            return;
        }

        data.forEach(function (post) {

            dataFeed.innerHTML += `

                <article class="synexus-feed-item">

                    <div class="feed-marker">
                        ${post.id}
                    </div>

                    <div class="feed-content">

                        <span class="feed-label">
                            COMMUNITY UPDATE
                        </span>

                        <h3>
                            ${post.title}
                        </h3>

                        <p>
                            ${post.body}
                        </p>

                        <small>
                            Synexus Community
                        </small>

                    </div>

                </article>

            `;

        });

   } catch (error) {
    console.error(error);

    sentinel.textContent =
        "❌ Unable to load more posts. Please try again.";
}
    } finally {

        isLoading = false;

    }
}


function initInfiniteScroll() {

    const sentinel =
        document.getElementById(
            "scroll-sentinel"
        );

    if (!sentinel) {
        return;
    }

    window.infiniteScrollObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (entry.isIntersecting) {

                            currentPage++;

                            fetchNextPage();

                        }

                    }
                );

            }
        );

    window.infiniteScrollObserver.observe(
        sentinel
    );

}


// ======================================================
// DARK MODE
// ======================================================

function initThemeToggle() {

    const themeButton =
        document.getElementById(
            "theme-toggle"
        );

    if (!themeButton) return;

    const savedTheme =
        localStorage.getItem(
            "synexus_theme"
        );

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );

    }

    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-theme"
            );

            if (
                document.body.classList.contains(
                    "dark-theme"
                )
            ) {

                localStorage.setItem(
                    "synexus_theme",
                    "dark"
                );

            } else {

                localStorage.setItem(
                    "synexus_theme",
                    "light"
                );

            }

        }
    );

}


// ======================================================
// MOBILE MENU
// ======================================================

function initMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    if (!menuToggle || !navLinks) {
        return;
    }

    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "nav-active"
            );

        }
    );

    navLinks.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "nav-link"
                )
            ) {

                navLinks.classList.remove(
                    "nav-active"
                );

            }

        }
    );

}


// ======================================================
// HERO BUTTON
// ======================================================

function initHeroButton() {

    const heroTitle =
        document.getElementById(
            "hero-title"
        );

    const heroButton =
        document.getElementById(
            "hero-btn"
        );

    if (!heroTitle || !heroButton) {
        return;
    }

    heroButton.addEventListener(
        "click",
        function () {

            heroTitle.textContent =
                "Welcome to the Synexus Core!";

            heroTitle.classList.toggle(
                "active-state"
            );

        }
    );

}


// ======================================================
// CONTACT FORM
// ======================================================

function initContactForm() {

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    if (!contactForm) return;

    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const messageInput =
                document.getElementById("message");

            const nameValue =
                nameInput.value.trim();

            const emailValue =
                emailInput.value.trim();

            if (nameValue === "") {

                nameInput.style.borderColor =
                    "red";

                alert(
                    "Please enter your name."
                );

                return;
            }

            if (!emailValue.includes("@")) {

                emailInput.style.borderColor =
                    "red";

                alert(
                    "Please enter a valid email."
                );

                return;
            }

            console.log(
                "Application Ready for Server"
            );

            localStorage.removeItem(
                "synexus_form_draft"
            );

            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";

            alert(
                "Message submitted successfully!"
            );

        }
    );

}


// ======================================================
// CONTACT FORM DRAFT
// ======================================================

function initFormDraft() {

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    if (!nameInput || !emailInput) {
        return;
    }

    const savedData =
        localStorage.getItem(
            "synexus_form_draft"
        );

    if (savedData) {

        try {

            const formData =
                JSON.parse(savedData);

            nameInput.value =
                formData.name || "";

            emailInput.value =
                formData.email || "";

        } catch (error) {

            console.log(
                "Unable to restore form draft."
            );

        }

    }

    function saveDraft() {

        const formData = {

            name: nameInput.value,

            email: emailInput.value

        };

        localStorage.setItem(
            "synexus_form_draft",
            JSON.stringify(formData)
        );

    }

    nameInput.addEventListener(
        "input",
        saveDraft
    );

    emailInput.addEventListener(
        "input",
        saveDraft
    );

}


// ======================================================
// PROJECT DATA
// ======================================================

const projectsData = [

    {
        title: "Technical Workshop",

        description:
            "Hands-on workshops to improve programming and development skills.",

        status: "Active"
    },

    {
        title: "Hackathons",

        description:
            "Collaborate with students and build innovative solutions.",

        status: "Completed"
    },

    {
        title: "Open Source Projects",

        description:
            "Contribute to open-source and build your portfolio.",

        status: "Active"
    }

];


// ======================================================
// PROJECTS
// ======================================================

function initProjects() {

    const gridContainer =
        document.getElementById(
            "dynamic-grid"
        );

    const searchInput =
        document.getElementById(
            "search-projects"
        );

    if (!gridContainer || !searchInput) {
        return;
    }

    function renderProjects(dataArray) {

        gridContainer.innerHTML = "";

        dataArray.forEach(
            function (project) {

                gridContainer.innerHTML += `

                    <div class="initiative-card hidden">

                        <h3>
                            ${project.title}
                        </h3>

                        <p>
                            ${project.description}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${project.status}
                        </p>

                        <button
                            class="view-btn"
                            data-title="${project.title}">
                            View Details
                        </button>

                    </div>

                `;

            }
        );

        initScrollObserver();

    }


    const searchProjects =
        debounce(
            function () {

                const searchTerm =
                    searchInput.value
                        .toLowerCase();

                const filteredProjects =
                    projectsData.filter(
                        function (project) {

                            return project.title
                                .toLowerCase()
                                .includes(
                                    searchTerm
                                );

                        }
                    );

                renderProjects(
                    filteredProjects
                );

            },
            300
        );


    searchInput.addEventListener(
        "input",
        searchProjects
    );

    renderProjects(
        projectsData
    );

}


// ======================================================
// MODAL
// ======================================================

function initModal() {

    const modal =
        document.getElementById(
            "modal"
        );

    const modalTitle =
        document.getElementById(
            "modal-title"
        );

    const closeModal =
        document.getElementById(
            "close-modal"
        );

    const gridContainer =
        document.getElementById(
            "dynamic-grid"
        );

    if (
        !modal ||
        !modalTitle ||
        !closeModal ||
        !gridContainer
    ) {
        return;
    }

    gridContainer.addEventListener(
        "click",
        function (e) {

            if (
                e.target.classList.contains(
                    "view-btn"
                )
            ) {

                const title =
                    e.target.getAttribute(
                        "data-title"
                    );

                modalTitle.textContent =
                    title;

                modal.style.display =
                    "flex";

            }

        }
    );

    closeModal.addEventListener(
        "click",
        function () {

            modal.style.display =
                "none";

        }
    );

    window.addEventListener(
        "click",
        function (e) {

            if (e.target === modal) {

                modal.style.display =
                    "none";

            }

        }
    );

}


// ======================================================
// TESTIMONIALS
// ======================================================

function initTestimonials() {

    const memberName =
        document.getElementById(
            "member-name"
        );

    const memberQuote =
        document.getElementById(
            "member-quote"
        );

    if (!memberName || !memberQuote) {
        return;
    }

    const testimonialsData = [

        {
            name: "Bhumika",

            quote:
                "Synexus helped me improve my web development skills."
        },

        {
            name: "Priya",

            quote:
                "The community projects gave me real-world experience."
        },

        {
            name: "Ananya",

            quote:
                "I learned teamwork and gained confidence in coding."
        }

    ];

    let currentIndex = 0;

    function updateTestimonial() {

        const currentData =
            testimonialsData[
                currentIndex
            ];

        memberName.textContent =
            currentData.name;

        memberQuote.textContent =
            currentData.quote;

        currentIndex++;

        if (
            currentIndex ===
            testimonialsData.length
        ) {

            currentIndex = 0;

        }

    }

    updateTestimonial();

    setInterval(
        updateTestimonial,
        3000
    );

}


// ======================================================
// TASK TRACKER
// ======================================================

function initTaskTracker() {

    const taskInput =
        document.getElementById(
            "task-input"
        );

    const addTaskBtn =
        document.getElementById(
            "add-task-btn"
        );

    const taskList =
        document.getElementById(
            "task-list"
        );

    if (
        !taskInput ||
        !addTaskBtn ||
        !taskList
    ) {
        return;
    }

    let taskState = [];

    function renderTasks() {

        taskList.innerHTML = "";

        taskState.forEach(
            function (task) {

                taskList.innerHTML += `

                    <li>

                        <span>
                            ${task.text}
                        </span>

                        <button
                            class="delete-btn"
                            data-id="${task.id}">
                            ×
                        </button>

                    </li>

                `;

            }
        );

    }


    addTaskBtn.addEventListener(
        "click",
        function () {

            const value =
                taskInput.value.trim();

            if (value === "") {
                return;
            }

            taskState.push({

                id: Date.now(),

                text: value,

                completed: false

            });

            taskInput.value = "";

            renderTasks();

        }
    );


    taskList.addEventListener(
        "click",
        function (e) {

            if (
                e.target.classList.contains(
                    "delete-btn"
                )
            ) {

                const targetId =
                    Number(
                        e.target.getAttribute(
                            "data-id"
                        )
                    );

                taskState =
                    taskState.filter(
                        function (task) {

                            return (
                                task.id !==
                                targetId
                            );

                        }
                    );

                renderTasks();

            }

        }
    );

}


// ======================================================
// SCROLL OBSERVER
// ======================================================

function initScrollObserver() {

    const hiddenElements =
        document.querySelectorAll(
            ".hidden"
        );

    if (!hiddenElements.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList
                                .add("show");

                        }

                    }
                );

            }
        );

    hiddenElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


// ======================================================
// KANBAN BOARD
// ======================================================

function initKanbanBoard() {

    const taskCards =
        document.querySelectorAll(
            ".task-card"
        );

    const columns =
        document.querySelectorAll(
            ".column"
        );

    if (
        !taskCards.length ||
        !columns.length
    ) {
        return;
    }

    taskCards.forEach(
        function (card) {

            card.addEventListener(
                "dragstart",
                function () {

                    card.classList.add(
                        "is-dragging"
                    );

                }
            );

            card.addEventListener(
                "dragend",
                function () {

                    card.classList.remove(
                        "is-dragging"
                    );

                }
            );

        }
    );


    columns.forEach(
        function (column) {

            column.addEventListener(
                "dragover",
                function (e) {

                    e.preventDefault();

                    const draggingCard =
                        document.querySelector(
                            ".is-dragging"
                        );

                    if (draggingCard) {

                        column.appendChild(
                            draggingCard
                        );

                    }

                }
            );

        }
    );

}


// ======================================================
// GITHUB LOOKUP - DAY 28
// ======================================================

function initGithubLookup() {

    const usernameInput =
        document.getElementById(
            "github-username"
        );

    if (!usernameInput) {
        return;
    }

    const searchUser =
        debounce(
            async function (usernameFromUrl = null) {

                const username =
                    usernameFromUrl ||
                    usernameInput.value.trim();

                try {

                    // ==================================================
                    // DAY 37 - FETCH DASHBOARD DATA IN PARALLEL
                    // ==================================================

                    const dashboard =
                        await fetchDashboardData(
                            username
                        );

                    const profile =
                        dashboard.profile;

                    const repos =
                        dashboard.repos;

                    const followers =
                        dashboard.followers;

                    loadRepositories(
                        repos
                    );


                    const profileCard =
                        document.getElementById(
                            "dev-profile-card"
                        );

                    if (profileCard) {

                        profileCard.innerHTML = `

                            <div class="github-profile-card">

                                <img
                                    src="${profile.avatar_url}"
                                    alt="GitHub profile picture">

                                <h3>
                                    ${profile.name || username}
                                </h3>

                                <p>
                                    ${profile.bio || "No bio available."}
                                </p>

                                <p>
                                    <strong>
                                        Username:
                                    </strong>

                                    ${profile.login}
                                </p>

                                <p>
                                    <strong>
                                        Public Repositories:
                                    </strong>

                                    ${profile.public_repos}
                                </p>

                                <a
                                    href="${profile.html_url}"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    View GitHub Profile
                                </a>

                            </div>

                        `;

                    }


                    // ==================================================
                    // DAY 36 - URL SEARCH PARAMETER
                    // ==================================================

                    const url =
                        new URL(
                            window.location
                        );

                    if (username) {

                        url.searchParams.set(
                            "user",
                            username
                        );

                    } else {

                        url.searchParams.delete(
                            "user"
                        );

                    }

                    window.history.pushState(
                        {},
                        "",
                        url
                    );


                } catch (error) {

                    const profileCard =
                        document.getElementById(
                            "dev-profile-card"
                        );

                    if (profileCard) {

                        profileCard.innerHTML = `
                            <p>
                                ${error.message}
                            </p>
                        `;

                    }

                    const reposGrid =
                        document.getElementById(
                            "repos-grid"
                        );

                    if (reposGrid) {

                        reposGrid.innerHTML = "";

                    }

                }

            },
            500
        );


    usernameInput.addEventListener(
        "input",
        function () {

            searchUser();

        }
    );

}


// ======================================================
// LOAD GITHUB REPOSITORIES
// ======================================================

function loadRepositories(data) {

    const reposGrid =
        document.getElementById(
            "repos-grid"
        );

    if (!reposGrid) {
        return;
    }

    reposGrid.innerHTML =
        "<p>Loading repositories...</p>";

    try {

        reposGrid.innerHTML = "";

        if (data.length === 0) {

            reposGrid.innerHTML =
                "<p>No public repositories found.</p>";

            return;

        }

        data.forEach(
            function (repo) {

                reposGrid.innerHTML += `

                    <div class="initiative-card">

                        <h3>
                            ${repo.name}
                        </h3>

                        <p>
                            ${
                                repo.description ||
                                "No description provided."
                            }
                        </p>

                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer">
                            View Repository
                        </a>

                    </div>

                `;

            }
        );

    } catch (error) {

        reposGrid.innerHTML = `
            <p>
                Unable to load repositories.
            </p>
        `;

    }

}


// ======================================================
// PROPOSAL FORM - DAY 29
// ======================================================

function initProposalForm() {

    const proposalForm =
        document.getElementById(
            "proposal-form"
        );

    const proposalMessage =
        document.getElementById(
            "proposal-message"
        );

    const submitButton =
        document.getElementById(
            "proposal-submit-btn"
        );

    if (
        !proposalForm ||
        !proposalMessage ||
        !submitButton
    ) {
        return;
    }

    proposalForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const titleInput =
                document.getElementById(
                    "proposal-title"
                ).value.trim();

            const descInput =
                document.getElementById(
                    "proposal-description"
                ).value.trim();

            const newInitiative = {

                title: titleInput,

                body: descInput,

                userId: 1

            };

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";

            proposalMessage.textContent =
                "Sending proposal...";

            try {

                const result =
                    await submitProposal(
                        newInitiative
                    );

                proposalMessage.textContent =
                    "✅ Initiative submitted successfully!";

                proposalForm.reset();

                console.log(
                    "Created proposal:",
                    result.data
                );

            } catch (error) {

                proposalMessage.textContent =
                    "❌ Failed to submit proposal. Please try again.";

                console.error(
                    error
                );

            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Submit Proposal";

            }

        }
    );

}


// ======================================================
// MANAGE PROPOSAL - DAY 30
// ======================================================

function initProposalManagement() {

    const updateButton =
        document.getElementById(
            "update-btn"
        );

    const deleteButton =
        document.getElementById(
            "delete-btn"
        );

    if (updateButton) {

        updateButton.addEventListener(
            "click",
            async function () {

                try {

                    const result =
                        await updateInitiative(
                            1
                        );

                    console.log(
                        "Updated initiative:",
                        result.data
                    );

                } catch (error) {

                    console.error(
                        "Failed to update initiative:",
                        error
                    );

                }

            }
        );

    }


    function initSecureDelete() {

        const secureDeleteButton =
            document.getElementById(
                "secure-delete-btn"
            );

        if (!secureDeleteButton) {
            return;
        }

        secureDeleteButton.addEventListener(
            "click",
            async function () {

                try {

                    const response =
                        await secureDeleteResource(
                            1
                        );

                    console.log(
                        "Secure delete successful:",
                        response
                    );

                } catch (error) {

                    console.error(
                        error.message
                    );

                }

            }
        );

    }

    initSecureDelete();


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            async function () {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to delete this initiative? This action cannot be undone."
                    );

                if (!confirmed) {
                    return;
                }

                try {

                    const response =
                        await deleteInitiative(
                            1
                        );

                    const data =
                        await response.json();

                    console.log(
                        "Deleted initiative:",
                        data
                    );

                } catch (error) {

                    console.error(
                        "Failed to delete initiative:",
                        error
                    );

                }

            }
        );

    }

}


// ======================================================
// DAY 36 - URL SEARCH PARAMETERS
// ======================================================

function initUrlSearchParams() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const username =
        params.get("user");

    if (username) {

        const usernameInput =
            document.getElementById(
                "github-username"
            );

        if (usernameInput) {

            usernameInput.value =
                username;

            usernameInput.dispatchEvent(
                new Event("input")
            );

        }

    }

}
// ======================================================
// WEBSOCKET UI - DAY 38
// ======================================================

function initWebSocketUI() {

    const wsInput =
        document.getElementById("ws-input");

    const wsSend =
        document.getElementById("ws-send");

    if (!wsInput || !wsSend) {
        return;
    }

    wsSend.addEventListener(
        "click",
        function () {

            const message =
                wsInput.value.trim();

            if (message === "") {
                return;
            }

            sendLiveMessage(message);

            wsInput.value = "";

        }
    );

}
// ======================================================
// DAY 41 - WEB WORKER
// ======================================================

function initWebWorker() {

    const processBtn =
        document.getElementById("process-btn");

    if (!processBtn) {
        return;
    }

    const myWorker =
        new Worker("./worker.js");

    processBtn.addEventListener(
        "click",
        function () {

            myWorker.postMessage("START");

        }
    );

    myWorker.onmessage = function (e) {

        console.log(
            "Result:",
            e.data
        );

    };
}
function initGlobalStateUI() {
    const stateDisplay = document.createElement("div");

    stateDisplay.id = "global-state-display";
    stateDisplay.innerHTML = `
        <strong>Global State</strong>
        <span>Cart Count: 0</span>
    `;

    document.body.appendChild(stateDisplay);

    globalStore.subscribe((state) => {
        stateDisplay.querySelector("span").textContent =
            `Cart Count: ${state.cartCount}`;

        console.log("Global state updated:", state);
    });

    globalStore.setState({
        cartCount: 1
    });
}


// ======================================================
// INITIALIZE APP
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initThemeToggle();

        initMobileMenu();

        initHeroButton();

        initContactForm();

        initFormDraft();

        initProjects();

        initModal();

        initTestimonials();

        initTaskTracker();

        initScrollObserver();

        initKanbanBoard();

        initGithubLookup();

        initProposalForm();

        initProposalManagement();

        fetchNextPage();

        initInfiniteScroll();

        initUrlSearchParams();

        initWebSocketUI();

        initWebWorker();

        initGlobalStateUI();

    }
);
// ======================================================
// SERVICE WORKER - DAY 39
// ======================================================

window.addEventListener(
    "load",
    function () {

        if ("serviceWorker" in navigator) {

            navigator.serviceWorker
                .register("./sw.js")
                .then(function (registration) {

                    console.log(
                        "Service Worker registered successfully:",
                        registration.scope
                    );

                })
                .catch(function (error) {

                    console.error(
                        "Service Worker registration failed:",
                        error
                    );

                });

        }

    }
);
getOfflineData()
    .then(data => {
        console.log("IndexedDB data loaded:", data);
    })
    .catch(error => {
        console.error("IndexedDB read error:", error);
    });
router();
