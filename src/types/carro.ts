export interface Carro{
    id: string,
    marca: string,
    modelo: string,
    anio: number | null,        //null si la API no trae un año valido
    color: string,
    combustible: number | null, //null si la API trae texto (ej. "Diesel") en lugar de galones
    precio: number | null,
}

//Datos que se envian al backend al crear o editar (el id lo genera el servidor)
export type NuevoCarro = Omit<Carro, 'id'>
