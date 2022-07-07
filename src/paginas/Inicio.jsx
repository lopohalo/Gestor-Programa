import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {
  const [clientes, setCliente] = useState([])
  useEffect(() => {
    const hola = async () => {
      try {
        const pidiendoUsuarios = await fetch('https://my-json-server.typicode.com/lopohalo/Gestor-Programa/clientes')
        const respuesta = await pidiendoUsuarios.json()
        setCliente(respuesta)
      } catch (error) {
        console.log(error)
      }
    }
    hola()
  }, [])
  const eliminar = async id => {
    const confirmar = confirm('Are you sure you want to delete this')
    if (confirmar) {
      try {
        let respuesta = await fetch(`https://my-json-server.typicode.com/lopohalo/Gestor-Programa/clientes/${id}`,
          {
            method: 'DELETE',
          })
        await respuesta.json()
        const nuevoArreglo = clientes.filter(cliente => cliente.id !== id)
        setCliente(nuevoArreglo)
      } catch (error) {
          console.log(error)
      }
    }
  }
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra  tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresas</th>
            <th className="p-2">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              eliminar={eliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inicio