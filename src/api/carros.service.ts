//Importar el cliente axios y el tipo de carro
import {client} from './client'
import {Carro, NuevoCarro} from '../types/carro'

//definir un servicio llamado carrosService
//El servicio centraliza las operaciones de la entidad Carro
//retorna una promesa con un arreglo de objeto
//Poner metodos asincronicos para interactuar con la API

export const carrosService = {
    //Metodo GET
    getAll: async (): Promise<Carro[]> =>{
        const {data} = await client.get<Carro[]>('patio')   
        return data
    },

    //Metodo POST: agregar un nuevo carro, retornar la promesa con el objeto carro
    add: async (carro: NuevoCarro): Promise<Carro> => {
        const {data} = await client.post<Carro>('patio', carro)
        return data 
    },

    //Metodo PUT: reemplazar los datos de un carro existente por su id
    update: async (id: string, carro: NuevoCarro): Promise<Carro> => {
        const {data} = await client.put<Carro>(`patio/${id}`, carro)
        return data
    },

    //Metodo DELETE: eliminar un carro por su id
    remove: async (id: string): Promise<void> => {
        await client.delete(`patio/${id}`)
    }
}
