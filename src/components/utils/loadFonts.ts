let appendedFonts = false;
export function loadFonts() {
  if (appendedFonts) {
    return;
  }
  appendedFonts = true;
  for (const family of ['Inter', 'Roboto Mono']) {
    const font = document.createElement('link');
    font.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700&display=swap`;
    font.rel = 'stylesheet';
    document.head.appendChild(font);
  }
}
