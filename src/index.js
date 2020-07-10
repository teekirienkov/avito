import closeModal from './components/closeModal';

const modalAdd = document.querySelector('.modal__add'), // все модальные окна (этот класс выпадает за края модалки)
      addAdButton = document.querySelector('.add__ad'),
      modalButtonSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmitForm = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'), // объявления
      modalItem = document.querySelector('.modal__item'), // модальное окно объявления (тоже выпадает за модалку)
      modalButtonWarning = document.querySelector('.modal__btn-warning'),
      modalFileInput = document.querySelector('.modal__file-input'),
      modalFileButton = document.querySelector('.modal__file-btn'),
      modalImageAdd = document.querySelector('.modal__image-add');

const elementsModalSubmit = [...modalSubmitForm.elements] // получаем псевдомассив элементов и парсим его spread
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit'); // фильтруем кнопку из элементов
    
const dataBase = JSON.parse(localStorage.getItem('avito')) || [];

const infoPhoto = {};

modalFileInput.addEventListener('change', event => {
  const { target } = event;
  const file = target.files[0];
  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  const reader = new FileReader();
    
  reader.readAsBinaryString(file);

  reader.addEventListener('load', event => {
    if (infoPhoto.size < 200000) {
      modalFileButton.textContent = infoPhoto.filename // меняем название кнопки добавить фото на filename
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`
    } else {
      modalFileButton.textContent = `Maximum 200 kb`
    }
  })
  
})

// валидация инпутов
modalSubmitForm.addEventListener('input', checkForm)

modalSubmitForm.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};

  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value
  }

  itemObj.image = infoPhoto.base64;

  // пуш в импровизированную БД
  dataBase.push(itemObj);
  saveDB(dataBase);

  modalSubmitForm.reset();
  modalAdd.classList.add('hide')
  checkForm()
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
export function checkForm() {
  const validForm = elementsModalSubmit.every(elem => elem.value)
  modalButtonSubmit.disabled = !validForm;
  modalButtonWarning.style.display = validForm ? 'none' : '';
}

function saveDB(data) {
  localStorage.setItem('avito', JSON.stringify(data))
}
// /modules


// function closeModalEscape(event) {
//   const { key } = event;
//   if (key === 'Escape') {
//     modalItem.classList.add('hide');
//     modalAdd.classList.add('hide');
//     document.removeEventListener('keydown', closeModalEscape)
//   }
// }
