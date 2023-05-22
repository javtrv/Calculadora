import Casilla from './Casilla'
import Pantalla from './Pantalla'
import { numeros, operaciones, especial } from './consts'
import { useCalculadora } from './hooks/useCalculadora'

const Calculadora = () => {
  const handleClicklCasilla = (valor) => {
    if (valor === 'C') {
      setClear()
    } else if (valor === 'DEL') {
      setDel()
    } else if (valor === '=') {
      setResultado()
    } else {
      setInput(valor)
    }
  }

  const [input, setInput, setDel, setResultado, setClear] = useCalculadora()

  return (
    <>
      <Pantalla input={input} />
      <div className='calculadora'>
        {numeros.map((numero) => (
          <Casilla handleClicklCasilla={handleClicklCasilla} key={numero} valor={numero} tipo='num' />
        ))}

        {especial.map((esp) => (
          <Casilla handleClicklCasilla={handleClicklCasilla} key={esp} valor={esp} tipo='especial' />
        ))}

        {operaciones.map((operacion) => (
          <Casilla handleClicklCasilla={handleClicklCasilla} key={operacion} valor={operacion} tipo='operacion' />
        ))}

      </div>
    </>
  )
}

export default Calculadora
