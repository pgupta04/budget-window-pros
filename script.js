// Add banner click handler at the beginning
document.querySelector('.price-banner').addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('active');
});

// Form handling
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
  <div class="modal-content">
    <button class="close-modal">&times;</button>
    <h2>Get Your Free Quote</h2>
    <form id="quoteForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name">
      </div>
      <div class="form-group">
        <label for="phone">Phone Number *</label>
        <input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567">
      </div>
      <div class="form-group">
        <label for="address">Address *</label>
        <input type="text" id="address" name="address" required placeholder="Your address">
      </div>
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required placeholder="your@email.com">
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell us about your window replacement needs"></textarea>
      </div>
      <button type="submit" class="submit-button">Submit Quote Request</button>
    </form>
  </div>
`;

document.body.appendChild(modal);

// Show modal when clicking quote buttons
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });
});

// Close modal when clicking close button or outside
modal.querySelector('.close-modal').addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Form submission
const form = document.getElementById('quoteForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  try {
    const response = await fetch('https://n8n.oskaptech.ai/webhook/budget-window-pros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      form.innerHTML = '<div class="success-message">Thank you! We\'ll contact you soon about your quote request.</div>';
      setTimeout(() => {
        modal.classList.remove('active');
        form.reset();
        // Restore form after a delay
        setTimeout(() => {
          form.innerHTML = form.originalHTML;
        }, 500);
      }, 3000);
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('Error:', error);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = 'There was an error submitting your request. Please try again.';
    form.appendChild(errorDiv);
  }
});

// Store original form HTML for reset
form.originalHTML = form.innerHTML;

// Rest of the existing script.js code...