import { useForm } from '@tanstack/react-form'
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import { Carro, NuevoCarro } from '@/types/carro'

//En el formulario todos los valores son string (asi los maneja TextInput)
//y se convierten a number recien al guardar
type Valores = Record<keyof NuevoCarro, string>

const ANIO_MIN = 1900
const ANIO_MAX = new Date().getFullYear() + 1

//Validadores: retornan el mensaje de error o undefined si el valor es valido
const requerido = (v: string) => v.trim() ? undefined : 'Este campo es obligatorio'

const mayorQueCero = (v: string) => {
  if (!v.trim()) return 'Este campo es obligatorio'
  const n = Number(v)
  if (Number.isNaN(n)) return 'Debe ser un número'
  if (n <= 0) return 'Debe ser mayor que 0'
}

const anioValido = (v: string) => {
  if (!v.trim()) return 'Este campo es obligatorio'
  const n = Number(v)
  if (!Number.isInteger(n)) return 'Debe ser un año sin decimales'
  if (n < ANIO_MIN || n > ANIO_MAX) return `Debe estar entre ${ANIO_MIN} y ${ANIO_MAX}`
}

const CAMPOS: {name: keyof Valores, label: string, numerico?: boolean, validar: (v: string) => string | undefined}[] = [
  {name: 'marca', label: 'Marca', validar: requerido},
  {name: 'modelo', label: 'Modelo', validar: requerido},
  {name: 'anio', label: 'Año', numerico: true, validar: anioValido},
  {name: 'color', label: 'Color', validar: requerido},
  {name: 'combustible', label: 'Combustible (galones)', numerico: true, validar: mayorQueCero},
  {name: 'precio', label: 'Precio (USD)', numerico: true, validar: mayorQueCero},
]

//true si algun campo tiene error (sirve para deshabilitar el boton desde el inicio)
const esInvalido = (values: Valores) => CAMPOS.some(c => c.validar(values[c.name]))

interface Props {
  carro?: Carro                                   //si llega, el formulario es de edicion (datos precargados)
  textoBoton: string
  enviando: boolean                               //isPending de la mutacion
  onGuardar: (carro: NuevoCarro) => Promise<unknown>
}

export function CarroForm({carro, textoBoton, enviando, onGuardar}: Props){
  const form = useForm({
    defaultValues: {
      marca: carro?.marca ?? '',
      modelo: carro?.modelo ?? '',
      anio: carro?.anio != null ? String(carro.anio) : '',
      color: carro?.color ?? '',
      combustible: carro?.combustible != null ? String(carro.combustible) : '',
      precio: carro?.precio != null ? String(carro.precio) : '',
    } as Valores,
    onSubmit: async ({value, formApi}) => {
      try {
        await onGuardar({
          marca: value.marca.trim(),
          modelo: value.modelo.trim(),
          anio: Number(value.anio),
          color: value.color.trim(),
          combustible: Number(value.combustible),
          precio: Number(value.precio),
        })
        //Al agregar limpiamos el formulario; al editar se cierra el modal desde afuera
        if (!carro) formApi.reset()
      } catch {
        //El error lo muestra la pantalla con isError de la mutacion
      }
    }
  })

  return (
    <View style={s.contenedor}>
      {CAMPOS.map(c => (
        <form.Field
          key={c.name}
          name={c.name}
          validators={{
            onChange: ({value}) => c.validar(value),
            onBlur: ({value}) => c.validar(value),
          }}
        >
          {field => {
            const meta = field.state.meta
            const error = (meta.isTouched || meta.isBlurred) && meta.errors.length > 0
              ? meta.errors.join(', ')
              : undefined
            return (
              <View style={s.campo}>
                <Text style={s.label}>{c.label}</Text>
                <TextInput
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  onBlur={field.handleBlur}
                  keyboardType={c.numerico ? 'numeric' : 'default'}
                  placeholder={c.label}
                  style={[s.input, error ? s.inputError : null]}
                />
                {error && <Text style={s.error}>{error}</Text>}
              </View>
            )
          }}
        </form.Field>
      ))}

      {/* Boton deshabilitado si el formulario es invalido o se esta enviando */}
      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting, state.values] as const}>
        {([canSubmit, isSubmitting, values]) => {
          const cargando = isSubmitting || enviando
          const deshabilitado = !canSubmit || cargando || esInvalido(values)
          return (
            <Pressable
              onPress={() => form.handleSubmit()}
              disabled={deshabilitado}
              style={[s.boton, deshabilitado && s.botonDeshabilitado]}
            >
              {cargando
                ? <ActivityIndicator color="#fff" />
                : <Text style={s.botonTexto}>{textoBoton}</Text>}
            </Pressable>
          )
        }}
      </form.Subscribe>
    </View>
  )
}

const s = StyleSheet.create({
  contenedor: {gap: 10},
  campo: {gap: 4},
  label: {fontWeight: '600'},
  input: {borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10},
  inputError: {borderColor: '#d32f2f'},
  error: {color: '#d32f2f', fontSize: 12},
  boton: {backgroundColor: '#1565c0', padding: 12, borderRadius: 6, alignItems: 'center'},
  botonDeshabilitado: {opacity: 0.5},
  botonTexto: {color: '#fff', fontWeight: '700'},
})
