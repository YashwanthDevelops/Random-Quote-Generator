// Remove the predefined quotes array since we'll fetch quotes from API

// DOM elements
const quoteDisplay = document.getElementById('current-quote');
const authorDisplay = document.getElementById('quote-author');
const authorImage = document.getElementById('author-image');
const quoteDate = document.getElementById('quote-date');
const viewsCount = document.getElementById('views-count');
const likesCount = document.getElementById('likes-count');
const bookmarksCount = document.getElementById('bookmarks-count');
const generateButton = document.getElementById('generate-button');
const saveButton = document.getElementById('save-button');
const shareButton = document.getElementById('share-button');

// Function to generate random engagement numbers
function generateRandomEngagement() {
    viewsCount.textContent = Math.floor(Math.random() * 10000).toLocaleString();
    likesCount.textContent = Math.floor(Math.random() * 1000).toLocaleString();
    bookmarksCount.textContent = Math.floor(Math.random() * 500).toLocaleString();
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Function to fetch and display a random quote
async function generateQuote() {
    try {
        // Show loading state
        quoteDisplay.textContent = "Loading...";
        authorDisplay.textContent = "— Please wait";
        quoteDate.textContent = "";
        authorImage.src = "default-avatar.png";
        
        const response = await fetch('https://api.quotable.io/random', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const quote = await response.json();
        quoteDisplay.textContent = `"${quote.content}"`;
        authorDisplay.textContent = `@${quote.author.replace(/\s+/g, '').toLowerCase()}`;
        quoteDate.textContent = formatDate(quote.dateAdded);
        
        // Generate random engagement metrics
        generateRandomEngagement();
        
        // Set author profile image from Quotable API using authorSlug
        authorImage.src = `https://images.quotable.dev/profile/200/${quote.authorSlug}.jpg`;
        authorImage.onerror = function() {
            // Fallback to UI Avatars if the profile image fails to load
            this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(quote.author)}&background=random`;
        };
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteDisplay.textContent = "Failed to fetch quote. Please try again.";
        authorDisplay.textContent = "— Error";
        quoteDate.textContent = "";
    }
}

// Event listeners for buttons
generateButton.addEventListener('click', generateQuote);

// Basic save functionality (stores in memory)
const savedQuotes = [];
saveButton.addEventListener('click', () => {
    if (quoteDisplay.textContent && authorDisplay.textContent) {
        const savedQuote = {
            text: quoteDisplay.textContent,
            author: authorDisplay.textContent
        };
        savedQuotes.push(savedQuote);
        alert('Quote saved to memory! (For real implementation, would save to local storage or server)');
    }
});

// Share functionality (placeholder)
shareButton.addEventListener('click', () => {
    if (quoteDisplay.textContent && authorDisplay.textContent) {
        const quoteText = `${quoteDisplay.textContent} ${authorDisplay.textContent}`;
        alert('Share this quote: "' + quoteText + '"\n(For real implementation, could integrate with social sharing APIs)');
    }
});

// Generate initial quote when page loads
generateQuote();
