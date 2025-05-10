import "./index.css";
import {
  enableValidation,
  config,
  resetValidation,
} from "../scripts/validation.js";
import autoprefixer from "autoprefixer";
import API from "../utils/Api.js";
import {setButtonText} from "../utils/helpers.js";

/*const initialCards = [
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
];*/

//Profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

//Form elements
const editProfileModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const nameInput = editProfileModal.querySelector("#profile-name");
const jobInput = editProfileModal.querySelector("#profile-description");
const modalCloseEditButton = editProfileModal.querySelector(
  "#modal__close-button-edit"
);

const profileAddButton = document.querySelector(".profile__add-button");
const addImageModal = document.querySelector("#add-modal");
const addFormElement = document.forms["add-card"];
const linkInput = addImageModal.querySelector("#image-link");
const captionInput = addImageModal.querySelector("#card-caption");
const modalCloseAddButton = addImageModal.querySelector(
  "#modal__close-button-add"
);

const deleteCardModal = document.querySelector("#delete-modal");
const deleteForm = deleteCardModal.querySelector(".modal__delete-form");
const closeDeleleModal = deleteCardModal.querySelector("#modal__close-button-delete");
const cancelButton = deleteCardModal.querySelector(".modal__cancel-button");

const modals = document.querySelectorAll(".page .modal");
const previewModal = document.querySelector("#preview-modal");
const closePreviewModal = previewModal.querySelector(
  ".modal__close-button-preview"
);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const avatarEditButton = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-modal");
const avatarFormElement = document.forms["add-avatar"];
const avatarLink = avatarModal.querySelector("#image-link");
const closeAvatarModal = avatarModal.querySelector("#modal__close-button-avatar");



//Card elements
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

//API code
const api = new API({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "27a9340c-3c21-464f-86c2-e39184d5627d",
    "Content-Type": "application/json"
  }
});

// can add multiple variables, use a comma to separate.
  api.getAppInfo()
  .then(([cards, user,]) =>  {
    cards.forEach((item) => {
    renderCard(item);
  });

    profileNameElement.textContent = user.name;
    profileJobElement.textContent = user.about;
    profileImage.src = user.avatar;

})
.catch((err) => {
  console.error(err);
});

//function section
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api.editUserInfo({ name: nameInput.value, about: jobInput.value })
  .then((data) => {
    profileNameElement.textContent = data.name;
    profileJobElement.textContent = data.about;
    closeModal(editProfileModal);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    setButtonText(submitButton, false);
  });
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

 const submitButton = evt.submitter;
  setButtonText(submitButton, true);
  api.addNewCard({ name: captionInput.value, link: linkInput.value })
  .then((data) => {
    const cardElement = getCardElement(data);
    cardsList.prepend(cardElement);
    evt.target.reset();
    closeModal(addImageModal);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    setButtonText(submitButton, false);
  });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

 const submitButton = evt.submitter;
  setButtonText(submitButton, true);
    api.editAvatarImage(avatarLink.value)
  .then((data) => {
    profileImage.src = data.avatar;
    evt.target.reset();
    closeModal(avatarModal);
  })
  .catch((err) => {
    console.error(err);
  }).finally(() => {
    setButtonText(submitButton, false);
  });
}


function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Delete", "Deleting...");
  api.deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteCardModal);
  })
  .catch((err) => {
    console.error(err);
  }).finally(() => {
    setButtonText(submitButton, true, "Delete", "Deleting...");
  });
}


function handleLikeButton(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api.handleCardLike(id, isLiked)
   .then(() => {
    evt.target.classList.toggle("card__like-button_liked");
  })
  .catch((err) => {
    console.error(err);
  });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteCardModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");
  const cardLinkEl = cardElement.querySelector(".card__image");
  const cardLikedButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  if (data.isLiked) {
    cardLikedButton.classList.add("card__like-button_liked");
  }

  cardNameEl.textContent = data.name;
  cardLinkEl.src = data.link;
  cardLinkEl.alt = data.name;

  cardLikedButton.addEventListener("click", (evt) => handleLikeButton(evt, data._id));

  cardDeleteButton.addEventListener("click", () => handleDeleteCard(cardElement, data._id)
);

  cardLinkEl.addEventListener("click", () => {
    openModal(previewModal);

    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}

function renderCard(item, method = "append") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

//listeners
avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
});
closeAvatarModal.addEventListener("click", () => {
  closeModal(avatarModal);
});

closePreviewModal.addEventListener("click", () => {
  closeModal(previewModal);
});

closeDeleleModal.addEventListener("click", () => {
  closeModal(deleteCardModal);
});
cancelButton.addEventListener("click", () => {
  closeModal(deleteCardModal);
});


profileEditButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(editFormElement, [nameInput, jobInput], config);
  openModal(editProfileModal);
});

modalCloseEditButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

profileAddButton.addEventListener("click", () => {
  openModal(addImageModal);
});
modalCloseAddButton.addEventListener("click", () => {
  closeModal(addImageModal);
});

modals.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    if (evt.target === modalElement) {
      closeModal(modalElement);
    }
  });
});


enableValidation(config);
