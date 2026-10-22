//Importar el cliente axios y el tipo de carro
import {client} from './client'
import {Carro, NuevoCarro} from '../types/carro'

//Forma en la que MockAPI guarda los carros: el año viene en 'ano' como fecha ISO
//y los numeros vienen como texto ("489.79")
type CarroApi = Omit<Carro, 'anio' | 'combustible' | 'precio'> & {
    ano?: string | number,
    anio?: string | number,
    combustible?: string | number,
    precio?: string | number,
}

//Convierte un valor a number; si no es un numero valido retorna null
const aNumero = (v: unknown): number | null => {
    if (v === null || v === undefined || v === '') return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
}

//El año puede llegar como 2024, "2024" o una fecha ISO "2026-07-23T09:24:01.422Z"
const aAnio = (v: unknown): number | null => {
    const n = aNumero(v)
    if (n !== null) return n
    if (typeof v !== 'string') return null
    const fecha = new Date(v)
    return Number.isNaN(fecha.getTime()) ? null : fecha.getFullYear()
}

//API -> app: normaliza cada carro para que la UI y el formulario trabajen con numeros
const desdeApi = ({ano, anio, combustible, precio, ...resto}: CarroApi): Carro => ({
    ...resto,
    anio: aAnio(anio ?? ano),
    combustible: aNumero(combustible),
    precio: aNumero(precio),
})

//app -> API: se envia el año en 'ano', el campo que usa MockAPI
const haciaApi = ({anio, ...resto}: NuevoCarro) => ({...resto, ano: anio})

//definir un servicio llamado carrosService
//El servicio centraliza las operaciones de la entidad Carro
//retorna una promesa con un arreglo de objeto
//Poner metodos asincronicos para interactuar con la API

export const carrosService = {
    //Metodo GET
    getAll: async (): Promise<Carro[]> =>{
        const {data} = await client.get<CarroApi[]>('patio')   
        return data.map(desdeApi)
    },

    //Metodo POST: agregar un nuevo carro, retornar la promesa con el objeto carro
    add: async (carro: NuevoCarro): Promise<Carro> => {
        const {data} = await client.post<CarroApi>('patio', haciaApi(carro))
        return desdeApi(data) 
    },

    //Metodo PUT: reemplazar los datos de un carro existente por su id
    update: async (id: string, carro: NuevoCarro): Promise<Carro> => {
        const {data} = await client.put<CarroApi>(`patio/${id}`, haciaApi(carro))
        return desdeApi(data)
    },

    //Metodo DELETE: eliminar un carro por su id
    remove: async (id: string): Promise<void> => {
        await client.delete(`patio/${id}`)
    }
}
