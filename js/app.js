// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB12: JavaScript Fundamentals
// ==========================================

console.log('JavaScript loaded successfully!');
console.log('LAB12: Applying Variables and Objects');

// Example: Creating a sample favorite place
const sampleFavorite = {
    name: 'Starbucks on University Drive',
    category: 'coffee',
    rating: 5,
    notes: 'Great study spot with fast wifi',
    dateAdded: new Date().toLocaleDateString()
};

console.log('Sample Favorite Object:');
console.log(sampleFavorite);

// Practice: Display information about the sample favorite
console.log('Place Name:', sampleFavorite.name);
console.log('Category:', sampleFavorite.category);
console.log('Rating:', sampleFavorite.rating, 'out of 5 stars');
console.log('Notes:', sampleFavorite.notes);
console.log('Date Added:', sampleFavorite.dateAdded);

// Build a formatted display message
let displayMessage = sampleFavorite.name + ' (' + sampleFavorite.category + ') - ' +
                     sampleFavorite.rating + '/5 stars';
console.log('Display Format:', displayMessage);

// Check data types
console.log('Data Types:');
console.log('  name is a', typeof sampleFavorite.name);
console.log('  rating is a', typeof sampleFavorite.rating);

console.log('Ready for LAB13: Functions & DOM Manipulation!');


let rating1 = 5;
let rating2 = 4;
let rating3 = 5;

let totalRating = rating1 + rating2 + rating3;
let averageRating = totalRating / 3;

console.log('Total Rating:', totalRating);
console.log('Average Rating:', averageRating);
console.log('Average (rounded):', averageRating.toFixed(1));

let placeName = 'Starbucks';
let category = 'coffee';
let rating = 5;
let notes = 'Great wifi';

// Create different display formats
let format1 = placeName + ' - ' + rating + '/5';
let format2 = category.toUpperCase() + ': ' + placeName;
let format3 = '⭐'.repeat(rating) + ' ' + placeName;

console.log(format1);
console.log(format2);
console.log(format3);

let favorite4 = {
    name: 'Abercrombie',
    category: 'shopping',  // Try: fitness, services, shopping
    rating: 5,
    notes: 'They have such cute clothing options.'
};

let favorite5 = {
    name: 'Eatzis',
    category: 'Restaurant',
    rating: 5,
    notes: 'Best place for a quick bite to eat.'
};

// Display both with formatted strings
console.log(favorite4.name + ' (' + favorite4.category + ')');
console.log(favorite5.name + ' (' + favorite5.category + ')');

console.log('Abercrombie:', favorite4.notes);
console.log('Eatzis:', favorite5.notes);

let format4 = '⭐️'.repeat(favorite4.rating) + ' ' + favorite4.name;
let format5 = '⭐️'.repeat(favorite5.rating) + ' ' + favorite5.name; 
console.log(format4);
console.log(format5); 