const STUDIO_CONFIG = {
  name: 'NOIR FRAMES STUDIO',
  tagline: 'Every Frame Tells a Story.',
  description: 'Cinematic photography for life\'s most meaningful moments.',

  phoneDisplay: '+91 99675 90265',
  phoneLink: '919967590265',
  whatsappNumber: '919967590265',

  email: 'hello@example.com',
  address: 'Demo Address, Mumbai, Maharashtra, India',

  instagramUrl: 'https://www.instagram.com/',
  mapsUrl: 'https://maps.google.com/',

  currency: 'INR',
  currencySymbol: '₹',

  availabilityNote: 'Bookings open for the upcoming season',
  demoMode: true
};

const elements = {
  header: document.querySelector('.site-header'),
  navMenu: document.querySelector('.nav-menu'),
  navToggle: document.querySelector('.nav-toggle'),
  backToTop: document.querySelector('.back-to-top'),
  year: document.getElementById('year'),
  phoneLink: document.getElementById('phoneLink'),
  emailLink: document.getElementById('emailLink'),
  mapsLink: document.getElementById('mapsLink'),
  instagramLink: document.getElementById('instagramLink'),
  studioName: document.getElementById('studioName'),
  availabilityNote: document.getElementById('availabilityNote'),
  availabilityNoteContact: document.getElementById('availabilityNoteContact'),
  form: document.getElementById('inquiryForm'),
  formFeedback: document.getElementById('formFeedback'),
  copyButton: document.querySelector('.copy-message'),
  revealEls: document.querySelectorAll('.reveal')
};

const portfolioItems = [...document.querySelectorAll('.portfolio-item')];
const filterButtons = [...document.querySelectorAll('.filter')];
const testimonialItems = [...document.querySelectorAll('.testimonial')];
const testimonialDots = [...document.querySelectorAll('.dot')];
const faqItems = [...document.querySelectorAll('.faq-item')];
const serviceButtons = [...document.querySelectorAll('.service-btn')];
const packageButtons = [...document.querySelectorAll('.package-btn')];
const whatsappLink = 'https://wa.me/';

function getPhoneDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function updateStudioDetails() {
  const phoneDigits = getPhoneDigits(STUDIO_CONFIG.whatsappNumber || STUDIO_CONFIG.phoneLink);

  if (elements.phoneLink) {
    elements.phoneLink.href = `tel:${STUDIO_CONFIG.phoneLink || phoneDigits}`;
    elements.phoneLink.textContent = STUDIO_CONFIG.phoneDisplay || '+91 99675 90265';
  }

  if (elements.emailLink) {
    elements.emailLink.href = `mailto:${STUDIO_CONFIG.email}`;
    elements.emailLink.textContent = STUDIO_CONFIG.email;
  }

  if (elements.mapsLink) {
    elements.mapsLink.href = STUDIO_CONFIG.mapsUrl;
    elements.mapsLink.textContent = STUDIO_CONFIG.address;
  }

  if (elements.instagramLink) {
    elements.instagramLink.href = STUDIO_CONFIG.instagramUrl;
    elements.instagramLink.textContent = '@noirframesstudio';
  }

  if (elements.studioName) {
    elements.studioName.textContent = STUDIO_CONFIG.name;
  }

  if (elements.availabilityNote) {
    elements.availabilityNote.textContent = STUDIO_CONFIG.availabilityNote;
  }

  if (elements.availabilityNoteContact) {
    elements.availabilityNoteContact.textContent = STUDIO_CONFIG.availabilityNote;
  }

  if (elements.year) {
    elements.year.textContent = new Date().getFullYear();
  }

  if (STUDIO_CONFIG.demoMode || getPhoneDigits(STUDIO_CONFIG.whatsappNumber) === '919967590265') {
    document.body.classList.add('demo-mode');
  }
}

