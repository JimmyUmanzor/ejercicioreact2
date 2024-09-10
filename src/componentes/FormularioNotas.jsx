import React, { useState } from 'react'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'

const FormularioNotas = () => {
  const [primerParcial, setPrimerParcial] = useState('')
  const [segundoParcial, setSegundoParcial] = useState('')
  const [tercerParcial, setTercerParcial] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [notaFinal, setnotaFinal] = useState('')

  const calcularNotaFinal = (e) => {
    e.preventDefault()

    const nota1 = parseFloat(primerParcial)
    const nota2 = parseFloat(segundoParcial)
    const nota3 = parseFloat(tercerParcial)

    
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
      Swal.fire('error', 'Ingresar valores válidos en notas de cada parcial', 'error')
      return;
    }
    if (nota1 < 0 || nota1 > 30 || nota2 < 0 || nota2 > 30 || nota3 < 0 || nota3 > 40) {
      Swal.fire('Error', 'Los valores permitidos son: 30% (Máximo) primer y segundo parcial y 40% (Máximo) tercer parcial.', 'error')
      return;
    }

    const notaFinal = nota1 + nota2 + nota3
    let resultado = ''
    if (notaFinal <= 59) {
      resultado = 'Reprobado'
    } else if (notaFinal <= 79) {
      resultado = 'Bueno'
    } else if (notaFinal <= 89) {
      resultado = 'Muy Bueno'
    } else {
      resultado = 'Sobresaliente'
    }

    setMensaje(resultado)
    setnotaFinal(notaFinal)
    Swal.fire('Resultado', `Nota final ${notaFinal}%: ${resultado}`, 'success')
  };

  return (
    <div className="container mt-5">
  <h1 className="text-center">Calculadora de Notas</h1>
  <form onSubmit={calcularNotaFinal} className="shadow p-4">
    <div className="row mb-3">
      <label className="col-sm-4 col-form-label">Primer Parcial (30%):</label>
      <div className="col-sm-8">
        <input
          type="number"
          className="form-control"
          value={primerParcial}
          onChange={(e) => setPrimerParcial(e.target.value)}
          placeholder="Ingresa la nota"
        />
      </div>
    </div>
    <div className="row mb-3">
      <label className="col-sm-4 col-form-label">Segundo Parcial (30%):</label>
      <div className="col-sm-8">
        <input
          type="number"
          className="form-control"
          value={segundoParcial}
          onChange={(e) => setSegundoParcial(e.target.value)}
          placeholder="Ingresa la nota"
        />
      </div>
    </div>
    <div className="row mb-3">
      <label className="col-sm-4 col-form-label">Tercer Parcial (40%):</label>
      <div className="col-sm-8">
        <input
          type="number"
          className="form-control"
          value={tercerParcial}
          onChange={(e) => setTercerParcial(e.target.value)}
          placeholder="Ingresa la nota"
        />
      </div>
    </div>
    <button type="submit" className="btn btn-primary w-100">Calcular Nota Final</button>
  </form>


     {mensaje && (
        <div className={`alert mt-4 ${mensaje === 'Reprobado' ? 'alert-danger' : mensaje === 'Sobresaliente' ? 'alert-success' : 'alert-secondary'}`}>
  <h4>{notaFinal} : {mensaje}</h4>
</div>
      )}
    </div>
  );
};

export default FormularioNotas
