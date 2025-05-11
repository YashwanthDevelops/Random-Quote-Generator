// Remove the predefined quotes array since we'll fetch quotes from API

// DOM elements
const quoteDisplay = document.getElementById('current-quote');
const authorDisplay = document.getElementById('quote-author');
const generateButton = document.getElementById('generate-button');
const saveButton = document.getElementById('save-button');
const shareButton = document.getElementById('share-button');

// Function to fetch and display a random quote
async function generateQuote() {
    try {
        // Show loading state
        quoteDisplay.textContent = "Loading...";
        authorDisplay.textContent = "— Please wait";
        
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
        authorDisplay.textContent = `— ${quote.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteDisplay.textContent = "Failed to fetch quote. Please try again.";
        authorDisplay.textContent = "— Error";
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
