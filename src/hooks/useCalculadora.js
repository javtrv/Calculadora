import { useReducer } from 'react'
import { operaciones } from '../consts'
import { checkVacio, checkError } from '../helpers'
export const useCalculadora = () => {
  const initialState = {
    input: '0',
    operacion: '',
    resultado: false
  }

  const reducer = (state, action) => {
    const { type, payload } = action
    if (type === 'C') {
      return initialState
    }
    if (checkError(state.input)) {
      return {
        ...state
      }
    }
    if (type === 'DEL') {
      if (state.input.toString().length === 1) {
        return {
          ...state,
          input: '0'
        }
      }
      if (state.resultado) {
        return {
          ...state
        }
      }
      return {
        ...state,
        input: state.input.slice(0, -1)
      }
    }
    if (type === 'RESULTADO') {
      const elementoEncontrado = operaciones.find(elemento => state.input.includes(elemento))
      if (!elementoEncontrado) {
        return {
          ...state,
          input: 'ERROR: Expresion mal formada'
        }
      }
      const numeros = state.input.split(elementoEncontrado)
      if (checkVacio(numeros)) {
        return {
          ...state,
          input: 'ERROR: Expresion mal formada'
        }
      } else {
        if (elementoEncontrado === '+') {
          return {
            ...state,
            input: parseInt(numeros[0]) + parseInt(numeros[1]),
            resultado: true
          }
        } else if (elementoEncontrado === '-') {
          return {
            ...state,
            input: parseInt(numeros[0]) - parseInt(numeros[1]),
            resultado: true
          }
        }
        if (elementoEncontrado === '*') {
          return {
            ...state,
            input: parseInt(numeros[0]) * parseInt(numeros[1]),
            resultado: true
          }
        }
        if (elementoEncontrado === '/') {
          if (parseInt(numeros[1]) === 0) {
            return {
              ...state,
              input: 'ERROR: Division por 0'
            }
          } else {
            return {
              ...state,
              input: parseInt(numeros[0]) / parseInt(numeros[1]),
              resultado: true
            }
          }
        }
      }
      return {
        initialState
      }
    }
    if (type === 'INPUT') {
      if (state.input === '0') {
        return {
          ...state,
          input: payload
        }
      }
      if (state.resultado) {
        return {
          ...state,
          input: payload,
          resultado: false
        }
      } else {
        return {
          ...state,
          input: state.input.toString() + payload
        }
      }
    }
  }

  const [{ input }, dispatch] = useReducer(reducer, initialState)

  const setInput = (valor) => {
    dispatch({ type: 'INPUT', payload: valor })
  }
  const setDel = () => {
    dispatch({ type: 'DEL' })
  }
  const setResultado = () => {
    dispatch({ type: 'RESULTADO' })
  }
  const setClear = () => {
    dispatch({ type: 'C' })
  }

  return [input, setInput, setDel, setResultado, setClear]
}
