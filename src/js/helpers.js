import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';
import { loadMoreProducts } from './handlers';

export const iziToastOption = {
  timeout: 5000,
  theme: 'dark',
  messageColor: 'white',
  iconColor: '#FFFFFF',
  closeOnClick: true,
  backgroundColor: '#ef4040',
  position: 'topCenter',
};

export function activeFirstBtn() {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
  }
}

export function changeActiveButton(event) {
  const onClickButton = document.querySelectorAll('.categories__btn');
  onClickButton.forEach(element => {
    if (element.classList.contains('categories__btn--active')) {
      element.classList.remove('categories__btn--active');
    }
    event.target.classList.add('categories__btn--active');
  });
}

export function iziToastErrorMessage(error) {
  console.log(error);
  iziToastOption.message = error.message;
  iziToast.show(iziToastOption);
}

export function clearGallery() {
  refs.productList.innerHTML = '';
}

export function loadMoreVisibleStatus(current, total) {
  if (current < total) {
    showLoadMore();
    // Удаление обработчика перед повторным добавлением (защита от возможного дублирования)
    refs.loadMoreBtn.removeEventListener('click', loadMoreProducts);
    refs.loadMoreBtn.addEventListener('click', loadMoreProducts);
  } else {
    hideLoadMore();
    refs.loadMoreBtn.removeEventListener('click', loadMoreProducts);
    throw new Error('No more products to load');
  }
}

export function showLoadMore() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

export function showNotFoundProducts() {
  refs.notFoundDiv.classList.add('not-found--visible');
}

export function hideNotFoundProducts() {
  refs.notFoundDiv.classList.remove('not-found--visible');
}
