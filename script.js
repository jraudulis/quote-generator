const newQuoteBtn = document.getElementById('new-quote');
const quoteContainer = document.getElementById('quote-container');
const twitterBtn = document.getElementById('twitter');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const loadAnime = document.getElementById('loader');

let apiQuotes = [];

// Show loading animation
function loading() {
    loadAnime.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading animation
function hideLoading() {
    quoteContainer.hidden = false;
    loadAnime.hidden = true;
}

// Show new quote function
function newQuote() {
    // Get random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length and adjust font size with class
    if (quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;

    // Function call to hide loading animation
    hideLoading();

}

// Get quotes from API
async function returnQuote() {
    try {
        // Function call for loading animation
        loading();
        const response = await fetch('https://jacintodesign.github.io/quotes-api/data/quotes.json')
        apiQuotes = await response.json();
        newQuote();
        
    } catch(err) {
        console.log('Failed to resolve' + err)
    }
}

// Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);

twitterBtn.addEventListener('click', tweetQuote);

//On load
returnQuote();
