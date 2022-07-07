import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spiner from './Spiner'
import { useNavigate } from 'react-router-dom'
const Formulario = ({ cliente, cargando }) => {
    const navegar = useNavigate()
    const validateYupSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(10, 'El nombre es muy largo')
            .required('El nombre es obligatorio'),
        empresa: Yup.string().required('Empresa es obligatorio'),
        email: Yup.string()
            .email('Email no valido')
            .required('Email Es obligatorio'),
        telefono: Yup.number()
            .typeError('Telefono no valido')
            .integer('Telefono no valido')
            .positive('Telefono no valido')
    })
    const onsubmit1 = async (values) => {
        try {
            if (cliente.id) {
                const respuesta = await fetch(`https://my-json-server.typicode.com/lopohalo/Gestor-Programa/clientes/${cliente.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: { 'Content-Type': 'application/json' }
                })
                await respuesta.json()

                navegar('/clientes')
            } else {
                const respuesta = await fetch('https://my-json-server.typicode.com/lopohalo/Gestor-Programa/clientes', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: { 'Content-Type': 'application/json' }
                })
                await respuesta.json()

                navegar('/clientes')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        cargando ? <Spiner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-black text-xl uppercase">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        onsubmit1(values)
                        resetForm()
                    }}
                    validationSchema={validateYupSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form
                                className="mt-10"
                            >
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor='nombre'
                                    >Nombre:</label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50 "
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />
                                    {touched.nombre && errors.nombre ? <Alerta>{errors.nombre}</Alerta> : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor='empresa'
                                    >Empresa:</label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="empresa del Cliente"
                                        name="empresa"
                                    />
                                    {touched.empresa && errors.empresa ? <Alerta>{errors.empresa}</Alerta> : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor='email'
                                    >Email:</label>
                                    <Field
                                        id="email"
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-50 "
                                        placeholder="Email del Cliente"
                                        name="email"
                                    />
                                    {touched.email && errors.email ? <Alerta>{errors.email}</Alerta> : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor='telefono'
                                    >Telefono:</label>
                                    <Field
                                        id="telefono"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-50 "
                                        placeholder="Telefono del Cliente"
                                        name="telefono"
                                    />
                                    {touched.telefono && errors.telefono ? <Alerta>{errors.telefono}</Alerta> : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-gray-800"
                                        htmlFor='notas'
                                    >Notas:</label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />
                                </div>
                                <input type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg" />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )

    )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
export default Formulario