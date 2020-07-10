import {checkForm} from '../index';

const modalAdd = document.querySelector('.modal__add'),
      modalItem = document.querySelector('.modal__item'),
      modalSubmitForm = document.querySelector('.modal__submit');

function closeModal(event) {
  const { target, key } = event;

  if (target.closest('.modal__close') || target === this) {
    this.classList.add('hide');
    if (this === modalAdd) {
      modalSubmitForm.reset()
      checkForm()
    }
  }

  if (key === 'Escape') {
    modalItem.classList.add('hide');
    modalAdd.classList.add('hide');
    document.removeEventListener('keydown', closeModal);
    modalSubmitForm.reset()
    checkForm()
  }
}

export default closeModal;