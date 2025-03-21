const initialCards = [
  {
    name: "Snow in The Jungle.",
    link: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Field of Flowers.",
    link: "https://images.unsplash.com/photo-1529419412599-7bb870e11810?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fHwy",
  },
  {
    name: "Blast Off!",
    link: "https://images.unsplash.com/photo-1547382442-d17c21625a44?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "A River of Stars!",
    link: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkxfHxuYXR1cmV8ZW58MHx8MHx8fDI%3D",
  },
  {
    name: "Peanut?",
    link: "https://images.unsplash.com/photo-1511823794984-b87716139b88?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGFuaW1hbHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Tree of Life!",
    link: "https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxuYXR1cmV8ZW58MHx8MHx8fDI%3D",
  },
];

//Profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

//Form elements
const editProfileModal = document.querySelector("#edit-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name");
const jobInput = editProfileModal.querySelector("#profile-description");
const modalCloseEditButton = editProfileModal.querySelector(
  "#modal__close-button-edit"
);

const profileAddButton = document.querySelector(".profile__add-button");
const addImageModal = document.querySelector("#add-modal");
const addFormElement = addImageModal.querySelector(".modal__form");
const linkInput = addImageModal.querySelector("#image-link");
const captionInput = addImageModal.querySelector("#card-caption");
const modalCloseAddButton = addImageModal.querySelector(
  "#modal__close-button-add"
);
const modalSaveAddButton = addImageModal.querySelector(
  "#modal__save-button-add"
);

//modal
const previewModal = document.querySelector("#preview-modal");
const closePreviewModal = previewModal.querySelector(
  ".modal__close-button-preview"
);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

//Card elements
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: captionInput.value, link: linkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(addImageModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  if (modal === addImageModal) {
    addFormElement.reset();
  }
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");
  const cardLinkEl = cardElement.querySelector(".card__image");
  const cardLikedButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardLinkEl.src = data.link;
  cardLinkEl.alt = data.name;

  cardLikedButton.addEventListener("click", () => {
    cardLikedButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardLinkEl.addEventListener("click", () => {
    openModal(previewModal);

    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}

closePreviewModal.addEventListener("click", () => {
  closeModal(previewModal);
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openModal(editProfileModal);
});

modalCloseEditButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);

profileAddButton.addEventListener("click", () => {
  openModal(addImageModal);
});

modalCloseAddButton.addEventListener("click", () => {
  closeModal(addImageModal);
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
