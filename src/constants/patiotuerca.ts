import { StyleSheet } from 'react-native'

//Identidad visual de Patiotuerca (ver skills/diseñoPatioTuerca.md)
export const colors = {
  primary: {
    main: '#002F6C',      //Azul oscuro corporativo (headers, titulos fuertes)
    light: '#007AFF',     //Azul brillante (botones de accion primaria)
    dark: '#001A3F',      //Azul ultra profundo para contrastes
  },
  secondary: {
    main: '#FF6B00',      //Naranja Patiotuerca (boton "Vender"/agregar, etiquetas)
    light: '#FFECE0',     //Fondo naranja claro para badges suaves
  },
  neutral: {
    white: '#FFFFFF',
    background: '#F5F7FA',
    surface: '#EEEEEE',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
  },
  status: {
    success: '#4CAF50',
    gold: '#D4AF37',
    error: '#D32F2F',     //No esta en la guia: se usa para errores y eliminar
    errorLight: '#FDECEA',
    successLight: '#EAF6EA',
  },
}

export const globalStyles = StyleSheet.create({
  // --- CONTENEDOR PRINCIPAL ---
  appContainer: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },

  // --- TARJETAS ---
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral.surface,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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

  // --- BADGES / ETIQUETAS ---
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

  // --- BOTONES ---
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
  buttonDanger: {
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.status.error,
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDangerText: {
    color: colors.status.error,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  // --- TITULOS DE SECCION ---
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary.main,
  },

  // --- MENSAJES DE EXITO / ERROR ---
  messageSuccess: {
    backgroundColor: colors.status.successLight,
    color: colors.status.success,
    fontWeight: '600',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  messageError: {
    backgroundColor: colors.status.errorLight,
    color: colors.status.error,
    fontWeight: '600',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 4,
  },
})
