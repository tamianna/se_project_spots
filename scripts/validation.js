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
};

//if I add 'config' to the hideInputError function (), it loads an error
//and will  not work.
const hideInputError = (formEl, inputEl) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEl.textContent = "";
  inputEl.classList.remove(config.errorClass);
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

const toggleButtonState = (inputFields, saveButton) => {
  if (hasInvaildInput(inputFields)) {
    disableButton(saveButton);
    saveButton.classList.add(config.inactiveButtonClass);
  } else {
    saveButton.disabled = false;
    saveButton.classList.remove(config.inactiveButtonClass);
  }
};

//if I add 'config' to the disableButton function (), it loads an error
//and will  not work.
const disableButton = (saveButton) => {
  saveButton.disable = true;
  saveButton.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formEl, inputFields) => {
  inputFields.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
  });
};

const setEventListeners = (formEl, config) => {
  const inputFields = Array.from(formEl.querySelectorAll(config.inputSelector));
  const saveButton = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputFields, saveButton, config);

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
