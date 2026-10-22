import { ReactElement, useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, Modal, Alert, Platform, ActivityIndicator, StyleSheet } from 'react-native'
import { Carro } from '@/types/carro'
import { useCarros } from '@/hooks/useCarros'
import { useEditarCarro } from '@/hooks/useEditarCarro'
import { useEliminarCarro } from '@/hooks/useEliminarCarro'
import { CarroForm } from './CarroForm'
import { colors, globalStyles } from '@/constants/patiotuerca'

//Lista de carros con acciones de editar y eliminar
//Se usa en Home y en Explore: ambas comparten la query 'carros', asi que cualquier
//cambio en la cache se refleja en las dos pantallas sin recargarlas
export function ListaCarros({encabezado}: {encabezado?: ReactElement}){
  const {data: carros = [], isLoading, error} = useCarros()
  const editar = useEditarCarro()
  const eliminar = useEliminarCarro()
  const [editando, setEditando] = useState<Carro | null>(null)

  //Los mensajes de exito/error se ocultan solos a los 3 segundos
  useEffect(() => {
    if (!eliminar.isSuccess && !eliminar.isError) return
    const t = setTimeout(eliminar.reset, 3000)
    return () => clearTimeout(t)
  }, [eliminar.isSuccess, eliminar.isError, eliminar.reset])

  useEffect(() => {
    if (!editar.isSuccess) return
    const t = setTimeout(editar.reset, 3000)
    return () => clearTimeout(t)
  }, [editar.isSuccess, editar.reset])

  //Pedir confirmacion antes de borrar (Alert con botones no funciona en web)
  const confirmarEliminar = (carro: Carro) => {
    const texto = `¿Seguro que deseas eliminar ${carro.marca} ${carro.modelo}?`
    if (Platform.OS === 'web') {
      if (window.confirm(texto)) eliminar.mutate(carro.id)
      return
    }
    Alert.alert('Eliminar carro', texto, [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Eliminar', style: 'destructive', onPress: () => eliminar.mutate(carro.id)},
    ])
  }

  const abrirEdicion = (carro: Carro) => {
    editar.reset()
    setEditando(carro)
  }

  if (isLoading) return <Text style={s.centro}>Cargando...</Text>
  if (error) return <Text style={s.centro}>Error: {error.message}</Text>

  return (
    <>
      <FlatList
        data={carros}
        keyExtractor={item => item.id}
        contentContainerStyle={s.lista}
        ListHeaderComponent={
          <>
            {encabezado}
            {eliminar.isError && <Text style={globalStyles.messageError}>No se pudo eliminar: {eliminar.error.message}</Text>}
            {eliminar.isSuccess && <Text style={globalStyles.messageSuccess}>Carro eliminado correctamente</Text>}
            {editar.isSuccess && <Text style={globalStyles.messageSuccess}>Carro actualizado correctamente</Text>}
          </>
        }
        ListEmptyComponent={<Text style={s.centro}>No hay carros registrados</Text>}
        renderItem={({item}) => {
          const borrando = eliminar.isPending && eliminar.variables === item.id
          return (
            <View style={globalStyles.card}>
              <View style={globalStyles.badgeRow}>
                <View style={globalStyles.badgeTop}>
                  <Text style={globalStyles.badgeText}>{item.anio ?? '—'}</Text>
                </View>
                <View style={globalStyles.badgeSoft}>
                  <Text style={globalStyles.badgeSoftText}>{item.combustible != null ? `${item.combustible} gal` : 'Sin combustible'}</Text>
                </View>
              </View>
              <Text style={[globalStyles.cardTitle, s.titulo]}>{item.marca} {item.modelo}</Text>
              <Text style={globalStyles.cardSubtitle}>Color {item.color ?? '—'}</Text>
              <Text style={globalStyles.cardPrice}>{item.precio != null ? `$${Number(item.precio).toLocaleString()}` : '—'}</Text>
              <View style={s.acciones}>
                <Pressable style={[globalStyles.buttonPrimary, s.boton]} onPress={() => abrirEdicion(item)}>
                  <Text style={globalStyles.buttonText}>Editar</Text>
                </Pressable>
                <Pressable
                  style={[globalStyles.buttonDanger, s.boton, borrando && globalStyles.buttonDisabled]}
                  disabled={borrando}
                  onPress={() => confirmarEliminar(item)}
                >
                  {borrando
                    ? <ActivityIndicator color={colors.status.error} />
                    : <Text style={globalStyles.buttonDangerText}>Eliminar</Text>}
                </Pressable>
              </View>
            </View>
          )
        }}
      />

      {/* Formulario de edicion con los datos actuales precargados */}
      <Modal visible={editando !== null} animationType="slide" onRequestClose={() => setEditando(null)}>
        <View style={s.modal}>
          <Text style={globalStyles.sectionTitle}>Editar carro</Text>
          {editar.isError && <Text style={[globalStyles.messageError, s.mensajeModal]}>No se pudo actualizar: {editar.error.message}</Text>}
          {editando && (
            <CarroForm
              key={editando.id}
              carro={editando}
              textoBoton="Guardar cambios"
              enviando={editar.isPending}
              onGuardar={datos => editar.mutateAsync({id: editando.id, carro: datos}).then(() => setEditando(null))}
            />
          )}
          <Pressable style={s.cancelar} onPress={() => setEditando(null)} disabled={editar.isPending}>
            <Text style={s.cancelarTexto}>Cancelar</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  )
}

const s = StyleSheet.create({
  centro: {textAlign: 'center', marginTop: 20, color: colors.neutral.textSecondary},
  lista: {paddingVertical: 8},
  titulo: {marginTop: 8},
  acciones: {flexDirection: 'row', gap: 8, marginTop: 12},
  boton: {flex: 1, paddingHorizontal: 12},
  modal: {flex: 1, padding: 16, paddingTop: 60, gap: 12, backgroundColor: colors.neutral.background},
  mensajeModal: {marginHorizontal: 0},
  cancelar: {alignItems: 'center', padding: 12},
  cancelarTexto: {color: colors.primary.light, fontSize: 16, fontWeight: '600'},
})
