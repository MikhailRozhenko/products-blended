import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
  iziToastOption.message = error.message;
  iziToast.show(iziToastOption);
}

