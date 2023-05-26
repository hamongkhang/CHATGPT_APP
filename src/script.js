const imageContainer = document.querySelector('.image-container');
const image = document.querySelector('#image');

imageContainer.addEventListener('click', () => {
  imageContainer.classList.toggle('clicked');
});