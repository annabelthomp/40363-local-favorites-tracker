// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB15: localStorage Persistence - COMPLETE!
// ==========================================

console.log('LAB15: localStorage Persistence');
console.log('Project 2: Local Favorites Tracker - COMPLETE!');

// Array to store all favorites
let favorites = [];

// Get references to DOM elements
const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// Function to save favorites to localStorage
function saveFavorites() {
    try {
        localStorage.setItem('localFavorites', JSON.stringify(favorites));
        console.log('Favorites saved to localStorage');
        console.log('Saved', favorites.length, 'favorites');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Unable to save favorites. Your browser may have storage disabled.');
    }
}
// Test localStorage manually
localStorage.setItem('test', 'hello');
console.log(localStorage.getItem('test')); // Should show 'hello'

// Check if localStorage is available
if (typeof(Storage) !== "undefined") {
    console.log('localStorage is supported');
} else {
    console.log('localStorage not supported');
}


// Function to load favorites from localStorage
function loadFavorites() {
    try {
        const savedData = localStorage.getItem('localFavorites');

        if (savedData) {
            favorites = JSON.parse(savedData);
            console.log('Favorites loaded from localStorage');
            console.log('Loaded', favorites.length, 'favorites');
        } else {
            console.log('No saved favorites found');
            favorites = [];
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        console.log('Starting with empty favorites array');
        favorites = [];
    }
}

// [Your other functions from LAB13-14: displayFavorites, searchFavorites, deleteFavorite, addFavorite]

// Function to clear all favorites
function clearAllFavorites() {
    const confirmClear = confirm('Are you sure you want to delete ALL favorites? This cannot be undone!');

    if (confirmClear) {
        favorites = [];
        console.log('All favorites cleared');

        localStorage.removeItem('localFavorites');
        console.log('localStorage cleared');

        displayFavorites();
        alert('All favorites have been deleted.');
    } else {
        console.log('Clear all cancelled by user');
    }
        // Display count
    const countMessage = document.createElement('p');
    countMessage.className = 'favorites-count';
    countMessage.textContent = `Showing ${filteredFavorites.length} of ${favorites.length} favorites`;
    favoritesList.prepend(countMessage);
}

// Connect event listeners
form.addEventListener('submit', addFavorite);
searchInput.addEventListener('input', searchFavorites);
categoryFilter.addEventListener('change', searchFavorites);

const clearAllBtn = document.getElementById('clear-all-btn');
if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllFavorites);
}

// Make sure preventDefault is called
form.addEventListener('submit', function(event) {
    event.preventDefault(); // This is crucial!
    console.log('Form submitted');
});

// Verify form elements have correct names
const formData = new FormData(form);
console.log('Form data:', Object.fromEntries(formData));

console.log('Event listeners attached - app is ready!');

// Load saved favorites from localStorage on startup
loadFavorites();

// Display the loaded favorites (or empty message)
displayFavorites();

console.log('✅ Project 2: Local Favorites Tracker is ready to use!');


