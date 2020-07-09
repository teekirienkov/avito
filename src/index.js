const modalAdd = document.querySelector('.modal__add'), // все модальные окна (этот класс выпадает за края модалки)
      addAdButton = document.querySelector('.add__ad'),
      modalButtonSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmitForm = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'), // объявления
      modalItem = document.querySelector('.modal__item'), // модальное окно объявления (тоже выпадает за модалку)
      modalButtonWarning = document.querySelector('.modal__btn-warning');

const dataBase = [];

const elementsModalSubmit = [...modalSubmitForm.elements] // получаем псевдомассив элементов и парсим его spread
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit'); // фильтруем кнопку из элементов

modalSubmitForm.addEventListener('input', () => {
  const validForm = elementsModalSubmit.every(elem => elem.value)
  modalButtonSubmit.disabled = !validForm;
  modalButtonWarning.style.display = validForm ? 'none' : '';
})

modalSubmitForm.addEventListener('submit', event => {
  event.preventDefault();

  const itemObj = {};

  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value
  }

  dataBase.push(itemObj);

  modalSubmitForm.addEventListener('submit', closeModal)
  modalSubmitForm.reset()
})

addAdButton.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalButtonSubmit.disabled = true;
  document.addEventListener('keydown', closeModal)
})

modalAdd.addEventListener('click', closeModal)
modalItem.addEventListener('click', closeModal)

catalog.addEventListener('click', event => {
  const { target } = event;

  if (target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModal)
  }
})

// modules
function closeModal(event) {
  const { target, key } = event;

  if (target.closest('.modal__close') || target === this) {
    this.classList.add('hide');
    if (this === modalAdd) {
      modalSubmitForm.reset()
    }
  }

  if (key === 'Escape') {
    modalItem.classList.add('hide');
    modalAdd.classList.add('hide');
    document.removeEventListener('keydown', closeModal);
    modalSubmitForm.reset()
  }
}

// function closeModalEscape(event) {
//   const { key } = event;
//   if (key === 'Escape') {
//     modalItem.classList.add('hide');
//     modalAdd.classList.add('hide');
//     document.removeEventListener('keydown', closeModalEscape)
//   }
// }
// /modules