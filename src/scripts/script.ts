document.querySelectorAll(".project-card__button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const dialog = (e.target as HTMLButtonElement).dataset.popup;
    if (!dialog) return;
    const popup = document.getElementById(dialog) as HTMLDialogElement;
    popup?.showModal();
  });
});

document.querySelectorAll(".project-card__close-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const dialog = (e.target as HTMLButtonElement).closest("dialog");
    dialog?.close();
  });
});

document.addEventListener("click", ({ target }) => {
  if (target instanceof HTMLDialogElement) target.close();
});
