const CONTENT_PATH = "content/"
const app = document.getElementById("app");

window.onload = () => {
    loadContentOnApp("modeSelect");
}

// Load Content on App Function
function loadContentOnApp(html) {
    loadContent(app, html)
}

// Load Content
function loadContent(targetElement, html, basePath = CONTENT_PATH) {
    const path = basePath + html + ".html";
    targetElement.innerHTML = "";
    fetch(path)
      .then(response => response.text())
      .then(data => targetElement.innerHTML = data)
      .catch(error => console.error('Error loading content: ', error));
  }