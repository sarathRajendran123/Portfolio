document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Helper function to toggle class
  const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
  };

  // Sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // Sidebar toggle functionality for mobile
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  } else {
    console.log("Sidebar or Sidebar Button not found");
  }

  // Testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // Modal variables
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // Modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  // Add click event to all modal items
  if (testimonialsItem.length) {
    testimonialsItem.forEach(item => {
      item.addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

        testimonialsModalFunc();
      });
    });
  } else {
    console.log("Testimonials items not found");
  }

  // Add click event to modal close button
  if (modalCloseBtn && overlay) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
    overlay.addEventListener("click", testimonialsModalFunc);
  } else {
    console.log("Modal close button or overlay not found");
  }

  // Custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
    });

    // Add event in all select items
    selectItems.forEach(item => {
      item.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    });
  } else {
    console.log("Select element not found");
  }

  // Filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    filterItems.forEach(item => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  if (filterBtn.length) {
    filterBtn.forEach(btn => {
      btn.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  } else {
    console.log("Filter buttons not found");
  }

  // Contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // Add event to all form input fields
  if (formInputs.length && form) {
    formInputs.forEach(input => {
      input.addEventListener("input", function () {
        // Check form validation
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });
  } else {
    console.log("Form or form inputs not found");
  }

  // Page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Add event to all nav links
  if (navigationLinks.length && pages.length) {
    navigationLinks.forEach(link => {
      link.addEventListener("click", function () {
        const targetPage = this.innerHTML.toLowerCase().trim();
        let pageFound = false;

        pages.forEach(page => {
          if (targetPage === page.dataset.page) {
            page.classList.add("active");
            link.classList.add("active");
            console.log(pages)
            window.scrollTo(0, 0);
            pageFound = true;
          } else {
            page.classList.remove("active");
            link.classList.remove("active");
          }
        });

        if (!pageFound) {
          console.log(`Page with data-page="${targetPage}" not found`);
        }
      });
    });
  } else {
    console.log("Navigation links or pages not found");
  }
});
