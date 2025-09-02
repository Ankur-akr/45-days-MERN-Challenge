const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newBtn = document.getElementById('newBtn');
const copyBtn = document.getElementById('copyBtn');
const API = 'https://api.api-ninjas.com/v1/quotes';
const API_KEY = '---'; // Replace with your API key

async function getQuote() {
  quoteEl.textContent = "Loading...";
  authorEl.textContent = "";

  try {
    const res = await fetch(API, {
      headers: { 'X-Api-Key': API_KEY }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const text = data[0]?.quote || 'No quote found.';
    const author = data[0]?.author || 'Unknown';

    quoteEl.textContent = `“${text}”`;
    authorEl.textContent = `— ${author}`;
  } catch (err) {
    quoteEl.textContent = 'Oops! Failed to load a quote. Please try again.';
    authorEl.textContent = '';
    console.error(err);
  }
}

// Copy to clipboard
async function copyQuote() {
  const text = [quoteEl.textContent, authorEl.textContent].filter(Boolean).join('\n');
  try {
    await navigator.clipboard.writeText(text);
    flash(copyBtn, 'Copied!');
  } catch {
    flash(copyBtn, 'Failed');
  }
}

function flash(btn, label) {
  const original = btn.textContent;
  btn.textContent = label;
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 900);
}

// Events
newBtn.addEventListener('click', getQuote);
copyBtn.addEventListener('click', copyQuote);

// Load one on start
getQuote();
