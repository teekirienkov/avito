import {checkForm} from '../index';

const modalAdd = document.querySelector('.modal__add'),
      modalItem = document.querySelector('.modal__item'),
      modalFileButton = document.querySelector('.modal__file-btn'),
      modalImageAdd = document.querySelector('.modal__image-add'),
      modalSubmitForm = document.querySelector('.modal__submit');

const addPhotoText = modalFileButton.textContent,
      srcAddPhoto = modalImageAdd.src;

function closeModal(event) {
  const { target, key } = event;

  if (target.closest('.modal__close') || target === this) {
    this.classList.add('hide');
    if (this === modalAdd) {
      modalImageAdd.src = srcAddPhoto;
      modalFileButton.textContent = addPhotoText;

      modalSubmitForm.reset();
      checkForm()
    }
  }

  if (key === 'Escape') {
    modalItem.classList.add('hide');
    modalAdd.classList.add('hide');

    modalImageAdd.src = srcAddPhoto;
    modalFileButton.textContent = addPhotoText;

    document.removeEventListener('keydown', closeModal);
    modalSubmitForm.reset()
    checkForm()
  }
}

export default closeModal;