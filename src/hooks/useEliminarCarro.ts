import { carrosService } from '@/api/carros.service'
import { Carro } from '@/types/carro'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { KEY } from './useEditarCarro'

//Hook para eliminar un carro con DELETE usando actualizacion optimista:
//la UI se actualiza antes de que responda el servidor, y si falla se revierte
export function useEliminarCarro(){
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => carrosService.delete(id),

        //onMutate: se ejecuta ANTES de la peticion
        onMutate: async (id) => {
            //Cancelamos GETs en curso para que no sobrescriban el cambio optimista
            await qc.cancelQueries({queryKey: KEY})
            //Guardamos una copia de la lista actual para poder hacer rollback
            const previos = qc.getQueryData<Carro[]>(KEY)
            //Quitamos el carro de la cache: desaparece de la lista de inmediato
            qc.setQueryData<Carro[]>(KEY, (old = []) => old.filter(c => c.id !== id))
            //Lo que retornamos llega como contexto a onError y onSettled
            return {previos}
        },

        //onError: si la peticion falla, restauramos la lista previa (el carro reaparece)
        onError: (_error, _id, contexto) => {
            if (contexto?.previos) qc.setQueryData(KEY, contexto.previos)
        },

        //onSettled: al terminar (exito o error) sincronizamos con el servidor
        onSettled: () => qc.invalidateQueries({queryKey: KEY})
    })
}
