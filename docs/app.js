/* ============================================
   SECOND ACT NAVIGATOR — APP LOGIC
   ============================================ */

// ---- Screen Navigation ----
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  // Show target screen
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
  }

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.screen === screenId) {
      link.classList.add('active');
    }
  });

  // Close mobile nav
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navToggle').classList.remove('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSettings() {
  showScreen('settings');
}

// ---- Mobile Navigation ----
function toggleMobileNav() {
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('mainNav');
  const navLinks = document.getElementById('navLinks');
  if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    document.getElementById('navToggle').classList.remove('active');
  }
});

// ---- Profile Questions ----
let currentQuestion = 1;
const totalQuestions = 8;

function nextQuestion(num) {
  // Hide current
  document.querySelector(`.question-card[data-question="${currentQuestion}"]`).classList.remove('active');

  // Show next
  currentQuestion = num;
  const nextCard = document.querySelector(`.question-card[data-question="${num}"]`);
  if (nextCard) {
    nextCard.classList.add('active');
    updateProgress(num);
  }
}

function prevQuestion(num) {
  document.querySelector(`.question-card[data-question="${currentQuestion}"]`).classList.remove('active');
  currentQuestion = num;
  const prevCard = document.querySelector(`.question-card[data-question="${num}"]`);
  if (prevCard) {
    prevCard.classList.add('active');
    updateProgress(num);
  }
}

function updateProgress(questionNum) {
  const percentage = (questionNum / totalQuestions) * 100;
  document.getElementById('progressFill').style.width = percentage + '%';
  document.getElementById('progressText').textContent = `Question ${questionNum} of ${totalQuestions}`;
}

function selectChip(chip, inputId) {
  // Remove selected from siblings
  chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  // Select this one
  chip.classList.add('selected');
  // Store value
  document.getElementById(inputId).value = chip.textContent.trim();
}

function finishProfile() {
  // Show a brief loading state
  const btn = document.querySelector('.btn-finish');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="loading-dots">Analysing your experience</span>';
  btn.disabled = true;

  // Simulate AI processing
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    showScreen('career-matches');
    showToast('Your career matches are ready!');
  }, 2000);
}

// ---- Job Actions ----
function saveJob(btn) {
  const icon = btn.querySelector('svg');
  if (btn.classList.contains('saved')) {
    btn.classList.remove('saved');
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> Save this job`;
    showToast('Job removed from saved list');
  } else {
    btn.classList.add('saved');
    btn.style.borderColor = 'var(--green-500)';
    btn.style.color = 'var(--green-600)';
    btn.style.background = 'var(--green-50)';
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="var(--green-500)" stroke="var(--green-500)" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> Saved!`;
    showToast('Job saved to your list');
  }
}

// ---- Resume Builder ----
function switchDocTab(tab) {
  document.querySelectorAll('.doc-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.doc-content').forEach(c => c.classList.remove('active'));

  if (tab === 'resume') {
    document.querySelectorAll('.doc-tab')[0].classList.add('active');
    document.getElementById('doc-resume').classList.add('active');
  } else {
    document.querySelectorAll('.doc-tab')[1].classList.add('active');
    document.getElementById('doc-cover-letter').classList.add('active');
  }
}

function downloadDoc(type) {
  showToast(`Your ${type === 'resume' ? 'resume' : 'cover letter'} is downloading...`);
}

// ---- Application Tracker ----
function showFollowUp() {
  document.getElementById('followUpModal').classList.add('active');
}

function closeFollowUp() {
  document.getElementById('followUpModal').classList.remove('active');
}

function sendFollowUp() {
  closeFollowUp();
  showToast('Follow-up email sent successfully!');
}

function showOfferToast() {
  showToast('Offer review feature coming soon!');
}

// ---- Interview Prep ----
function submitNotify() {
  const email = document.getElementById('notifyEmail').value;
  if (email && email.includes('@')) {
    document.getElementById('notifyConfirm').style.display = 'block';
    document.getElementById('notifyEmail').value = '';
    showToast('You\'re on the list!');
  } else {
    showToast('Please enter a valid email address');
  }
}

// ---- Toast Notifications ----
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ---- Scroll Effects ----
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.style.boxShadow = 'var(--shadow-md)';
  } else {
    nav.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// ---- Loading Dots Animation ----
const style = document.createElement('style');
style.textContent = `
  .loading-dots::after {
    content: '';
    animation: dots 1.5s steps(4, end) infinite;
  }
  @keyframes dots {
    0%, 20% { content: ''; }
    40% { content: '.'; }
    60% { content: '..'; }
    80%, 100% { content: '...'; }
  }
`;
document.head.appendChild(style);

// ---- Keyboard Navigation ----
document.addEventListener('keydown', function(e) {
  // Enter key advances questions in profile
  if (e.key === 'Enter' && document.getElementById('screen-profile').classList.contains('active')) {
    const activeCard = document.querySelector('.question-card.active');
    if (activeCard) {
      const continueBtn = activeCard.querySelector('.btn-primary');
      if (continueBtn) {
        continueBtn.click();
      }
    }
  }

  // Escape closes modal
  if (e.key === 'Escape') {
    closeFollowUp();
  }
});

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', function() {
  // Ensure welcome screen is active
  showScreen('welcome');

  // Add smooth entrance animation to cards when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.career-card, .job-card, .feature-card, .trust-item, .settings-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
});
