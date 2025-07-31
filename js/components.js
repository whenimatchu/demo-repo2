// Function to include HTML components
function includeHTML(id, file) {
    console.log(`Attempting to load component: ${file} into #${id}`);

    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id "${id}" not found`);
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(`${file} - Ready State: ${xhr.readyState}, Status: ${xhr.status}`);

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(`Loaded HTML content for ${file}:`, xhr.responseText.substring(0, 100));
                element.innerHTML = xhr.responseText;

                // Update active state if this is the navbar
                if (file === 'navbar.html') {
                    updateActiveNavLink();
                }
            } else {
                console.error(`Error loading component ${file}:`, xhr.status);
                element.innerHTML = `<div style="color: red; padding: 20px;">
                    Error loading ${file}. Status: ${xhr.status}
                    <br>Please ensure all files are in the correct location.
                </div>`;
            }
        }
    };

    xhr.open('GET', `components/${file}`, true);
    xhr.send();
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

// Load components when page loads
document.addEventListener('DOMContentLoaded', function () {
    includeHTML('navbar', 'navbar.html');
    includeHTML('footer', 'footer.html');
});
