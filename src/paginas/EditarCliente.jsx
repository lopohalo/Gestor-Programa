import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spiner from '../components/Spiner'

const EditarCliente = () => {
  const [cliente, setcliente] = useState({})
  const [cargando, setcargando] = useState(false)
  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    setcargando(!cargando)
    const obtener = async () => {
      try {
        let respuesta = await fetch(`https://my-json-server.typicode.com/lopohalo/Gestor-Programa/clientes/${id}`)
        respuesta = await respuesta.json()
        setcliente(respuesta)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        setcargando(false)
      }, 1500);
    }
    obtener()
  }, [])
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar datos de un cliente</p>
      {cliente?.nombre ? (
        <Formulario
          cliente={cliente}
          cargando={cargando}
        />
      ) : 'No se encontro Usuario'}

    </>
  )
}

export default EditarCliente