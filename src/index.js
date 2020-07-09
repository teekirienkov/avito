const modalAdd = document.querySelector('.modal__add'),
      modalCloseButton = document.querySelector('.modal__close')
      addAdButton = document.querySelector('.add__ad');

addAdButton.addEventListener('click', () => {
  modalAdd.classList.remove('hide')
})

modalCloseButton.addEventListener('click', (event) => {

  const { target } = event;

  if (target.closest('.modal__close')) {
    modalAdd.classList.add('hide')
  }
})