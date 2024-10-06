import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");

    // Get the UI runtime.
    const { runtime } = addOnUISdk.instance;

    // Get the proxy object, which is required
    // to call the APIs defined in the Document Sandbox runtime
    // i.e., in the `code.js` file of this add-on.
    const sandboxProxy = await runtime.apiProxy("documentSandbox");

    const createRectangleButton = document.getElementById("createRectangle");
    createRectangleButton.addEventListener("click", async event => {
        await sandboxProxy.createRectangle();
    });

    // Enable the button only when:
    // 1. `addOnUISdk` is ready,
    // 2. `sandboxProxy` is available, and
    // 3. `click` event listener is registered.
    createRectangleButton.disabled = false;
});

// Define the onLoad function and isLoaded variable
let isLoaded = false;
const onLoad = () => {
    isLoaded = true;
};

// Add the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
    // Create a container element
    const container = document.createElement("div");

    // Set the inner HTML of the container
    container.innerHTML = `
        <div id="model" className="w-full h-screen" aria-label="3D model container">
            <Spline
                scene="https://prod.spline.design/7CobhRJFJAnjKcN0/scene.splinecode"
                onLoad={onLoad}
            />
            ${isLoaded ? '<GSAPComponent childRef={childRef} />' : ''}
        </div>
    `;

    // Append the container to the body or any other desired location
    document.body.appendChild(container);
});