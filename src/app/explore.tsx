import { useCarros, } from "@/hooks/useCarros";
import { useEliminarCarro } from "@/hooks/useEliminarCarro";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, globalStyles } from "@/constants/patiotuerca";
export default function Explore() {
  const { data: carros = [], isLoading, error } = useCarros();
  const { mutate: eliminarCarro } = useEliminarCarro();

  // Función para confirmar antes de eliminar (como pide la rúbrica)
  const confirmarEliminacion = (id: string, marca: string) => {
    Alert.alert(
      "Eliminar Vehículo",
      `¿Estás seguro de eliminar el ${marca}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => eliminarCarro(id) }
      ]
    );
  };

  if (isLoading) return <Text style={styles.center}>Cargando vehículos...</Text>;
  if (error) return <Text style={styles.center}>Error al cargar: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList 
        data={carros}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.title}>{item.marca} - {item.modelo}</Text>
              <Text style={styles.subtext}>Año: {item.anio} | Color: {item.color}</Text>
              <Text style={styles.subtext}>Combustible: {item.combustible} gal</Text>
              <Text style={styles.price}>${item.precio}</Text>
            </View>

            {/* Botón de Eliminar que ejecuta la actualización optimista */}
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => confirmarEliminacion(item.id, item.marca)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...globalStyles.appContainer, paddingVertical: 8 },
  center: { flex: 1, textAlign: 'center', marginTop: 50, fontSize: 16, color: colors.neutral.textSecondary },
  card: {
    ...globalStyles.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: { flex: 1, marginRight: 12 },
  title: globalStyles.cardTitle,
  subtext: { ...globalStyles.cardSubtitle, marginBottom: 2 },
  price: { ...globalStyles.cardPrice, marginTop: 4 },
  deleteButton: { ...globalStyles.buttonDanger, paddingVertical: 8, paddingHorizontal: 12 },
  deleteButtonText: { ...globalStyles.buttonDangerText, fontSize: 14 }
});