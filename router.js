// ======================================================
// SYNEXUS SPA ROUTER
// DAY 49 - DATA STREAMS & ROUTING
// ======================================================

const routes = {
    "#home": "home",
    "#about": "about",
    "#initiatives": "initiatives",
    "#team": "team",
    "#github": "github",
    "#contact": "contact"
};

export function router() {

    const hash = window.location.hash || "#home";

    const route = routes[hash] || "home";

    const activeSection =
        document.getElementById(route);

    if (activeSection) {

        activeSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    console.log("Current route:", route);
}

export function navigateTo(url) {

    window.location.hash = url;

    router();
}

window.addEventListener(
    "hashchange",
    router
);

document.addEventListener(
    "click",
    (event) => {

        const link =
            event.target.closest("a");

        if (!link) return;

        const url =
            link.getAttribute("href");

        if (!url || !url.startsWith("#")) {
            return;
        }

        event.preventDefault();

        navigateTo(url);

    }
);
