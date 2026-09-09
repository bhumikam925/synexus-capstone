// ======================================================
// SYNEXUS SPA ROUTER
// DAY 49 - DATA STREAMS & ROUTING
// ======================================================

const base = "/50-days-web-dev-challenge-";

const routes = {
    "/": "home",
    "/about": "about",
    "/initiatives": "initiatives",
    "/team": "team",
    "/github": "github",
    "/contact": "contact"
};

export function router() {
    const currentPath = window.location.pathname;

    const path = currentPath.startsWith(base)
        ? currentPath.slice(base.length) || "/"
        : currentPath;

    const route = routes[path] || "home";

    const activeSection = document.getElementById(route);

    if (activeSection) {
        activeSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    console.log("Current route:", route);
}

export function navigateTo(url) {
    const newUrl = url === "/"
        ? base + "/"
        : base + url;

    history.pushState(null, null, newUrl);
    router();
}

window.addEventListener("popstate", router);

document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) return;

    const url = link.getAttribute("href");

    if (!url || !url.startsWith("/")) return;

    event.preventDefault();

    navigateTo(url);
});
