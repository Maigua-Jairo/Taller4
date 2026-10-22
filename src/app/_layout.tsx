//Tabs desde expo-router, define la navegacion por pestañas
//importamos QueryClient, QueryClientProvider desde tanStack
//Estos se usan para configurar y proveeder el cliente de querys de toda la app

import {Tabs} from 'expo-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { colors } from '@/constants/patiotuerca'

//Creamos una instancia de QueryClient
//Este objeto administra la cache y el ciclo de vida de la querys/mutations
const qc = new QueryClient()

//Componente Layout, para envolver la navegacion dentro de QueryClientProvider
//Con eso, todos los componentes hijos pueden usar useQuery y useMutation
//Este el punto de integracion entra tanStack Query y la navegacion de EXPO

export default function Layout(){
  return (
    <QueryClientProvider client = {qc}>
    <Tabs
      screenOptions={{
        //Header azul corporativo de Patiotuerca
        headerStyle: {backgroundColor: colors.primary.main},
        headerTintColor: colors.neutral.white,
        headerTitleStyle: {fontWeight: '800'},
        //Barra de pestañas blanca con la pestaña activa en naranja
        tabBarStyle: {backgroundColor: colors.neutral.white, borderTopColor: colors.neutral.surface},
        tabBarActiveTintColor: colors.secondary.main,
        tabBarInactiveTintColor: colors.neutral.textSecondary,
        tabBarLabelStyle: {fontSize: 13, fontWeight: '700'},
        sceneStyle: {backgroundColor: colors.neutral.background},
      }}
    >
      <Tabs.Screen name = 'index' options = {{title: 'Publicar', headerTitle: 'Patiotuerca · Publica tu carro', tabBarIcon: () => null}}/>
      <Tabs.Screen name = 'explore' options = {{title: 'Explorar', headerTitle: 'Patiotuerca · Carros en venta', tabBarIcon: () => null}}/>
    </Tabs>
    </QueryClientProvider>
  )
}
