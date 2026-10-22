import { View, Text, StyleSheet } from "react-native"

import { useAgregarCarro } from "@/hooks/useCarros";
import { CarroForm } from "@/components/CarroForm";
import { ListaCarros } from "@/components/ListaCarros";
import { colors, globalStyles } from "@/constants/patiotuerca";


export default function App(){
  //POST: la mutation invalida la query 'carros' y la lista se refresca 
  const agregar = useAgregarCarro()

  return (
    <View style = {globalStyles.appContainer}>
      <ListaCarros
        encabezado={
          <View>
            <View style={globalStyles.card}>
              <Text style={globalStyles.sectionTitle}>Vende tu carro</Text>
              <Text style={[globalStyles.cardSubtitle, s.subtitulo]}>Completa los datos para publicarlo</Text>
              <CarroForm
                textoBoton="Publicar carro"
                variante="secondary"
                enviando={agregar.isPending}
                onGuardar={agregar.mutateAsync}
              />
            </View>
            {agregar.isError && <Text style={globalStyles.messageError}>No se pudo agregar: {agregar.error.message}</Text>}
            {agregar.isSuccess && <Text style={globalStyles.messageSuccess}>Carro agregado correctamente</Text>}
            <Text style={[globalStyles.sectionTitle, s.seccion]}>Mis publicaciones</Text>
          </View>
        }
      />
    </View>
  )
}

const s = StyleSheet.create({
  subtitulo: {marginBottom: 12},
  seccion: {marginHorizontal: 16, marginTop: 16, marginBottom: 4, fontSize: 18, color: colors.primary.main},
})