function buildInquiryMessage(details = {}) {
  const name = details.name || 'Guest';
  const selectedService = details.service || 'General enquiry';
  const date = details.date || 'Not specified';
  const location = details.location || 'Not specified';
  const budget = details.budget || 'Not specified';
  const message = details.message || 'I would like to know more about your photography services.';

  return [
    'Hello NOIR FRAMES STUDIO,',
    '',
    'I would like to enquire about a photography session.',
    '',
    `Name: ${name}`,
    `Service: ${selectedService}`,
    `Preferred Date: ${date}`,
    `Location: ${location}`,
    `Budget: ${budget}`,
    '',
    `Message: ${message}`,
    '',
    'Please share the available options and details. Thank you!'
  ].join('\n');
}

function buildPackageMessage(packageName) {
  return [
    'Hello NOIR FRAMES STUDIO,',
    '',
    `I would like to enquire about the ${packageName} package.`,
    '',
    'Please share availability, details and next steps.',
    'Thank you!'
  ].join('\n');
}

function openWhatsAppInquiry(details = {}) {
  const number = getPhoneDigits(STUDIO_CONFIG.whatsappNumber || STUDIO_CONFIG.phoneLink || '919967590265');
  const message = details.message || buildInquiryMessage(details);
  const url = `${whatsappLink}${number}?text=${encodeURIComponent(message)}`;

  const newTab = window.open(url, '_blank', 'noopener,noreferrer');
  if (!newTab) {
    const fallbackLink = `${whatsappLink}${number}?text=${encodeURIComponent(message)}`;
    if (elements.formFeedback) {
      elements.formFeedback.textContent = 'WhatsApp did not open automatically. Copy the message or open the direct WhatsApp link.';
      elements.formFeedback.className = 'form-feedback error';
      elements.formFeedback.innerHTML = `WhatsApp did not open automatically. <a href="${fallbackLink}" target="_blank" rel="noreferrer">Open WhatsApp</a> or use the copy button.`;
    }
    return false;
  }
  return true;
}

function setFieldError(input, message) {
  if (!input) return;
  const error = input.parentElement.querySelector('.error-message');
  input.classList.toggle('invalid', Boolean(message));
  if (error) {
    error.textContent = message || '';
  }
}

function getFormData() {
  const form = document.getElementById('inquiryForm');
  if (!form) return {};

  return {
    name: form.querySelector('#name')?.value.trim() || '',
    phone: form.querySelector('#phone')?.value.trim() || '',
    email: form.querySelector('#email')?.value.trim() || '',
    service: form.querySelector('#service')?.value.trim() || '',
    date: form.querySelector('#date')?.value || '',
    location: form.querySelector('#location')?.value.trim() || '',
    budget: form.querySelector('#budget')?.value.trim() || '',
    message: form.querySelector('#message')?.value.trim() || ''
  };
}

function validateForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return false;

  const data = getFormData();
  let isValid = true;

  const nameInput = form.querySelector('#name');
  if (!data.name) {
    setFieldError(nameInput, 'Please enter your full name.');
    isValid = false;
  } else {
    setFieldError(nameInput, '');
  }

  const phoneInput = form.querySelector('#phone');
  const digits = getPhoneDigits(data.phone);
  if (!data.phone || digits.length < 10 || !/^[0-9+()\-\s.]+$/.test(data.phone)) {
    setFieldError(phoneInput, 'Please enter a valid phone number.');
    isValid = false;
  } else {
    setFieldError(phoneInput, '');
  }

  const emailInput = form.querySelector('#email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email)) {
    setFieldError(emailInput, 'Please enter a valid email address.');
    isValid = false;
  } else {
    setFieldError(emailInput, '');
  }

  const serviceInput = form.querySelector('#service');
  if (!data.service) {
    setFieldError(serviceInput, 'Please select a photography service.');
    isValid = false;
  } else {
    setFieldError(serviceInput, '');
  }

  const messageInput = form.querySelector('#message');
  if (!data.message) {
    setFieldError(messageInput, 'Please tell us a little about your project.');
    isValid = false;
  } else {
    setFieldError(messageInput, '');
  }

  return isValid;
}

