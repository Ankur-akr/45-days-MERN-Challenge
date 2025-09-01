const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
    toggleBtn.textContent = "☀️ Light Mode";
    } 
    else {
    toggleBtn.textContent = "🌙 Dark Mode";
    }
});
  