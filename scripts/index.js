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

const profitleEditButton = document.querySelector(".profile__edit-button");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-modal");
const editFormElement = editProfileModal.querySelector("#edit-profile");
const nameInput = editProfileModal.querySelector("#profile-name");
const jobInput = editProfileModal.querySelector("#profile-description");
const modalCloseButton = editProfileModal.querySelector(".modal__close-button");
const modalSaveButton = editProfileModal.querySelector(".modal__save-button");

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

function openModal() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  editProfileModal.classList.add("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal();
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");
  const cardLinkEl = cardElement.querySelector(".card__image");

  cardNameEl.textContent = data.name;
  cardLinkEl.src = data.link;
  cardLinkEl.alt = data.name;

  return cardElement;
}

profitleEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
editFormElement.addEventListener("submit", handleEditFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
