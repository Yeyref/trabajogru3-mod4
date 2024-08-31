import { EmpresaEspecializada } from './especializada.js';
import { Importacion } from './importacion.js';


document.addEventListener('DOMContentLoaded', () => {
    const empresas = [];
    console.log(empresas);
    const tablaImportaciones = document.getElementById('tablaImportaciones');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const modalText = document.getElementById('modalText');
    const showModalButton = document.getElementById('showModal');
    

    document.getElementById('formEmpresa').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.querySelector('#id').value;
        const nombre = document.querySelector('#nombre').value;
        const rut = document.querySelector('#rut').value;
        const rubro = document.querySelector('#rubro').value;
        const tamaño = document.querySelector('#tamaño').value;


        const empresa = new EmpresaEspecializada(id, nombre, rut, rubro, tamaño);
        empresas.push(empresa);
        console.log(empresas);
        document.querySelector('#formEmpresa').reset();
    });

    document.getElementById('formImportacion').addEventListener('submit', (e) => {
        e.preventDefault();
        const idImportacion = e.target.idImportacion.value;
        const producto = e.target.producto.value;
        const numeroProductos = parseInt(e.target.numeroProductos.value, 10);
        const precioUnitario = parseFloat(e.target.precioUnitario.value);

        const importacion = new Importacion(idImportacion, producto, numeroProductos, precioUnitario);
        console.log(importacion);

        // Buscamos la empresa y agregamos la importación
        const empresa = empresas.find(emp => emp.id === idImportacion); //basicamente buscamos que al id de la empresa sea el mismo que el id de la importacion
        console.log(empresas);

        if (empresa) {
            empresa.agregarImportacion(importacion);
            actualizarTabla(empresa);
        } else {
            alert('Empresa no encontrada. Verifique el ID de la empresa.');
        }
        e.target.reset();
    });

    function actualizarTabla(empresa) {
        const { productos, precio } = empresa.sumaTotalProductosYPrecio();
        tablaImportaciones.innerHTML = `
            <table>
                <tr>
                    <th>ID Importación</th>
                    <th>Producto</th>
                    <th>Número de Productos</th>
                    <th>Precio Unitario</th>
                </tr>
                ${empresa.importaciones.map(importacion => `
                <tr>
                    <td>${importacion.idImportacion}</td>
                    <td>${importacion.producto}</td>
                    <td>${importacion.numeroProductos}</td>
                    <td>${importacion.precioUnitario}</td>
                </tr>
                `).join('')}
                <tr>
                    <td colspan="2">Total Productos:</td>
                    <td>${productos}</td>
                </tr>
                <tr>
                    <td colspan="2">Total Precio:</td>
                    <td>${precio.toFixed(2)}</td>
                </tr>
            </table>
        `;
    }


    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    showModalButton.addEventListener('click', () => {
        const empresaId = prompt('Ingrese el ID de la empresa para mostrar el total de importaciones:');
        const empresa = empresas.find(emp => emp.id === empresaId);
        
        if (empresa) {
            const { productos, precio } = empresa.sumaTotalProductosYPrecio();
            modalText.innerHTML = `
                <h2>Total de Importaciones</h2>
                <p>Total Productos: ${productos}</p>
                <p>Total Precio: ${precio.toFixed(2)}</p>
            `;
            modal.style.display = 'block';
        } else {
            alert('Empresa no encontrada. Verifique el ID de la empresa.');
        }
    });
});
