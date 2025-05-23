export function setButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  button.textContent = isLoading ? loadingText : defaultText;
}

export function handleSubmitButton(request, evt, loadingText = "Saving...") {
  evt.preventDefault();

  const sumbitButton = evt.submitter;
  const initialText = sumbitButton.textContent;

  setButtonText(sumbitButton, true, initialText, loadingText);

  request()
  .then(() => {
    evt.target.reset();
  })
  .catch(console.error)
  .finally(() => {
    setButtonText(sumbitButton, false, initialText);
  });
}