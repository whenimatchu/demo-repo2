// Function to load HTML templates
async function loadTemplate(templatePath, targetElementId) {
    try {
        const response = await fetch(templatePath);
        const html = await response.text();

        // Create a temporary container
        const container = document.createElement('div');
        container.innerHTML = html;

        // Get the template content
        const template = container.querySelector('template');
        if (!template) {
            throw new Error(`Template not found in ${templatePath}`);
        }

        // Get the target element
        const targetElement = document.getElementById(targetElementId);
        if (!targetElement) {
            throw new Error(`Target element ${targetElementId} not found`);
        }

        // Clone and insert the template content
        const content = template.content.cloneNode(true);
        targetElement.appendChild(content);

        // Update active state in navigation if needed
        if (templatePath.includes('navbar')) {
            updateActiveNavLink();
        }
    } catch (error) {
        console.error(`Error loading template ${templatePath}:`, error);
    }
}

// Function to update the active state in navigation
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load templates when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('components/navbar.html', 'navbar-container');
    loadTemplate('components/footer.html', 'footer-container');
});
