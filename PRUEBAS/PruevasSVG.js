document.addEventListener('DOMContentLoaded', function () {
    const lienzoElementos = document.querySelector('.imagenes-container');
    const canvas = document.getElementById('simulador-canvas');
    const ctx = canvas.getContext('2d');
    const objectDropdown = document.getElementById('object-dropdown');
    const deleteButton = document.getElementById('delete-button');
    const deleteAllButton = document.getElementById('delete-all-button');
    const saveDropdown = document.getElementById('save-dropdown');
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');

    const svgContainer = document.getElementById('svg-container'); // Contenedor SVG
    let figuraId = 0;

    let figures = []; // Almacena las figuras SVG en lugar de imágenes
    let draggingFigure = null;
    let offsetX, offsetY;
    let firstClickedFigure = null;
    let lines = [];
    let selectedFigure = null;
    let selectedLine = null;
    let figureCount = 0;
    let lineCount = 0;
    let saveCount = 0;
    const saveData = {};

    lienzoElementos.addEventListener('click', function () {
        crearBarra(); // Agregar nueva barra de unión al lienzo
    });

    function crearBarra() {
        figuraId++;

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('data-id', figuraId);
        group.classList.add('figura');

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '100');
        line.setAttribute('y1', '200');
        line.setAttribute('x2', '550');
        line.setAttribute('y2', '200');
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '4');

        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.setAttribute('cx', '100');
        circle1.setAttribute('cy', '200');
        circle1.setAttribute('r', '6');
        circle1.setAttribute('fill', 'black');

        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle2.setAttribute('cx', '550');
        circle2.setAttribute('cy', '200');
        circle2.setAttribute('r', '6');
        circle2.setAttribute('fill', 'black');

        group.appendChild(line);
        group.appendChild(circle1);
        group.appendChild(circle2);
        svgContainer.appendChild(group); // Agregar al contenedor SVG

        // Habilitar arrastre en el grupo
        group.addEventListener('mousedown', iniciarMovimiento);

        // Agregar el elemento al dropdown
        agregarAlDropdown(figuraId);
    }

    function agregarAlDropdown(id) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `Barra de unión ${id}`;
        objectDropdown.appendChild(option);
    }

    function iniciarMovimiento(event) {
        const group = event.target.closest('g');
        if (group) {
            const initialX = event.clientX;
            const initialY = event.clientY;

            const moveListener = (moveEvent) => {
                const dx = moveEvent.clientX - initialX;
                const dy = moveEvent.clientY - initialY;

                group.setAttribute(
                    'transform',
                    `translate(${dx}, ${dy})`
                );
            };

            const upListener = () => {
                document.removeEventListener('mousemove', moveListener);
                document.removeEventListener('mouseup', upListener);
            };

            document.addEventListener('mousemove', moveListener);
            document.addEventListener('mouseup', upListener);
        }
    }

    function removeAllObjects() {
        while (svgContainer.firstChild) {
            svgContainer.removeChild(svgContainer.firstChild);
        }
        objectDropdown.innerHTML = '<option value="" disabled selected>Seleccionar objeto</option>';
        figures = [];
    }

    deleteAllButton.addEventListener('click', removeAllObjects);

    // Configuración inicial
    drawCanvas(); // Dibujo inicial
});
