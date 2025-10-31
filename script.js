// Automatically set aria-current based on URL

const links = document.querySelectorAll('nav a');
links.forEach(link => {
    if (link.href === window.location.href) {
      link.setAttribute('aria-current', 'page');
    }
});


// Logo acts as "Back to Top" link
document.querySelectorAll('a[href="#top"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


// Counter Div inside the impact box that automatically increases the number

document.addEventListener('DOMContentLoaded', function() {
  const impactBox = document.getElementById('counter-div');
  let animationStarted = false; 
  const options = { threshold: 0.5 }; 

  function startCounterAnimation() {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      let start = 0;
                
      const hasPlus = counter.textContent.includes('+'); 

      const updateCounter = () => {
        const increment = target / (duration / 10);
                      
        if (start < target) {
          start = Math.min(start + increment, target);
          counter.textContent = Math.floor(start);         
          setTimeout(updateCounter, 10); 
        } else {
          counter.textContent = target + (hasPlus ? '+' : ''); 
        }
      };
                
    counter.textContent = '0';
    updateCounter();
    });
  }

  const observer = new IntersectionObserver(function(entries, observer) {
    if (entries[0].isIntersecting && !animationStarted) {
      startCounterAnimation();
      animationStarted = true;
      observer.unobserve(entries[0].target);
    }
  }, options);

  if (impactBox) {
    observer.observe(impactBox);
  }
});


// Create Animated Underline

const items = document.querySelectorAll('.underline');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('active', entry.isIntersecting);
  });
}, { threshold: 0.1 });

items.forEach(el => observer.observe(el));


// Articles tab filtering

const tabButtons = document.querySelectorAll('#articleCategoryTab button');
const allCards = document.querySelectorAll('.article-card');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-bs-target');

    allCards.forEach(card => {
      const categories = card.dataset.category;

      // Handle both space-separated or JSON array formats
      const categoryList = categories.startsWith('[')
        ? JSON.parse(categories)
        : categories.split(' ');

      const match = category === 'all' || categoryList.includes(category);
      card.style.display = match ? 'block' : 'none';
    });
  });
});




// Get current year for copyright text

document.getElementById('currentYear').textContent = new Date().getFullYear();


// Gallery 

const galleryPhotos = [
  {
    src: "assets/photos/about-us-section-photo-001.jpg",
    title: "Kayaw Youth",
  },
  {
    src: "assets/photos/hero-section-photo-001.jpg",
    title: "Kayaw Youth Dancing",
    },
];

const galleryGrid = document.getElementById("galleryGrid");

galleryPhotos.forEach((item) => {
  const col = document.createElement("div");
  col.className = "col-12 col-lg-4 col-md-6";
  col.innerHTML = `
    <div class="gallery-item" data-bs-toggle="modal" data-bs-target="#galleryModal">
      <img src="${item.src}" data-bs-image-url="${item.src}" alt="${item.title}" class="img-fluid" />
      <div class="gallery-caption">
        <h5>${item.title}</h5>
      </div>
    </div>
  `;
  galleryGrid.appendChild(col);
});

// Modal Logic
const galleryModal = document.getElementById("galleryModal");
galleryModal.addEventListener("show.bs.modal", (event) => {
  const clickedItem = event.relatedTarget.querySelector("img");
  const imageUrl = clickedItem.getAttribute("data-bs-image-url");
  document.getElementById("modalImage").src = imageUrl;
});