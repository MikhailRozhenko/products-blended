import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');

  refs.modalClose.addEventListener('click', closeModal);
  refs.modalBackdrop.addEventListener('click', closeBackdrop);

  document.addEventListener('keydown', closeEscape);
}

function closeModal() {
  refs.modal.classList.remove('modal--is-open');

  refs.modalClose.removeEventListener('click', closeModal);
  refs.modalBackdrop.removeEventListener('click', closeBackdrop);

  document.removeEventListener('keydown', closeEscape);
}

export function closeBackdrop(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

export function closeEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
