// ===== WEDDING INVITATION — MODEL 2 (EDITORIAL) =====
// Sharfiya Sharin & Muhammad Shanaf | Wedding: 4th October 2026, 11:00 AM IST

(function () {
  'use strict';

  const WEDDING_DATE = new Date('2026-10-04T11:00:00+05:30');
  const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ===== LOADING SCREEN =====
  function initLoadingScreen() {
    const loader = $('#loadingScreen');
    const openBtn = $('#openInvitationBtn');
    if (!loader || !openBtn) return;

    openBtn.addEventListener('click', () => {
      // Audio
      const audio = $('#bgAudio');
      if (audio) {
        audio.volume = 1.0;
        audio.play().catch(e => console.log('Audio error:', e));
      }
      
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 1000);
    });
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  function initScrollReveal() {
    const revealElements = $$('.fade-up');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    revealElements.forEach((el) => observer.observe(el));
  }

  // ===== PARALLAX =====
  function initParallax() {
    const heroSection = $('.hero-editorial');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          heroSection.classList.add('scrolled');
        } else {
          heroSection.classList.remove('scrolled');
        }
      });
    }, { passive: true });
  }

  // ===== COUNTDOWN TIMER =====
  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const $d = $('#days');
    const $h = $('#hours');
    const $m = $('#minutes');
    const $s = $('#seconds');

    if ($d) $d.textContent = String(days).padStart(2, '0');
    if ($h) $h.textContent = String(hours).padStart(2, '0');
    if ($m) $m.textContent = String(minutes).padStart(2, '0');
    if ($s) $s.textContent = String(seconds).padStart(2, '0');
  }

  // ===== FLOATING PETALS =====
  function initPetals() {
    const container = $('#petals');
    if (!container) return;

    const petalCount = 20; // Number of petals
    for (let i = 0; i < petalCount; i++) {
      createPetal(container);
    }
    
    // Interactive Petals - Dodge Mouse
    container.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('petal')) {
        const petal = e.target;
        const randomX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200 + 100);
        const randomY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200 + 100);
        const randomRot = Math.random() * 360;
        
        // Pause the CSS animation temporarily and push it away
        petal.style.animationPlayState = 'paused';
        petal.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.5) rotate(${randomRot}deg)`;
        petal.style.opacity = '0';
        
        // Reset and let it fall again after it fades
        setTimeout(() => {
          petal.style.transform = 'none';
          petal.style.animationPlayState = 'running';
          petal.style.opacity = '0.8';
        }, 600);
      }
    });
  }

  function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Randomize petal properties
    const size = Math.random() * 15 + 10; // 10px to 25px
    const left = Math.random() * 100; // 0 to 100vw
    const duration = Math.random() * 5 + 5; // 5s to 10s fall duration
    const delay = Math.random() * 10; // 0s to 10s delay
    const sway = (Math.random() * 60 + 20) * (Math.random() > 0.5 ? 1 : -1); // -80px to 80px sway
    
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${left}vw`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty('--swayX', `${sway}px`);
    
    container.appendChild(petal);
  }

  // ===== SPOTLIGHT EFFECT =====
  function initSpotlight() {
    if (isTouchDevice()) return;
    const cards = $$('.spotlight-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // ===== 3D TILT EFFECT =====
  function initTilt() {
    if (isTouchDevice()) return;
    const cards = $$('.glass-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      });
    });
  }

  // ===== MAGNETIC BUTTONS =====
  function initMagnetic() {
    if (isTouchDevice()) return;
    const btns = $$('.open-btn');
    
    btns.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // ===== CLICK RIPPLES =====
  function initRipples() {
    document.addEventListener('click', function (e) {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      
      const size = 50;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - size/2}px`;
      ripple.style.top = `${e.clientY - size/2 + window.scrollY}px`;
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // ===== TYPING EFFECT =====
  function initTyping() {
    const quoteEl = $('#typeQuote');
    if (!quoteEl) return;
    
    const text = '"Two souls but a single thought, two hearts that beat as one."';
    let i = 0;
    let started = false;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        quoteEl.classList.add('typing');
        const typeWriter = () => {
          if (i < text.length) {
            quoteEl.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
          } else {
            setTimeout(() => quoteEl.classList.remove('typing'), 2000);
          }
        };
        setTimeout(typeWriter, 500);
      }
    }, { threshold: 0.5 });

    observer.observe(quoteEl);
  }

  function init() {
    initLoadingScreen();
    initScrollReveal();
    initParallax();
    initPetals();
    initSpotlight();
    initTilt();
    initMagnetic();
    initRipples();
    initTyping();
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
