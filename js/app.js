const form = document.querySelector('#form-gastos');
const inputDescripcion = document.querySelector('#descripcion');
const inputValor = document.querySelector('#valor');
const selectCategoria = document.querySelector('#categoria');
const errorDescripcion = document.querySelector('#error-descripcion');
const errorValor = document.querySelector('#error-valor');
const errorCategoria = document.querySelector('#error-categoria');
const selectFiltro = document.querySelector('#filtro');
const tbody = document.querySelector('#tabla-gastos');
const totalEl = document.querySelector('#total');


const PRESUPUESTO = 500000;
let gastos = [];

// 3. Dibujar todo a partir de los datos
function render() {
    tbody.replaceChildren();

    // Filtro: solo los gastos de la categoría elegida
    const visibles = gastos.filter((g) =>
        selectFiltro.value === 'todas' || g.categoria === selectFiltro.value
    );

    visibles.forEach((g) => {
        const tr = document.createElement('tr');
        tr.dataset.id = g.id;

        const tdDescripcion = document.createElement('td');
        tdDescripcion.textContent = g.descripcion;

        const tdCategoria = document.createElement('td');
        tdCategoria.textContent = g.categoria;

        const tdValor = document.createElement('td');
        tdValor.textContent = `$${g.valor.toLocaleString('es-CO')}`;

        const tdAccion = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn-eliminar');
        tdAccion.append(btnEliminar);

        tr.append(tdDescripcion, tdCategoria, tdValor, tdAccion);
        tbody.append(tr);
    });

   
    const totalVisible = visibles.reduce((suma, g) => suma + g.valor, 0);
    totalEl.textContent = `Total: $${totalVisible.toLocaleString('es-CO')}`;

   
    const totalGeneral = gastos.reduce((suma, g) => suma + g.valor, 0);
    totalEl.classList.toggle('excedido', totalGeneral > PRESUPUESTO);
}


selectFiltro.addEventListener('change', render);

render();