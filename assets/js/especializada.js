import { Empresa } from './empresa.js'

export class EmpresaEspecializada extends Empresa {
    constructor(id, nombre, rut, rubro, tamaño) {
        super(id, nombre, rut);
        this.rubro = rubro;
        this.tamaño = tamaño;
    }
}
