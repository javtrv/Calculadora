
// eslint-disable-next-line react/prop-types
const Casilla = ({ handleClicklCasilla, valor, tipo }) => {
  return (
    <div
      onClick={() => {
        handleClicklCasilla(valor)
      }} className={`casilla ${tipo}`}
    >{valor}
    </div>
  )
}

export default Casilla
