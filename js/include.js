// Function to include HTML files
async function includeHTML() {
    // Include all elements with data-include attribute
    const elements = document.getElementsByTagName("*");
    for (let element of elements) {
        const file = element.getAttribute("data-include");
        if (file) {
            try {
                const response = await fetch(file);
                const content = await response.text();
                element.innerHTML = content;
                element.removeAttribute("data-include");
            } catch (error) {
                console.error(`Error including file ${file}:`, error);
            }
        }
    }
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", includeHTML);
