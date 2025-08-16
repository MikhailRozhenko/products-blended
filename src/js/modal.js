import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  refs.modalClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeEscape);
  refs.modal.addEventListener('click', closeBackdrop);
}

function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  refs.modalClose.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', closeEscape);
  refs.modal.removeEventListener('click', closeBackdrop);
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
