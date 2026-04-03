document.addEventListener('DOMContentLoaded', () => {
  // ============================================================================
  // GLOBAL INTERACTIONS
  // ============================================================================

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close') || document.querySelector('.mobile-menu__close');

  if (mobileMenuToggle && mobileMenu) {
    const toggleMobileMenu = () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileMenuToggle.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    };

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }

    // Close on link click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        toggleMobileMenu();
      }
    });
  }

  // Cart Drawer
  const cartToggle = document.querySelector('.cart-toggle');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartDrawerClose = document.querySelector('.cart-drawer-close') || document.querySelector('.cart-close');
  const cartDrawerBackdrop = document.querySelector('.cart-drawer-overlay') || document.querySelector('.cart-drawer__backdrop');

  if (cartToggle && cartDrawer) {
    const toggleCartDrawer = () => {
      const isOpen = cartDrawer.classList.toggle('is-open');
      if (cartDrawerBackdrop) {
        cartDrawerBackdrop.classList.toggle('is-open', isOpen);
      }
      document.body.classList.toggle('no-scroll', isOpen);
    };

    cartToggle.addEventListener('click', toggleCartDrawer);

    if (cartDrawerClose) {
      cartDrawerClose.addEventListener('click', toggleCartDrawer);
    }

    if (cartDrawerBackdrop) {
      cartDrawerBackdrop.addEventListener('click', toggleCartDrawer);
    }
  }

  // Search Overlay
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchOverlayClose = document.querySelector('.search-overlay-close') || document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-overlay-input') || document.querySelector('.search-input');

  if (searchToggle && searchOverlay) {
    const toggleSearchOverlay = () => {
      const isOpen = searchOverlay.classList.toggle('is-open');
      document.body.classList.toggle('no-scroll', isOpen);
      if (isOpen && searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    };

    searchToggle.addEventListener('click', toggleSearchOverlay);

    if (searchOverlayClose) {
      searchOverlayClose.addEventListener('click', toggleSearchOverlay);
    }
  }

  // Learn Dropdown (desktop nav)
  const dropdownItems = document.querySelectorAll('.nav-dropdown, .nav-item.has-dropdown');

  dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
        }
      });
      item.classList.toggle('is-open');
    });

    item.addEventListener('mouseleave', () => {
      item.classList.remove('is-open');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      dropdownItems.forEach((item) => {
        item.classList.remove('is-open');
      });
    }
  });

  // Announcement Bar Close
  const announcementClose = document.querySelector('.announcement__close');
  const announcement = document.querySelector('.announcement');

  if (announcementClose && announcement) {
    announcementClose.addEventListener('click', () => {
      announcement.style.display = 'none';
    });
  }

  // Escape Key - Close overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cartDrawer?.classList.contains('is-open')) {
        cartDrawer.classList.remove('is-open');
        if (cartDrawerBackdrop) cartDrawerBackdrop.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }
      if (searchOverlay?.classList.contains('is-open')) {
        searchOverlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }
      if (mobileMenu?.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }
    }
  });

  // ============================================================================
  // HOMEPAGE-SPECIFIC
  // ============================================================================

  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length > 0) {
    productCards.forEach((card) => {
      card.addEventListener('click', () => {
        window.location.href = 'shop.html';
      });
    });
  }

  // ============================================================================
  // SHOP/PDP-SPECIFIC
  // ============================================================================

  const variants = {
    blonde: {
      name: 'Blonde',
      flavor: 'Crisp & Crushable',
      price: '$15.00',
      color: '#0082CA',
      description:
        'Blonde is a multiple award-winning non-alcoholic craft beer. Light and citrusy with notes of grapefruit and a crisp, hop-forward finish. 86 Calories, 18g Carbs per 12oz.'
    },
    golden: {
      name: 'Golden',
      flavor: 'Light & Citrusy',
      price: '$15.00',
      color: '#FF8200',
      description:
        'Golden is a refreshing non-alcoholic craft beer with bright citrus notes and a smooth, easy-drinking finish. Perfect for any occasion.'
    },
    hazy: {
      name: 'Hazy IPA',
      flavor: 'Tropical & Juicy',
      price: '$15.00',
      color: '#249E6B',
      description:
        'Hazy IPA is a bold, tropical non-alcoholic craft beer bursting with juicy hop flavors and a smooth, hazy body.'
    },
    variety: {
      name: 'Variety Pack',
      flavor: 'Try Them All',
      price: '$28.00',
      color: '#FFBF3F',
      description:
        "Can't decide? Try all three of our award-winning non-alcoholic craft beers in one convenient 12-pack."
    }
  };

  // Variant Selector
  const variantBtns = document.querySelectorAll('.variant-btn');
  const pdpFlavor = document.querySelector('.flavor-descriptor');
  const pdpPrice = document.querySelector('.price');
  const pdpImage = document.querySelector('.main-image .img-placeholder');
  const pdpDescription = document.querySelector('#description p');

  if (variantBtns.length > 0) {
    variantBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const variantKey = btn.dataset.variant;
        const variant = variants[variantKey];

        if (!variant) return;

        // Update active state
        variantBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Update flavor text
        if (pdpFlavor) {
          pdpFlavor.textContent = variant.flavor;
        }

        // Update price
        if (pdpPrice) {
          pdpPrice.textContent = variant.price;
        }

        // Update product image color
        if (pdpImage) {
          pdpImage.style.backgroundColor = variant.color;
        }

        // Update description
        if (pdpDescription) {
          pdpDescription.textContent = variant.description;
        }
      });
    });
  }

  // Quantity Selector
  const quantityInput = document.querySelector('.qty-input');
  const quantityMinus = document.querySelector('.qty-minus');
  const quantityPlus = document.querySelector('.qty-plus');

  if (quantityInput && quantityMinus && quantityPlus) {
    quantityMinus.addEventListener('click', () => {
      let value = parseInt(quantityInput.value, 10) || 1;
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });

    quantityPlus.addEventListener('click', () => {
      let value = parseInt(quantityInput.value, 10) || 1;
      if (value < 12) {
        quantityInput.value = value + 1;
      }
    });
  }

  // Product Tabs
  const tabBtns = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-pane');

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;

        // Remove active from all buttons and panels
        tabBtns.forEach((b) => b.classList.remove('active'));
        tabPanels.forEach((panel) => panel.classList.remove('active'));

        // Add active to clicked button and matching panel
        btn.classList.add('active');
        const activePanel = document.getElementById(tabName);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  // Add to Cart
  const addToCartBtn = document.querySelector('.add-to-cart');
  const cartBadge = document.querySelector('.cart-toggle .cart-badge');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const originalText = addToCartBtn.textContent;
      const originalBgColor = addToCartBtn.style.backgroundColor;

      addToCartBtn.textContent = 'ADDED!';
      addToCartBtn.style.backgroundColor = '#2ecc71';

      // Update cart badge
      if (cartBadge) {
        const currentCount = parseInt(cartBadge.textContent, 10) || 0;
        const quantity = parseInt(document.querySelector('.qty-input')?.value, 10) || 1;
        cartBadge.textContent = currentCount + quantity;
      }

      setTimeout(() => {
        addToCartBtn.textContent = originalText;
        addToCartBtn.style.backgroundColor = originalBgColor;
      }, 1500);

      // Optionally open cart drawer
      if (cartDrawer) {
        cartDrawer.classList.add('is-open');
        if (cartDrawerBackdrop) {
          cartDrawerBackdrop.classList.add('is-open');
        }
        document.body.classList.add('no-scroll');
      }
    });
  }

  // ============================================================================
  // FAQ-SPECIFIC
  // ============================================================================

  // FAQ Category Navigation
  const faqNavButtons = document.querySelectorAll('.category-pill');
  const faqCategories = document.querySelectorAll('.faq-category');

  if (faqNavButtons.length > 0 && faqCategories.length > 0) {
    faqNavButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        // Update active button
        faqNavButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Show matching category, hide others
        faqCategories.forEach((cat) => {
          cat.style.display = cat.id === category ? 'block' : 'none';
        });
      });
    });
  }

  // ============================================================================
  // CONTACT-SPECIFIC
  // ============================================================================

  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous errors
      const formGroups = contactForm.querySelectorAll('.form-group');
      formGroups.forEach((group) => {
        const input = group.querySelector('input, textarea, select');
        const errorMsg = group.querySelector('.error-message');
        if (input) {
          input.style.borderColor = '';
        }
        if (errorMsg) {
          errorMsg.style.display = 'none';
        }
      });

      // Validate
      let isValid = true;
      const formData = {};

      formGroups.forEach((group) => {
        const input = group.querySelector('input, textarea, select');
        if (!input) return;

        const value = input.value.trim();
        const type = input.type;
        const name = input.name;
        let error = '';

        if (!value) {
          error = 'This field is required';
          isValid = false;
        } else if (type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = 'Please enter a valid email';
            isValid = false;
          }
        } else if (type === 'tel') {
          const phoneRegex = /^\d{10,}$/;
          if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            error = 'Please enter a valid phone number';
            isValid = false;
          }
        }

        if (error) {
          input.style.borderColor = '#d32f2f';
          const errorMsg = group.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.textContent = error;
            errorMsg.style.display = 'block';
          }
        }

        formData[name] = value;
      });

      if (isValid) {
        // Show success message (static demo)
        const successMsg = document.querySelector('.contact-form__success');
        if (successMsg) {
          successMsg.style.display = 'block';
          contactForm.style.display = 'none';
        } else {
          alert('Thank you for contacting us! We will get back to you soon.');
          contactForm.reset();
        }
      }
    });
  }
});
