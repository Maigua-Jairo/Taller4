# Patiotuerca Identity Style Guide

## Paleta de Colores (Theme)

```typescript
// theme.ts
export const PatiotuercaPalette = {
  primary: {
    main: '#002F6C',      // Azul oscuro corporativo (Headers, pies de página, títulos fuertes)
    light: '#007AFF',     // Azul brillante (Enlaces, botones de acción primaria, llamadas)
    dark: '#001A3F',      // Azul ultra profundo para contrastes específicos
  },
  secondary: {
    main: '#FF6B00',      // Naranja Patiotuerca (Botones de "Vender", etiquetas TOP/Destacado)
    light: '#FFECE0',     // Fondo naranja claro para alertas o badges suaves
  },
  neutral: {
    white: '#FFFFFF',     // Fondos limpios y tarjetas
    background: '#F5F7FA',// Gris ultra claro de fondo para la aplicación
    surface: '#EEEEEE',   // Gris claro para bordes y contenedores secundarios
    textPrimary: '#1A1A1A',// Gris casi negro para texto principal y lecturas
    textSecondary: '#666666',// Gris medio para subtítulos y textos secundarios (km, año, ubicación)
  },
  status: {
    success: '#4CAF50',   // Verde para confirmaciones u ofertas activas
    gold: '#D4AF37',      // Dorado usado en la etiqueta especial "GOLD" de vehículos
  }
};
```

---

## Estilos Globales de la Interfaz

```typescript
// styles.ts
import { StyleSheet } from 'react-native';
import { PatiotuercaPalette as colors } from './theme';

export const globalStyles = StyleSheet.create({
  // --- CONTENEDOR PRINCIPAL ---
  appContainer: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },

  // --- ESTILO DE TARJETAS (CARDS) ---
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral.surface,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary.main,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.neutral.textSecondary,
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.neutral.textPrimary,
  },

  // --- BADGES / ETIQUETAS (TOP, NUEVO) ---
  badgeTop: {
    backgroundColor: colors.secondary.main,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: colors.neutral.white,
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // --- ESTILO DE BOTONES ---
  buttonPrimary: {
    backgroundColor: colors.primary.light,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.secondary.main,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  }
});
```
