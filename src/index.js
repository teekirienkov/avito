const modalAdd = document.querySelector('.modal__add'), // все модальные окна (этот класс выпадает за края модалки)
      addAdButton = document.querySelector('.add__ad'),
      modalButtonSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmitForm = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'), // объявления
      modalItem = document.querySelector('.modal__item'); // модальное окно объявления (тоже выпадает за модалку)


addAdButton.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalButtonSubmit.disabled = true;
  document.addEventListener('keydown', closeModalEscape)
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

catalog.addEventListener('click', event => {
  const { target } = event;

  if (target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModalEscape)
  }
})

// modules
function closeModal(event) {
  const { target } = event;

  if (target.closest('.modal__close') || target === this) {
    this.classList.add('hide');
    if (this === modalAdd) {
      modalSubmitForm.reset()
    }
  }
}

function closeModalEscape(event) {
  const { key } = event;
  if (key === 'Escape') {
    modalItem.classList.add('hide');
    modalAdd.classList.add('hide');
    document.removeEventListener('keydown', closeModalEscape)
  }
}
// /modules