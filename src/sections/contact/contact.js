import './contact.css';
import { makeSection } from '../../core/helpers.js';

const channels = [
  { label: 'Email', text: 'terencejay.eborda@g.msuiit.edu.ph', href: 'mailto:terencejay.eborda@g.msuiit.edu.ph' },
  { label: 'Phone', text: '+63 953 590 8102', href: 'tel:+639535908102' },
  { label: 'LinkedIn', text: 'terence-jay-eborda', href: 'https://www.linkedin.com/in/terence-jay-eborda-35493a424/', external: true }
];

export function renderContact() {
  const sec = makeSection('contact', 'Contact', 'Let’s build something.');
  const list = document.createElement('div');
  list.className = 'channels';
  list.innerHTML = channels.map((c) =>
    `<a class="cta" href="${c.href}"${c.external ? ' target="_blank" rel="noopener"' : ''}><small>${c.label}</small>${c.text}</a>`).join('');
  sec.firstElementChild.append(list);
  return sec;
}
