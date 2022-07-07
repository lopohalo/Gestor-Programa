import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spiner from '../components/Spiner'

const VerCliente = () => {
    const [cliente, setcliente] = useState({})
    const [cargando, setcargando] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        setcargando(!cargando)
        const obtener = async () => {
            try {
                let respuesta = await fetch(`http://localhost:4000/clientes/${id}`)
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
        
        Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
            
            <div>
                {cargando ? <Spiner /> : (
                    <>
                        <h1 className="font-black text-4xl text-blue-900">ver Cliente: {cliente.nombre}</h1>
                        <p className="mt-3">Informacion del Cliente</p>
                        <p className="text-2xl text-gray-700 mt-10" >
                            <span className="text-gray-800 uppercase font-bold">Cliente:</span>
                            {cliente.nombre}
                        </p>
                        <p className="text-2xl text-gray-700 mt-4" >
                            <span className="text-gray-800 uppercase font-bold">Email:</span>
                            {cliente.email}
                        </p>
                        <p className="text-2xl text-gray-700 mt-4" >
                            <span className="text-gray-800 uppercase font-bold">Telefono:</span>
                            {cliente.telefono}
                        </p>
                        <p className="text-2xl text-gray-700 mt-4" >
                            <span className="text-gray-800 uppercase font-bold">Empresa:</span>
                            {cliente.empresa}
                        </p>
                        {cliente.notas && (
                            <p className="text-2xl text-gray-700 mt-4" >
                                <span className="text-gray-800 uppercase font-bold">Notas:</span>
                                {cliente.notas}
                            </p>
                        )}

                    </>
                )}
            </div>
        )
    )

}

export default VerCliente