"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  showLoadingSpinner();
  // To pick a random quote from the quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   Check if author field is blank and, if so, replace with 'unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
    // Check quote length to determine stling
    if (quote.text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
  }
}

// Getting quotes from the API

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    getQuotes();
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Even listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
