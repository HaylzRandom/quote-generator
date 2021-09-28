const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading Spinner
const loadSpinner = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

// Hide Loading Spinner
const hideSpinner = () => {
	if (!loader.hidden) {
		loader.hidden = true;
		quoteContainer.hidden = false;
	}
};

// Show New Quote
const newQuote = () => {
	loadSpinner();

	// Pick a Random Quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

	// Check is author field is null
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}

	// Check quote length, to detemine styling
	if (quote.text.length > 50) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	// Set Quote, hide loader
	quoteText.textContent = quote.text;
	hideSpinner();
};

/* Get Quotes From API */
const getQuotes = async () => {
	loadSpinner();

	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch Error
		alert('Sorry there was an error');
	}
};

// Tweet Quote

const tweetQuote = () => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
};

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);

twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
