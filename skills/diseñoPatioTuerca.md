# PatioTuerca Ecuador Redesign Identity Style Guide

## Paleta de Colores (Theme)

```typescript
// theme.ts
export const PatioTuercaPalette = {
  primary: {
    main: '#E31E24',      // Rojo vibrante principal (Fondo corporativo, logo, headers y botones destacados)
    dark: '#B01217',      // Rojo oscuro para estados presionados o bordes de énfasis
    light: '#FFEBEC',     // Fondo rosado/rojo ultra claro para alertas o badges suaves
  },
  neutral: {
    white: '#FFFFFF',     // Blanco puro para el símbolo/logo, textos sobre fondo rojo y tarjetas
    background: '#F5F7FA',// Gris ultra claro de fondo para la aplicación
    surface: '#EEEEEE',   // Gris claro para bordes y contenedores secundarios
    textPrimary: '#1A1A1A',// Gris casi negro para texto principal y lecturas
    textSecondary: '#666666',// Gris medio para subtítulos y textos de soporte
  },
  status: {
    success: '#4CAF50',   // Verde para confirmaciones, precios o insignias de validación
    gold: '#D4AF37',      // Dorado usado en la etiqueta especial "GOLD" de vehículos de patios
  }
};
```

---

## Estilos Globales de la Interfaz

```typescript
// styles.ts
import { StyleSheet } from 'react-native';
import { PatioTuercaPalette as colors } from './theme';

export const globalStyles = StyleSheet.create({
  // --- CONTENEDOR PRINCIPAL O ENCABEZADO DESTACADO ---
  brandHeader: {
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  brandText: {
    color: colors.neutral.white,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 16,
    textTransform: 'uppercase',
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
    color: colors.neutral.textPrimary,
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary.main, // Precio resaltado con el rojo de la marca
  },

  // --- BOTONES CORPORATIVOS ---
  buttonPrimary: {
    backgroundColor: colors.primary.main,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  }
});
```
