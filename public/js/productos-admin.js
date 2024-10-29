// Obtener referencias a los elementos
const urlImagenInput = document.getElementById('urlImagen');
const previewImage = document.getElementById('previewImage');

// Actualizar la vista previa de la imagen
urlImagenInput.addEventListener('input', function() {
    const imageUrl = urlImagenInput.value;
    if (imageUrl) {
        previewImage.src = imageUrl;
    } else {
        previewImage.src = 'https://via.placeholder.com/150'; // Imagen predeterminada
    }
});

// Desactivar el botón de crear para evitar crear dos productos al hacer clic dos veces
const form = document.querySelector('.form-control');
const submitButton = form.querySelector('.button-primary');

form.addEventListener('submit', (event) => {
    submitButton.disabled = true; // Desactivar el botón
});
