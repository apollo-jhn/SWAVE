document.addEventListener("DOMContentLoaded", () => {
  navigateTo("homepage");
});

async function navigateTo(route: string): Promise<void> {
  const appElement = document.getElementById("app");
  if (!appElement) {
    console.error("Element with ID 'app' not found in the DOM.");
    return;
  }

  // 1. Immediately load the loading template
  await loadTemplate("loading");
  appElement.innerHTML = await loadTemplate("loading");
  history.pushState({ route: "loading" }, "", `#loading`); // Update history to show loading

  // 2. Perform your dynamic operations here
  try {
    // Simulate an asynchronous operation with randomized waiting time
    const minWait = 200;
    const maxWait = 1000;
    const randomWait = Math.random() * (maxWait - minWait) + minWait;
    await new Promise((resolve) => setTimeout(resolve, randomWait));

    const dynamicData = await fetchDynamicData(route); // Example: Fetch data based on the target route
    const finalTemplate = await loadTemplate(route);

    // 3. Update the app element with the final content and update history
    appElement.innerHTML = finalTemplate;
    history.pushState({ route }, "", `#${route}`);
  } catch (error) {
    console.error(
      "Error during dynamic operation or loading final template:",
      error
    );
    // Optionally navigate to an error page
    await loadTemplate("error");
    history.pushState({ route: "error" }, "", `#error`);
  }
}

async function loadTemplate(templateName: string): Promise<string> {
  const response = await fetch(`assets/templates/${templateName}.html`);
  if (!response.ok) {
    console.error(
      `Failed to load template: assets/templates/${templateName}.html`
    );
    return "";
  }
  return await response.text();
}

// Example function for fetching dynamic data (replace with your actual logic)
async function fetchDynamicData(route: string): Promise<any> {
  // You can fetch data from an API based on the route,
  // perform calculations, or any other dynamic operation here.
  console.log(`Fetching dynamic data for route: ${route}`);
  const minWait = 200;
  const maxWait = 1000;
  const randomWait = Math.random() * (maxWait - minWait) + minWait;
  await new Promise((resolve) => setTimeout(resolve, randomWait)); // Simulate data fetching with random delay
  return { data: `Data for ${route}` };
}

// OLD CODE
/*
async function navigateTo(route: string): Promise<void> {
  const response = await fetch(`assets/templates/${route}.html`);
  const html = await response.text();
  const appElement = document.getElementById("app");
  if (appElement) {
    appElement.innerHTML = html;
    history.pushState({ route }, "", `#${route}`);
  } else {
    console.error("Element with ID 'app' not found in the DOM.");
  }
}
*/