async function copyMessageToClipboard(message) {
  if (!message) return false;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(message);
      return true;
    }
  } catch (error) {
    console.warn('Clipboard API failed:', error);
  }

  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = message;
  tempTextArea.setAttribute('readonly', '');
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.left = '-9999px';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(tempTextArea);
  return copied;
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    if (elements.formFeedback) {
      elements.formFeedback.textContent = 'Please fix the highlighted fields and try again.';
      elements.formFeedback.className = 'form-feedback error';
    }
    return;
  }

  const data = getFormData();
  const inquiryMessage = buildInquiryMessage(data);

  if (elements.formFeedback) {
    elements.formFeedback.textContent = 'Opening WhatsApp so you can send the inquiry manually.';
    elements.formFeedback.className = 'form-feedback success';
  }

  const opened = openWhatsAppInquiry({
    name: data.name,
    service: data.service,
    date: data.date || 'Not specified',
    location: data.location || 'Not specified',
    budget: data.budget || 'Not specified',
    message: data.message
  });

  if (!opened && elements.copyButton) {
    elements.copyButton.style.display = 'inline-flex';
  }

  if (elements.copyButton) {
    const buttonText = elements.copyButton;
    buttonText.dataset.message = inquiryMessage;
  }
}

async function handleCopyMessage() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const data = getFormData();
  const message = buildInquiryMessage(data);
  const copied = await copyMessageToClipboard(message);

  if (elements.formFeedback) {
    if (copied) {
      elements.formFeedback.textContent = 'Inquiry message copied to the clipboard.';
      elements.formFeedback.className = 'form-feedback success';
    } else {
      elements.formFeedback.textContent = 'Unable to copy automatically. Please copy the message manually.';
      elements.formFeedback.className = 'form-feedback error';
    }
  }
}

function setHeaderState() {
  if (!elements.header) return;
  const scrolled = window.scrollY > 10;
  elements.header.classList.toggle('scrolled', scrolled);
}

function setupNav() {
  if (!elements.navToggle || !elements.navMenu) return;

  elements.navToggle.addEventListener('click', () => {
    const isOpen = elements.navMenu.classList.toggle('open');
    elements.navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  elements.navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      elements.navMenu.classList.remove('open');
      elements.navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      elements.navMenu.classList.remove('open');
      elements.navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupBackToTop() {
  if (!elements.backToTop) return;

  const toggleVisible = () => {
    elements.backToTop.classList.toggle('visible', window.scrollY > 500);
  };

  toggleVisible();
  window.addEventListener('scroll', toggleVisible);

  elements.backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupRevealObserver() {
  if (!elements.revealEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  elements.revealEls.forEach((el) => observer.observe(el));
}

function setupPortfolioFilters() {
  if (!filterButtons.length || !portfolioItems.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));

      portfolioItems.forEach((item) => {
        const shouldShow = filter === 'all' || item.classList.contains(filter);
        item.classList.toggle('hidden', !shouldShow);
      });
    });
  });
}

