const CONTENT_PATH: string = "content/";
const app = document.getElementById("app");

window.onload = () => {
    loadContentOnApp("modeSelect");
}

// Load Content on App Function
function loadContentOnApp(htmlName: string) {
    if (app) { // Added null check here as well.
        loadContent(app, htmlName);
    } else {
        console.error("Element with ID 'app' not found.");
    }
}

// Load Content
function loadContent(targetElement: HTMLElement, html: string, basePath = CONTENT_PATH) { // Corrected type here
    const path = basePath + html + ".html";
    targetElement.innerHTML = "";
    fetch(path)
        .then(response => response.text())
        .then(data => targetElement.innerHTML = data)
        .catch(error => console.error('Error loading content: ', error));
}