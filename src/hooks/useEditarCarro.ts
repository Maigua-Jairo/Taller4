import { useMutation, useQueryClient } from '@tanstack/react-query'
import { carrosService } from '@/api/carros.service'
import { NuevoCarro } from '@/types/carro'
import { KEY } from './useCarros'

//Hook para editar un carro con PUT
//onSuccess: invalida la query 'carros' para que la lista (Home y Explore) se refresque sola
export function useEditarCarro(){
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({id, carro}: {id: string, carro: NuevoCarro}) => carrosService.update(id, carro),
        onSuccess: () => qc.invalidateQueries({queryKey: KEY})
    })
}
