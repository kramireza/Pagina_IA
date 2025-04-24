document.addEventListener('DOMContentLoaded', function() {
    const centerSelect = document.getElementById('center-select');
    const centerContent = document.getElementById('center-content');

    centerSelect.addEventListener('change', function() {
        const selectedCenter = centerSelect.value;

        if (selectedCenter) {
            centerContent.style.display = 'block';
            // Aquí puedes agregar más lógica para personalizar el contenido según el centro seleccionado
            // Por ejemplo:
            if (selectedCenter === 'unah-vs') {
            //     // Mostrar contenido específico para UNAH-VS
            } else if (selectedCenter === 'unah-teg') {
            //     // Mostrar contenido específico para UNAH-Tegucigalpa
            } else if (selectedCenter === 'unah-curc') {
            //     // Mostrar contenido específico para UNAH-CURC
            }
        } else {
            centerContent.style.display = 'none';
        }
    });
});