function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const image = document.getElementById('lightboxImage');
  const title = document.getElementById('lightboxTitle');
  const category = document.getElementById('lightboxCategory');
  const closeButton = document.querySelector('.lightbox-close');
  const closeBackdrop = document.querySelector('.lightbox-backdrop');
  const previousButton = document.querySelector('.lightbox-nav.prev');
  const nextButton = document.querySelector('.lightbox-nav.next');

  let activeIndex = 0;
  let visibleProjects = [];

  const syncVisibleProjects = () => {
    visibleProjects = portfolioItems.filter((item) => !item.classList.contains('hidden'));
  };

  const openLightbox = (event) => {
    const item = event.currentTarget;
    syncVisibleProjects();
    activeIndex = visibleProjects.indexOf(item);
    if (activeIndex < 0) return;

    const project = visibleProjects[activeIndex];
    if (!project) return;

    image.src = project.dataset.image;
    image.alt = project.querySelector('img')?.alt || project.dataset.title || 'Portfolio image';
    title.textContent = project.dataset.title || 'Project';
    category.textContent = project.dataset.category || 'Portfolio';

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  portfolioItems.forEach((item) => {
    item.addEventListener('click', openLightbox);
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox({ currentTarget: item });
      }
    });
    item.tabIndex = 0;
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
  }

  if (closeBackdrop) {
    closeBackdrop.addEventListener('click', (event) => {
      if (event.target === closeBackdrop) {
        closeLightbox();
      }
    });
  }

  previousButton?.addEventListener('click', () => {
    syncVisibleProjects();
    if (!visibleProjects.length) return;
    activeIndex = (activeIndex - 1 + visibleProjects.length) % visibleProjects.length;
    const project = visibleProjects[activeIndex];
    image.src = project.dataset.image;
    image.alt = project.querySelector('img')?.alt || project.dataset.title || 'Portfolio image';
    title.textContent = project.dataset.title || 'Project';
    category.textContent = project.dataset.category || 'Portfolio';
  });

  nextButton?.addEventListener('click', () => {
    syncVisibleProjects();
    if (!visibleProjects.length) return;
    activeIndex = (activeIndex + 1) % visibleProjects.length;
    const project = visibleProjects[activeIndex];
    image.src = project.dataset.image;
    image.alt = project.querySelector('img')?.alt || project.dataset.title || 'Portfolio image';
    title.textContent = project.dataset.title || 'Project';
    category.textContent = project.dataset.category || 'Portfolio';
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') {
      closeLightbox();
    }
    if (event.key === 'ArrowRight') {
      nextButton?.click();
    }
    if (event.key === 'ArrowLeft') {
      previousButton?.click();
    }
  });
}

function setupTestimonials() {
  if (!testimonialItems.length) return;

  let currentSlide = 0;

  const renderSlide = (index) => {
    testimonialItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });
    testimonialDots.forEach((dot, idx) => {
      const active = idx === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
  };

  const prevButton = document.querySelector('.slider-button.prev');
  const nextButton = document.querySelector('.slider-button.next');

  prevButton?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
    renderSlide(currentSlide);
  });

  nextButton?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    renderSlide(currentSlide);
  });

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      renderSlide(currentSlide);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      currentSlide = (currentSlide + 1) % testimonialItems.length;
      renderSlide(currentSlide);
    }
    if (event.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
      renderSlide(currentSlide);
    }
  });
}

function setupFaq() {
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((faq) => {
        faq.classList.remove('active');
        faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function setupWhatsAppButtons() {
  serviceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.dataset.service || 'Photography enquiry';
      openWhatsAppInquiry({
        service,
        message: `I would like to enquire about ${service}. Please share the available options and details.`
      });
    });
  });

  packageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const packageName = button.dataset.package || 'Photography package';
      const message = buildPackageMessage(packageName);
      const number = getPhoneDigits(STUDIO_CONFIG.whatsappNumber || STUDIO_CONFIG.phoneLink || '919967590265');
      const url = `${whatsappLink}${number}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

function initialize() {
  updateStudioDetails();
  setHeaderState();
  setupNav();
  setupBackToTop();
  setupRevealObserver();
  setupPortfolioFilters();
  setupLightbox();
  setupTestimonials();
  setupFaq();
  setupWhatsAppButtons();

  if (elements.form) {
    elements.form.addEventListener('submit', handleFormSubmit);
  }

  if (elements.copyButton) {
    elements.copyButton.addEventListener('click', handleCopyMessage);
  }

  window.addEventListener('scroll', setHeaderState);
}

initialize();
