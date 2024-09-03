document.addEventListener('DOMContentLoaded', async () => {
  const api = new API();
  let reviews;

  const storedReviews = sessionStorage.getItem('reviews');

  if (storedReviews) {
    reviews = JSON.parse(storedReviews);
  } else {
    const { reviews: fetchedReviews } = await api.getReviews();
    reviews = fetchedReviews;
    sessionStorage.setItem('reviews', JSON.stringify(reviews));
  }

  api.displayReviews(reviews);
});

document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.animate-element');
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Вызываем сразу при загрузке страницы

  function checkScroll() {
      animateElements.forEach(function(element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          
          if (rect.top + rect.height <= viewportHeight) {
              element.classList.add('show');
          }
      });

      // Если все элементы уже показаны, удаляем слушатель события
      if (Array.from(animateElements).every(el => el.classList.contains('show'))) {
          window.removeEventListener('scroll', checkScroll);
      }
  }
});