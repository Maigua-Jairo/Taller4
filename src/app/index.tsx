import { View, Text, StyleSheet } from "react-native"

import { useAgregarCarro } from "@/hooks/useCarros";
import { CarroForm } from "@/components/CarroForm";
import { ListaCarros } from "@/components/ListaCarros";


export default function App(){
  //POST: la mutation invalida la query 'carros' y la lista se refresca 
  const agregar = useAgregarCarro()

  return (
    <View style = {{flex: 1, paddingTop:60, backgroundColor:'#fff'}}>
      <ListaCarros
        encabezado={
          <View style={s.encabezado}>
            <Text style={s.titulo}>Agregar carro</Text>
            {agregar.isError && <Text style={s.error}>No se pudo agregar: {agregar.error.message}</Text>}
            {agregar.isSuccess && <Text style={s.exito}>Carro agregado correctamente</Text>}
            <CarroForm
              textoBoton="Agregar"
              enviando={agregar.isPending}
              onGuardar={agregar.mutateAsync}
            />
          </View>
        }
      />
    </View>
  )
}

const s = StyleSheet.create({
  encabezado: {gap: 8, marginBottom: 16},
  titulo: {fontSize: 20, fontWeight: '700'},
  error: {padding: 10, borderRadius: 6, backgroundColor: '#ffebee', color: '#c62828'},
  exito: {padding: 10, borderRadius: 6, backgroundColor: '#e8f5e9', color: '#2e7d32'},
})
