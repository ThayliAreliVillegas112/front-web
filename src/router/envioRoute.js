import React from 'react';
import Yup from '../config/i18nYup';
import Envio from '../components/envio';
import servicio from "../services/EnvioService";
import formulario from "../components/categoria/Formulario";
import RouteConstant from './routeConstant';
import constantes from '../util/constantes';
import Utileria from '../util';

// TITULO DE CRUD
const cabecera = {
    titulo: "Envios",
    descripcion: "Administración de envios de compras.",
    icono: "pe-7s-plane"
};


//COLUMNAS DE TABLA
const columnas = [
    {
        name: 'ID ENVÍO',
        center: true,
        selector: row => row.idEnvio,
        width: "10%"
    },
    {
        name: 'CLIENTE',
        center: true,
        selector: ({ compra }) => `${compra.persona.nombre} ${compra.persona.primerApellido}${compra.persona.segundoApellido ? ' ' + compra.persona.segundoApellido : ''}`,
        width: "20%"
    },
    {
        name: 'ID COMPRA',
        center: true,
        selector: row => row.compraId,
        width: "10%"
    },
    {
        name: 'FECHA ENVIO',
        center: true,
        selector: row => row.status.nombre === constantes.ESTATUS_PENDIENTE ? '- - -': Utileria.formatDateTime(row.fechaEnvio),
        width: "15%"
    },
    {
        name: 'FECHA ENTREGA',
        center: true,
        selector: row => row.status.nombre === constantes.ESTATUS_PENDIENTE ? '- - -': Utileria.formatDateTime(row.fechaEntrega),
        width: "15%"
    },
    {
        name: 'RESPONSABLE',
        center: true,
        selector: ({ personaResponsable, status }) => 
        status.nombre === constantes.ESTATUS_PENDIENTE ? '- - -' : (`${personaResponsable.nombre} ${personaResponsable.primerApellido} ${personaResponsable.segundoApellido ? ' ' + personaResponsable.segundoApellido : ''}`)
         ,
        width: "10%"
    },
    {
        name: 'ESTATUS',
        center: true,
        selector: row => row.status.nombre,
        width: "10%"
    },
    {
        name: 'ACCIONES',
        center: true,
        width: "10%",
        selector: row => row.acciones,
    }
];

//VALOR INICIAL DEL OBJETO DEL FORMULARIO
const inicial = {
    nombre: '',
    descripcion: '',
    compra:{
        persona:{
            nombre: '',
            primerApellido: '',
            segundoApellido: ''
        }
    },
    compra_producto: []
};

//VALIDACIONES POR CADA ATRIBUTO DEL FORMULARIO
let validaciones = Yup.object().shape({
    nombre: Yup.string().min(1).max(50).required(),
    descripcion: Yup.string().min(1).max(100).required()
});

const ruta = {
    path: RouteConstant.ENVIO,
    component: () => (
        <Envio columnas={ columnas}
            cabecera={cabecera}
            inicial={ inicial}
            servicio={servicio }
            Formulario={ formulario}
            validaciones={validaciones}
            ocultarRegistro={true}
        />
    )

};

export default ruta;