import iziToast from 'izitoast';
import { fetchCategories } from './products-api';
import { renderCategories } from './render-function';
import { activeFirstBtn } from './helpers';

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
