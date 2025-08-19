import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchCategories, fetchProducts, fetchProductsByCategory } from './products-api';
import { renderCategories, renderProducts, clearGallery} from './render-function';
import { activeFirstBtn, iziToastErrorMessage} from './helpers';
import { PER_PAGE } from './constants';
import {
  fetchCategories,
  fetchProducts,
  fetchOneProduct,
  fetchQueryProduct,
} from './products-api';

import {
  renderCategories,
  renderProducts,
  renderCardProduct,
} from './render-function';

import {
  activeFirstBtn,
  iziToastErrorMessage,
  loadMoreVisibleStatus,
  clearGallery,
  hideNotFoundProducts,
  showNotFoundProducts,
  hideLoadMore,
} from './helpers';

import { PAGE_SIZE } from './constants';
import { refs } from './refs';

import { openModal } from './modal';

let currentPage = 1;
let totalProducts = 0;
let currentCategory = 'All';
let categoriesArray = [];
let query;
let totalPages = 0;
let previousQuery;
let inputContext = refs.formSearch.querySelector('.search-form__input');

export async function getCategories() {
  try {
    const data = await fetchCategories();
    renderCategories(['All', ...data]);
    activeFirstBtn();
  } catch (error) {
    iziToastErrorMessage({ message: 'Try again later!' });
  }
}

export async function getAllProducts() {
  try {
    clearGallery();
    const data = await fetchProducts(currentPage);
    renderProducts(data.products);

    refs.productList.addEventListener('click', event => {
      getCardProduct(event);
    });

    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function loadMoreProducts() {
  currentPage += 1;

  // if (pageState.categoryName === 'All' || pageState.categoryName === '') {
  //   fetchProducts();
  // }
} 



export async function onCategoryClick(e) {

  if (!e.target.classList.contains('categories__btn')) return;

  const selectedCategory = e.target.textContent;

  if (selectedCategory === currentCategory) return; 
  currentCategory = selectedCategory;
  currentPage = 1;

clearGallery();

  let data;
  if (selectedCategory === 'All') {
    data = await fetchProducts(currentPage);
  } else {
    data = await fetchProductsByCategory(selectedCategory);
  }

  if (data.products.length === 0) {
    refs.notFound.classList.add('not-found--visible');
  } else {
    refs.notFound.classList.remove('not-found--visible');
  }

  renderCategories(categoriesArray, currentCategory);
  renderProducts(data.products);
}


refs.categoriesList.addEventListener('click', onCategoryClick);
async function init() {
  categoriesArray = await fetchCategories();
  categoriesArray.unshift('All');

  renderCategories(categoriesArray, currentCategory);

  const data = await fetchProducts(currentPage);
  renderProducts(data.products);
}

init();


  let data;
  try {
    if (query) {
      data = await fetchQueryProduct(query, currentPage);
    } else {
      data = await fetchProducts(currentPage);
    }
    renderProducts(data.products);
    const totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / PAGE_SIZE);
    loadMoreVisibleStatus(currentPage, totalPages);
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export async function getCardProduct(event) {
  try {
    if (!event.target.closest('.products__item')) {
      return;
    }

    const productID = event.target.closest('.products__item').dataset.id;
    const data = await fetchOneProduct(`${productID}`);

    renderCardProduct(data);
    openModal();
  } catch (error) {
    iziToastErrorMessage(error);
  }
}

export function getQueryProduct() {
  refs.formSearch.addEventListener('submit', async event => {
    event.preventDefault();

    // window.location.href = './index.html';
    query = event.target.searchValue.value.trim();
    try {
      if (!query) {
        refs.formSearch.reset();
        throw new Error('Sorry, this name images is empty. Please try again!');
      }

      if (query !== previousQuery) {
        currentPage = 1;
        previousQuery = query;
      }

      clearGallery();
      const data = await fetchQueryProduct(query, currentPage);
      const totalProducts = data.total;
      totalPages = Math.ceil(totalProducts / PAGE_SIZE);

      if (totalProducts === 0) {
        showNotFoundProducts();
      } else {
        renderProducts(data.products);
        loadMoreVisibleStatus(currentPage, totalPages);
      }
    } catch (error) {
      iziToastErrorMessage(error);
    }
  });
}

export function onClearBtn() {
  refs.clearBtn.addEventListener('click', event => {
    event.preventDefault();
    inputContext.value = '';
    query = '';
    getAllProducts();
  });
}
