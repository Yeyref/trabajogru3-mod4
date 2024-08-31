export class Importacion {
    constructor(idImportacion, producto, numeroProductos, precioUnitario) {
        this.idImportacion = idImportacion;
        this.producto = producto;
        this.numeroProductos = numeroProductos;
        this.precioUnitario = precioUnitario;
        this.total = numeroProductos * precioUnitario;
    }
}
