import './css/styles.css';

// ============ Importing functions ==============//
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

// ============ Importing libraries ==============//
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ============ Favicon setup ====================//
document.querySelector("link[rel='icon']").href = new URL('./img/webp/favicon.png', import.meta.url).href;

// ============ Global variables ================//
const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const counterDisplay = document.querySelector('.images-counter');

let query = '';
let page = 1;
let totalHits = 0; // To store the total count from the response

// ============ Submit event listener ============//
form.addEventListener('submit', async event => {
  event.preventDefault();

 // Get the input value via name="query"
  query = event.currentTarget.elements.query.value.trim();
  page = 1; // Reset the page to its initial state for a new collection

  if (query === '') {
    iziToast.warning({
      message: 'Please enter search query',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  counterDisplay.classList.add('is-hidden'); // Hide on new search
  hideLoadMoreButton();
  showLoader();

  try {
    // Using async/await for an HTTP request
    const data = await getImagesByQuery(query, page);

    // Update global variables with the received data
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. <br> Please try again!',
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 0.8)',
        messageColor: '#FFF',
        iconColor: '#FFFFFF',
        theme: 'dark',
      });
      return;
    }

    createGallery(data.hits); // call the render function (loads images), adds to the gallery
    updateCounter(); // Update the image count
    checkPaginationStatus(); // Check pagination status (managing the "Load More" button)
  } catch (error) {
    iziToast.error({ message: 'Something went wrong!', position: 'topRight' });
  } finally {
    // Hide the loader but do not reset the form, so that the query text remains in the input; this allows the user to simply refine their query instead of re-entering everything from scratch (we do not call form.reset();)
    hideLoader();
  }
});

// ============ 'Load More' Event Listener ============//
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    page += 1;

    showLoader();
    hideLoadMoreButton();

    try {
      const data = await getImagesByQuery(query, page);

      createGallery(data.hits); // Add new images to existing ones (render)
      updateCounter();
      smoothScroll();
      checkPaginationStatus();
    } catch (error) {
      iziToast.error({
        message: 'Error loading more images!',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });
}

// ============ Additional functions ============//

/**
* Checking pagination status and managing the "Load More" button
*/
function checkPaginationStatus() {
  const totalPages = Math.ceil(totalHits / PER_PAGE);

  if (page >= totalPages) {
    hideLoadMoreButton();
    // If the user has reached the end of the collection, display a message
    if (totalHits > 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } else {
    // If images appear in the gallery and there are more pages, the button appears
    showLoadMoreButton();
  }
}

/**
* SMOOTH SCROLLING FUNCTION
*/
function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-card');

  if (galleryItem) {
    // Get the height of a single gallery card using getBoundingClientRect
    const { height: cardHeight } = galleryItem.getBoundingClientRect();

    // Використовуємо window.scrollBy для прокрутки на дві висоти карточки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

/**
* function to update the counter
*/
function updateCounter() {
   // Calculate the number of loaded photos (current page * number per page)
   // Note: if it is the last page, show totalHits instead of page * 15
  const loadedImages = Math.min(page * PER_PAGE, totalHits);

  if (totalHits > 0) {
    counterDisplay.textContent = `${loadedImages} of ${totalHits}`;
    counterDisplay.classList.remove('is-hidden');
  } else {
    counterDisplay.classList.add('is-hidden');
  }
}

// =========== "Back to Top" button logic ==============//
const backToTopBtn = document.querySelector('#backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToTopBtn.classList.remove('is-hidden');
  } else {
    backToTopBtn.classList.add('is-hidden');
  }
});

// ========= Smooth scroll to the very top on click ===========//
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

//
/**
|=======================================
|  DESCRIPTION
|=======================================
// */
//
// Let's create an application that searches for images by keyword and displays them in a gallery. We will style the UI elements according to the design mockup.
// https://www.figma.com/design/DnWoSXuqp1WSnUsTl4236O/HW-7-12-JavaScript--Copy-?node-id=21-7&t=o5knpNAClWrPwUbO-0
//
// The user will enter a search string into a text field; upon form submission, an HTTP request containing this search string must be executed.
// When the form submission button is clicked, add a check to ensure the text field is not empty, preventing the user from submitting the request if the search field is blank.
//
// smoothScroll() — extracted into a separate function
// checkPaginationStatus() — a separate function to check the page limit.
// Pagination logic — uses your variables: query, page, totalHits, perPage
