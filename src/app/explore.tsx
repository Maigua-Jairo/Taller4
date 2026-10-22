import { useCarros, } from "@/hooks/useCarros";
import { useEliminarCarro } from "@/hooks/useEliminarCarro";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
            <View>
              <Text style={styles.title}>{item.marca} - {item.modelo}</Text>
              <Text style={styles.subtext}>Año: {item.anio} | Color: {item.color}</Text>
              <Text style={styles.subtext}>Combustible: {item.combustible}</Text>
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
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16, paddingTop: 20 },
  center: { flex: 1, textAlign: 'center', marginTop: 50, fontSize: 16 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2 
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#212121' },
  subtext: { fontSize: 14, color: '#757575', marginTop: 2 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#D32F2F', marginTop: 4 },
  deleteButton: { backgroundColor: '#D32F2F', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});