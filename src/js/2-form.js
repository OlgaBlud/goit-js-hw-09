const formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');

form.addEventListener('input', saveInputDataToLS);
window.addEventListener('DOMContentLoaded', onReloadGetLSData);
form.addEventListener('submit', validateOnSubmitBtn);

function saveInputDataToLS() {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();
  const jsonFormData = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', jsonFormData);
}

function onReloadGetLSData() {
  const jsonDataFromLS = localStorage.getItem('feedback-form-state');
  if (!jsonDataFromLS) {
    return;
  }
  try {
    const dataFromLS = JSON.parse(jsonDataFromLS);
    const { email, message } = dataFromLS;
    form.elements.email.value = email;
    form.elements.message.value = message;
    formData.email = email;
    formData.message = message;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
  }
}

function validateOnSubmitBtn(event) {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    form.reset();
    formData.email = '';
    formData.message = '';
  }
}
