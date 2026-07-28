const timestampInput = document.getElementById('timestamp');
const modalLinks = document.querySelectorAll('.membership-link');
const modalCloseButtons = document.querySelectorAll('.modal-close');

if (timestampInput) {
  const now = new Date();
  timestampInput.value = now.toLocaleString();
}

modalLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const modalId = event.currentTarget.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal && typeof modal.showModal === 'function') {
      modal.showModal();
      modal.querySelector('button.modal-close')?.focus();
    }
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const dialog = event.currentTarget.closest('dialog');
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
      const triggerId = dialog.id.replace('modal-', '');
      document.querySelector(`.membership-link[data-modal="${dialog.id}"]`)?.focus();
    }
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('dialog.open').forEach((dialog) => {
      if (typeof dialog.close === 'function') {
        dialog.close();
      }
    });
  }
});

const dialogs = document.querySelectorAll('dialog');
if (dialogs.length) {
  dialogs.forEach((dialog) => {
    dialog.addEventListener('close', () => {
      dialog.classList.remove('open');
    });
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      dialog.close();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      const openButton = document.querySelector(`.membership-link[data-modal="${dialog.id}"]`);
      if (openButton) {
        openButton.focus();
      }
    });
  });
}
