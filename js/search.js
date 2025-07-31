// Search data
const searchData = [
    { title: 'Home', url: 'index.html', keywords: ['home', 'main', 'gates', 'geospatial analytics'] },
    { title: 'Mission & Vision', url: 'mission.html', keywords: ['mission', 'vision', 'goals', 'objectives'] },
    { title: 'About Gates', url: 'about.html', keywords: ['about', 'gates', 'information', 'overview'] },
    { title: 'Contact Us', url: 'contact.html', keywords: ['contact', 'email', 'phone', 'address'] },
    { title: 'AI Team', url: 'ai.html', keywords: ['ai', 'artificial intelligence', 'machine learning', 'team'] },
    { title: 'Platform Team', url: 'platform.html', keywords: ['platform', 'development', 'software', 'team'] },
    { title: 'Lakehouse Team', url: 'lakehouse.html', keywords: ['lakehouse', 'data', 'analytics', 'team'] },
    { title: 'Management Team', url: 'management.html', keywords: ['management', 'leadership', 'team'] }
];

// Function to show search suggestions
function showSearchSuggestions(searchTerm) {
    console.log('Showing suggestions for:', searchTerm);

    let suggestionsContainer = document.getElementById('search-suggestions');
    if (!suggestionsContainer) {
        console.log('Creating suggestions container');
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'search-suggestions';
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.appendChild(suggestionsContainer);
        } else {
            console.error('Search container not found');
            return;
        }
    }

    if (!searchTerm) {
        console.log('Empty search term, hiding suggestions');
        suggestionsContainer.style.display = 'none';
        return;
    }

    const matches = searchData.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return item.title.toLowerCase().includes(searchLower) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(searchLower));
    });

    console.log('Found matches:', matches.length);

    const suggestionsHTML = matches.map(item => `
        <div class="search-suggestion" onclick="window.location.href='${item.url}'">
            <div class="suggestion-title">${item.title}</div>
            <div class="suggestion-keywords">${item.keywords.join(', ')}</div>
        </div>
    `).join('');

    suggestionsContainer.innerHTML = suggestionsHTML;
    suggestionsContainer.style.display = matches.length ? 'block' : 'none';
}

// Function to handle search submission
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-container input');
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) return;

    const matches = searchData.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return item.title.toLowerCase().includes(searchLower) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(searchLower));
    });

    if (matches.length > 0) {
        window.location.href = matches[0].url;
    }
}

// Function to initialize search after navbar is loaded
function initializeSearch() {
    console.log('Initializing search functionality');
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) {
        console.error('Search container not found');
        return;
    }

    const searchInput = searchContainer.querySelector('input');
    const searchButton = searchContainer.querySelector('button');

    if (!searchInput || !searchButton) {
        console.error('Search input or button not found');
        return;
    }

    console.log('Setting up event listeners');
    // Add event listeners
    searchInput.addEventListener('input', (e) => {
        console.log('Input event triggered');
        showSearchSuggestions(e.target.value);
    });

    searchInput.addEventListener('focus', (e) => {
        if (e.target.value) {
            showSearchSuggestions(e.target.value);
        }
    });

    searchInput.addEventListener('blur', () => {
        console.log('Blur event triggered');
        // Delay hiding suggestions to allow for clicks
        setTimeout(() => {
            const suggestions = document.getElementById('search-suggestions');
            if (suggestions) suggestions.style.display = 'none';
        }, 200);
    });

    searchButton.addEventListener('click', handleSearch);
    searchContainer.addEventListener('submit', handleSearch);
}

// Initialize search functionality after the navbar is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a short moment for the navbar component to load
    setTimeout(initializeSearch, 500);
});