// Function to load favorites from localStorage
function loadFavorites() {
    try {
        const savedData = localStorage.getItem('localFavorites');

        if (savedData) {
            favorites = JSON.parse(savedData);
            console.log('Favorites loaded from localStorage');
            console.log('Loaded', favorites.length, 'favorites');
        } else {
            console.log('No saved favorites found');
            favorites = [];
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        console.log('Starting with empty favorites array');
        favorites = [];
    }
}

// Add missing core functions: addFavorite, displayFavorites, deleteFavorite, searchFavorites
function addFavorite(event) {
    event.preventDefault();

    // Read form values (adjust names if your form uses different input names)
    const formData = new FormData(form);
    const title = (formData.get('title') || formData.get('name') || '').toString().trim();
    const url = (formData.get('url') || '').toString().trim();
    const category = (formData.get('category') || 'Uncategorized').toString().trim();
    const notes = (formData.get('notes') || '').toString().trim();
    const rating = (formData.get('rating') || '').toString().trim();

    if (!title) {
        alert('Please enter a title/name for the favorite.');
        return;
    }

    const newFavorite = {
        id: Date.now(),
        title,
        url,
        category,
        notes,
        rating,
        createdAt: new Date().toISOString()
    };

    favorites.push(newFavorite);
    saveFavorites();
    displayFavorites();
    form.reset();
    console.log('Added favorite:', newFavorite);
}

function displayFavorites(list = favorites) {
    favoritesList.innerHTML = '';

    if (!Array.isArray(list) || list.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-message';
        empty.textContent = 'No favorites yet. Add your first favorite place above!';
        favoritesList.appendChild(empty);
        return;
    }

    // count
    const countMessage = document.createElement('p');
    countMessage.className = 'favorites-count';
    countMessage.textContent = `Showing ${list.length} of ${favorites.length} favorites`;
    favoritesList.appendChild(countMessage);

    // create grid of cards (favoritesList already has .favorites-grid)
    list.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'favorite-card';

        const title = document.createElement('h3');
        title.textContent = fav.title;
        card.appendChild(title);

        if (fav.category) {
            const cat = document.createElement('div');
            cat.className = 'favorite-category';
            cat.textContent = `Category: ${fav.category}`;
            card.appendChild(cat);
        }

        if (fav.rating) {
            const rating = document.createElement('div');
            rating.className = 'favorite-rating';
            rating.textContent = '★'.repeat(Number(fav.rating)) || fav.rating;
            card.appendChild(rating);
        }

        if (fav.notes) {
            const notes = document.createElement('div');
            notes.className = 'favorite-notes';
            notes.textContent = fav.notes;
            card.appendChild(notes);
        }

        if (fav.createdAt) {
            const date = document.createElement('div');
            date.className = 'favorite-date';
            date.textContent = new Date(fav.createdAt).toLocaleString();
            card.appendChild(date);
        }

        const actions = document.createElement('div');
        actions.className = 'favorite-actions';

        if (fav.url) {
            const view = document.createElement('a');
            view.className = 'btn';
            view.href = fav.url;
            view.target = '_blank';
            view.rel = 'noopener';
            view.textContent = 'View';
            actions.appendChild(view);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteFavorite(fav.id));
        actions.appendChild(deleteBtn);

        card.appendChild(actions);
        favoritesList.appendChild(card);
    });
}

function deleteFavorite(id) {
    const index = favorites.findIndex(f => f.id === id);
    if (index === -1) return;
    if (!confirm('Delete this favorite?')) return;
    favorites.splice(index, 1);
    saveFavorites();
    displayFavorites();
    console.log('Deleted favorite id:', id);
}

function searchFavorites() {
    const q = (searchInput.value || '').toLowerCase().trim();
    const category = (categoryFilter.value || '').trim();

    const filtered = favorites.filter(fav => {
        const matchQ = q === '' ||
            (fav.title && fav.title.toLowerCase().includes(q)) ||
            (fav.notes && fav.notes.toLowerCase().includes(q)) ||
            (fav.url && fav.url.toLowerCase().includes(q));
        const matchCat = category === '' || category === 'all' || (fav.category && fav.category === category);
        return matchQ && matchCat;
    });

    displayFavorites(filtered);
}


// Function to clear all favorites
function clearAllFavorites() {
    const confirmClear = confirm('Are you sure you want to delete ALL favorites? This cannot be undone!');

    if (confirmClear) {
        favorites = [];
        console.log('All favorites cleared');

        localStorage.removeItem('localFavorites');
        console.log('localStorage cleared');

        displayFavorites();
        alert('All favorites have been deleted.');
    } else {
        console.log('Clear all cancelled by user');
    }
}
// Connect event listeners
form.addEventListener('submit', addFavorite);
searchInput.addEventListener('input', searchFavorites);
categoryFilter.addEventListener('change', searchFavorites);