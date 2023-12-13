import React from 'react';
import Yup from '../config/i18nYup';
import Compra from '../components/compra';
import servicio from "../services/CompraService";
import formulario from "../components/categoria/Formulario";
import RouteConstant from './routeConstant';
import Utileria from '../util';

// TITULO DE CRUD
const cabecera = {
    titulo: "Compras",
    descripcion: "Administración de compras de los clientes.",
    icono: "pe-7s-calculator"
};


//COLUMNAS DE TABLA
const columnas = [
    {
        name: 'ID COMPRA',
        center: true,
        selector: row => row.idCompra,
        width: "10%"
    },
    {
        name: 'CLIENTE',
        center: true,
        selector: ({ persona }) => `${persona.nombre} ${persona.primerApellido}${persona.segundoApellido ? ' ' + persona.segundoApellido : ''}`,
        width: "30%"
    },
    {
        name: 'TOTAL',
        center: true,
        selector: row => Utileria.formatMoney(row.total),
        width: "10%"
    },
    {
        name: 'MONTO PAGADO',
        center: true,
        selector: row => Utileria.formatMoney(row.montoPagado),
        width: "10%"
    },
    {
        name: 'FECHA COMPRA',
        center: true,
        selector: row => Utileria.formatDateTime(row.fechaCompra),
        width: "15%"
    },
    {
        name: 'ESTATUS',
        center: true,
        selector: row => row.status.nombre,
        width: "15%"
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
    persona: {
        nombre: '',
        primerApellido: '',
        segundoApellido: ''
    },
    compra_producto: []
};
//VALIDACIONES POR CADA ATRIBUTO DEL FORMULARIO
let validaciones = Yup.object().shape({
    nombre: Yup.string().min(1).max(50).required(),
    descripcion: Yup.string().min(1).max(100).required()
});

const ruta = {
    path: RouteConstant.COMPRA,
    component: () => (
        <Compra columnas={ columnas}
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