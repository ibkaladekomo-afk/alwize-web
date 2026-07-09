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

// 3. Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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

// 6. Contact form -> Formspree (AJAX, no page reload)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.action.includes('REPLACE_ME')) {
    status.textContent = 'Form not connected yet — add your Formspree ID (see README).';
    status.className = 'form-status err';
    return;
  }
  status.textContent = 'Sending…';
  status.className = 'form-status';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      form.reset();
      status.textContent = "Thanks — we'll be in touch within one business day.";
      status.className = 'form-status ok';
    } else {
      throw new Error('bad response');
    }
  } catch {
    status.textContent = 'Something went wrong. Please email ask@getalwize.com.';
    status.className = 'form-status err';
  }
});
