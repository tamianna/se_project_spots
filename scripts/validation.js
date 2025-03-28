const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEl.textContent = errorMessage;
  inputEl.classList.add(config.errorClass);
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEl.textContent = "";
  inputEl.classList.remove(config.errorClass);
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidatity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvaildInput = (inputFields) => {
  return inputFields.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const toggleButtonState = (inputFields, saveButton, config) => {
  if (hasInvaildInput(inputFields)) {
    disableButton(saveButton, config);
  } else {
    saveButton.disabled = false;
    saveButton.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (saveButton, config) => {
  saveButton.disable = true;
  saveButton.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formEl, inputFields, config) => {
  inputFields.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputFields = Array.from(formEl.querySelectorAll(config.inputSelector));
  const saveButton = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputFields, saveButton, config);

  formEl.addEventListener("reset", () => {
    disableButton(saveButton, config);
  });

  inputFields.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidatity(formEl, inputEl, config);
      toggleButtonState(inputFields, saveButton, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(config);
