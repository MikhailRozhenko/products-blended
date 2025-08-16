import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  fetchCategories,
  fetchProducts,
  fetchOneProduct,
} from './products-api';
import {
  renderCategories,
  renderProducts,
  renderCardProduct,
} from './render-function';
import { activeFirstBtn, iziToastErrorMessage } from './helpers';
import { PER_PAGE } from './constants';
import { refs } from './refs';

import { openModal } from './modal';

let currentPage = 1;
let totalProducts = 0;

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeFirstBtn();
  } catch (error) {
    console.log(error);
    iziToast.error({ message: 'Try again later!' });
  }
}

export async function getAllProducts() {
  try {
    const data = await fetchProducts(currentPage);
    totalProducts = data.total;
    console.log(data.total);
    renderProducts(data.products);

    if (totalProducts > PER_PAGE) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.addEventListener('click', loadMoreProducts);
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', loadMoreProducts);
    }
    totalProducts -= 12;
  } catch (error) {
    console.log(error);
    iziToastErrorMessage(error);
  }
}

export async function loadMoreProducts() {
  currentPage += 1;

  // if (pageState.categoryName === 'All' || pageState.categoryName === '') {
  //   fetchProducts();
  // }
}

export async function getCardProduct(event) {
  try {
    if (!event.target.closest('.products__item')) {
      return; // користувач клікнув між кнопками
    }

    const productID = event.target.closest('.products__item').dataset.id;
    const data = await fetchOneProduct(`${productID}`);
    renderCardProduct(data);
    openModal();
  } catch (error) {
    iziToastErrorMessage(error);
  }
}
