import './footer.css';

export function renderFooter() {
  const f = document.createElement('footer');
  f.textContent = `© ${new Date().getFullYear()} Terence Jay Eborda · Iligan City, Philippines`;
  return f;
}
