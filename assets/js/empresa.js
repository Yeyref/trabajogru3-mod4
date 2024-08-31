export class Empresa {
    constructor(id, nombre, rut) {
        this.id = id;
        this.nombre = nombre;
        this.rut = rut;
        this.importaciones = [];
    }

    agregarImportacion(importacion) {
        this.importaciones.push(importacion);
    }

    sumaTotalImportaciones() {
        return this.importaciones.reduce((total, importacion) => total + importacion.total, 0);
    }

    sumaTotalProductosYPrecio() {
        return this.importaciones.reduce((total, importacion) => {
            return {
                productos: total.productos + importacion.numeroProductos,
                precio: total.precio + (importacion.numeroProductos * importacion.precioUnitario)
            };
        }, { productos: 0, precio: 0 });
    }
}
