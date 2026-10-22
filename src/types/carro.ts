export interface Carro{
    id: string,
    marca: string,
    modelo: string,
    anio: number,
    color: string,
    combustible: number,
    precio: number,
}

//Datos que se envian al backend al crear o editar (el id lo genera el servidor)
export type NuevoCarro = Omit<Carro, 'id'>
