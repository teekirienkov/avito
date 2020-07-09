const modalAdd = document.querySelector('.modal__add'), // все модальные окна (этот класс выпадает на body)
      addAdButton = document.querySelector('.add__ad'),
      modalButtonSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmitForm = document.querySelector('.modal__submit');


addAdButton.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalButtonSubmit.disabled = true
});

modalAdd.addEventListener('click', event => {
  const { target } = event;

  if (target.closest('.modal__close') || target === modalAdd) {
    modalAdd.classList.add('hide');
    modalSubmitForm.reset();
  }
})