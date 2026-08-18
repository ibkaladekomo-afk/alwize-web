// alwize — interactions

// 1. Sticky nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// 2. Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// 2b. Reliable in-page anchor scrolling (CSS scroll-behavior is unreliable on some browsers)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: 'instant' });
    if (links) links.classList.remove('open');
  });
});

// 3. Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 3b. If the page loads (or changes) to a #hash, reveal that section immediately.
//     Ad clicks land straight on an anchor, where the scroll observer never fires
//     for the target — this stops the section rendering invisible.
function revealHash() {
  const id = location.hash.slice(1);
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('in');
  el.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
}
revealHash();
window.addEventListener('hashchange', revealHash);

// 4. FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const open = item.classList.contains('open');
    // close others
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) { other.classList.remove('open'); other.querySelector('.faq-a').style.maxHeight = null; }
    });
    item.classList.toggle('open', !open);
    a.style.maxHeight = open ? null : a.scrollHeight + 'px';
  });
});

// 4b. Pricing toggle (monthly / one-time)
document.querySelectorAll('.pt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.dataset.plan;
    document.querySelectorAll('.pt-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.plan-panel').forEach(p => { p.hidden = p.dataset.panel !== plan; });
  });
});

// 5. Lightbox for work gallery
const lb = document.getElementById('lb');
if (lb) {
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => { lbImg.src = img.src; lb.classList.add('open'); });
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

// 6. Contact form — AJAX submit to Formspree (JSON mode works on the free tier;
//    the _next redirect is a paid feature, so we do the redirect ourselves).
//    Formspree still applies its spam filtering + the _gotcha honeypot server-side
//    before returning ok, so we only land on /thanks.html — where the Google Ads
//    conversion fires — on genuinely accepted leads.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        window.location.href = '/thanks.html';
        return;
      }
      let msg = 'Something went wrong. Please email ask@getalwize.com.';
      try {
        const data = await res.json();
        if (data && data.errors && data.errors.length) {
          msg = data.errors.map(x => x.message).join(', ');
        }
      } catch (_) {}
      alert(msg);
    } catch (_) {
      alert('Network error — please email ask@getalwize.com.');
    }
    if (btn) { btn.disabled = false; btn.textContent = label; }
  });
}
