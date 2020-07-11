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
      modalImageAdd = document.querySelector('.modal__image-add'),

      modalImageItem = document.querySelector('.modal__image-item'),
      modalHeaderItem = document.querySelector('.modal__header-item'),
      modalStatusItem = document.querySelector('.modal__status-item'),
      modalDescriptionItem = document.querySelector('.modal__description-item'),
      modalCostItem = document.querySelector('.modal__cost-item');


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
      modalFileButton.textContent = `Maximum 200 kb`;
      modalFileInput.value = '';
      checkForm()
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
  modalAdd.classList.add('hide');
  saveDB(dataBase);

  modalSubmitForm.reset();
  
  checkForm();
  renderCard();
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
  const card = target.closest('.card')

  
  if (card) {
    const item = dataBase[card.dataset.id];

    const { image, costItem, descriptionItem, nameItem, status } = item;
    
    modalImageItem.src = `data:image/jpeg;base64,${image}`;
    modalHeaderItem.textContent = nameItem;
    modalDescriptionItem.textContent = descriptionItem;
    modalCostItem.textContent = `${costItem} ₽`;
    if (status === 'old') {
      modalStatusItem.textContent = 'Б/У';
    } else {
      modalStatusItem.textContent = 'Новое';
    }

    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModal)
  }
})

// modules
function renderCard() {
  catalog.textContent = ``;

  dataBase.forEach((item, i) => {
    const { image, category, costItem, descriptionItem, nameItem, status } = item;

    catalog.insertAdjacentHTML('beforeend', `
    <li class="card" data-id="${i}">
      <img class="card__image" src="data:image/jpeg;base64,${image}" alt="test">
      <div class="card__description">
        <h3 class="card__header">${nameItem}</h3>
        <div class="card__price">${costItem} ₽</div>
      </div>
    </li>
    `);
  })
}

export function checkForm() {
  const validForm = elementsModalSubmit.every(elem => elem.value)
  modalButtonSubmit.disabled = !validForm;
  modalButtonWarning.style.display = validForm ? 'none' : '';
}

function saveDB(data) {
  localStorage.setItem('avito', JSON.stringify(data))
}
// /modules

renderCard()

// function closeModalEscape(event) {
//   const { key } = event;
//   if (key === 'Escape') {
//     modalItem.classList.add('hide');
//     modalAdd.classList.add('hide');
//     document.removeEventListener('keydown', closeModalEscape)
//   }
// }
