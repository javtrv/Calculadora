export const checkVacio = (valor) => {
  return valor.includes('')
}

export const checkError = (valor) => {
  valor = valor.toString()
  return valor.includes('ERROR')
}
