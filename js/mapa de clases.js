// Obtener elementos del tooltip
const tooltip = document.getElementById('tooltip');
const tooltipRequisito = document.getElementById('tooltip-requisito');
const tooltipAbre = document.getElementById('tooltip-abre');

// Función para mostrar el tooltip al pasar el mouse sobre las filas de la tabla
document.querySelectorAll('.plan-estudios tbody tr').forEach(row => {
    row.addEventListener('mouseenter', event => {
        const requisito = event.currentTarget.getAttribute('data-requisito') || 'Sin requisito';
        const abre = event.currentTarget.getAttribute('data-abre') || 'No abre ninguna clase';

        tooltipRequisito.textContent = `${requisito}`;
        tooltipAbre.textContent = `${abre}`;

        tooltip.style.display = 'block';
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.style.left = `${event.pageX + 10}px`;
    });

    row.addEventListener('mousemove', event => {
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.style.left = `${event.pageX + 10}px`;
    });

    row.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});

// Función para resaltar clases dependientes de acuerdo con la clase seleccionada
function resaltarRequisitos(clase) {
    // Quitar resaltado actual de todos los requisitos
    document.querySelectorAll('.requisito-dependiente').forEach(elem => {
        elem.classList.remove('requisito-dependiente');
    });

    // Obtener las clases que dependen de la clase seleccionada
    document.querySelectorAll(`[data-requisito*="${clase}"]`).forEach(elem => {
        elem.classList.add('requisito-dependiente');
    });
}

// Agregar evento click para resaltar clases dependientes
document.querySelectorAll('.plan-estudios tbody tr').forEach(row => {
    row.addEventListener('click', event => {
        const clase = event.currentTarget.getAttribute('data-clase');
        resaltarRequisitos(clase);
    });
});
