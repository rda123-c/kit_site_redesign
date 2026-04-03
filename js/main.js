document.addEventListener('DOMContentLoaded', () => {
  // ============================================================================
  // GLOBAL INTERACTIONS
  // ============================================================================

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.menu-toggle') || document.querySelector('.mobile-menu-toggle');
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

  // Learn Dropdown (desktop nav) — CSS :hover handles show/hide,
  // JS only needed for mobile tap toggle
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.nav-dropdown');
      if (parent) parent.classList.toggle('is-open');
    });
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
  // FIND KIT — IFRAME EXPAND ON CLICK
  // ============================================================================

  const finderContainer = document.getElementById('finderContainer');
  const finderOverlay = document.getElementById('finderOverlay');
  const finderIframe = document.getElementById('finderIframe');

  if (finderContainer && finderOverlay && finderIframe) {
    finderOverlay.addEventListener('click', () => {
      // Expand the container
      finderContainer.style.maxHeight = '1100px';
      finderContainer.style.cursor = 'default';
      // Allow iframe interaction
      finderIframe.style.pointerEvents = 'auto';
      // Remove the overlay
      finderOverlay.remove();
    });
  }

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
      image: 'images/products/blonde-pour-1.jpg',
      gallery: ['images/products/blonde-pour-1.jpg', 'images/products/blonde-cheers.jpg', 'images/products/blonde-can-1.jpg', 'images/products/blonde-cooler-1.jpg'],
      description:
        'Award-winning non-alcoholic craft beer. Light and citrusy with notes of grapefruit and a crisp, hop-forward finish.'
    },
    golden: {
      name: 'Golden',
      flavor: 'Light & Citrusy',
      price: '$15.00',
      color: '#FF8200',
      image: 'images/products/golden-can-1.jpg',
      gallery: ['images/products/golden-can-1.jpg', 'images/products/golden-pour-1.jpg', 'images/products/golden-can-2.jpg', 'images/products/golden-cooler-1.jpg'],
      description:
        'A refreshing non-alcoholic craft beer with bright citrus notes and a smooth, easy-drinking finish for any occasion.'
    },
    hazy: {
      name: 'Hazy IPA',
      flavor: 'Tropical & Juicy',
      price: '$15.00',
      color: '#249E6B',
      image: 'images/products/hazy-can-1.jpg',
      gallery: ['images/products/hazy-can-1.jpg', 'images/products/hazy-pour-may25.jpg', 'images/products/hazy-can-2.jpg', 'images/products/hazy-cooler-1.jpg'],
      description:
        'Our Hazy IPA is a bold, tropical non-alcoholic craft beer bursting with juicy hop flavors and a smooth, hazy body.'
    },
    variety: {
      name: 'Variety Pack',
      flavor: 'Try Them All',
      price: '$28.00',
      color: '#FFBF3F',
      image: 'images/products/variety-pack-1.jpg',
      gallery: ['images/products/variety-pack-1.jpg', 'images/products/variety-cans-sky-1.jpg', 'images/products/variety-pack-1.jpg', 'images/products/variety-pack-1.jpg'],
      description:
        "Can\u2019t decide? Try all three of our award-winning non-alcoholic craft beers in one convenient 12-pack."
    }
  };

  // Variant Selector
  const variantBtns = document.querySelectorAll('.variant-btn');
  const pdpFlavor = document.querySelector('.flavor-descriptor');
  const pdpPrice = document.querySelector('.price');
  const pdpImage = document.querySelector('.main-image img, .main-image .img-placeholder, .main-product-image');
  const pdpDescription = document.querySelector('.style-description');

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

        // Update style description
        if (pdpDescription && variant.description) {
          pdpDescription.textContent = variant.description;
        }

        // Update product image
        if (pdpImage) {
          if (pdpImage.tagName === 'IMG') {
            pdpImage.src = variant.image;
            pdpImage.alt = 'KIT ' + variant.name;
          } else {
            pdpImage.style.backgroundColor = variant.color;
          }
        }

        // Update gallery thumbnails
        const thumbs = document.querySelectorAll('.thumbnail img, .gallery-thumb img');
        if (thumbs.length > 0 && variant.gallery) {
          thumbs.forEach((thumb, i) => {
            if (variant.gallery[i]) {
              thumb.src = variant.gallery[i];
            }
          });
        }

        // Update description
        if (pdpDescription) {
          pdpDescription.textContent = variant.description;
        }
      });
    });

    // Auto-select variant from URL parameter (e.g., shop.html?variant=golden)
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = urlParams.get('variant');
    if (urlVariant && variants[urlVariant]) {
      const targetBtn = document.querySelector(`.variant-btn[data-variant="${urlVariant}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }
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
