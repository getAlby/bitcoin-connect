let appendedFonts = false;
export function loadFonts() {
  if (appendedFonts) {
    return;
  }
  appendedFonts = true;
  const font = document.createElement('link');
  font.href =
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  font.rel = 'stylesheet';
  document.head.appendChild(font);
}
