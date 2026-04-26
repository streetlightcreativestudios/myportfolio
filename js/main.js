// ── HAMBURGER MENU ──
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks) return;
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');
    if (navLinks) navLinks.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
  });
});


// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});


// ── PROJECTS PAGE — CARD FADE IN ON LOAD ──
// Waits for the page to fully load before making cards visible
// so the CSS transition fires properly and cards don't stay invisible
window.addEventListener('DOMContentLoaded', () => {
  const projCards = document.querySelectorAll('.proj-card');
  if (projCards.length > 0) {
    requestAnimationFrame(() => {
      projCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('proj-visible');
        }, i * 100); // each card fades in 100ms after the previous
      });
    });
  }
});


// ── PROJECT FILTER (projects.html) ──
function filterProjects(btn, category) {
  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Show or hide cards based on category
  document.querySelectorAll('.proj-card').forEach((card, i) => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      // Small delay so display change registers before opacity transition
      setTimeout(() => card.classList.add('proj-visible'), i * 80);
    } else {
      card.classList.remove('proj-visible');
      // Wait for fade-out before hiding completely
      setTimeout(() => {
        if (!card.classList.contains('proj-visible')) {
          card.style.display = 'none';
        }
      }, 300);
    }
  });
}


// ── FADE-UP ON SCROLL ──
// Animates elements into view as the user scrolls down
const fadeEls = document.querySelectorAll(
  '.service-card, .project-card, .process-step, .about-teaser-inner, .testimonial-inner'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});


// ── CONTACT FORM (contact.html) ──
function submitForm() {
  let valid = true;

  // Validate name, email, phone
  ['contact-name', 'contact-email', 'contact-phone'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    if (!input.value.trim()) {
      input.style.borderColor = 'rgba(212,160,23,0.8)';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  // Validate message
  const message = document.getElementById('contact-message');
  if (message && !message.value.trim()) {
    message.style.borderColor = 'rgba(212,160,23,0.8)';
    valid = false;
  } else if (message) {
    message.style.borderColor = '';
  }

  if (!valid) return;

  // Show success state
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) form.style.display = 'none';
  if (success) success.classList.add('show');
}

function resetForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) {
    form.reset();
    form.style.display = 'block';
  }
  if (success) success.classList.remove('show');
}
