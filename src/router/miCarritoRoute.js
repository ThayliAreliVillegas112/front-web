// import React from 'react';
// import Yup from '../config/i18nYup';
// import Carrito from '../components/miCarrito';
// import servicio from "../services/CarritoService";
// import formulario from "../components/categoria/Formulario";
// import RouteConstant from './routeConstant';
// import Utileria from "../util";

// // TITULO DE CRUD
// const cabecera = {
//     titulo: "Carritos",
//     descripcion: "Listado de carritos de compras de los clientes.",
//     icono: "pe-7s-cart"
// };

// const formatter = new Intl.NumberFormat('es-MX', {
//     style: 'decimal',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
// });


// //COLUMNAS DE TABLA
// const columnas = [
//     {
//         name: 'NO.',
//         center: true,
//         selector: row => row.indice,
//         width: "5%"
//     },
//     {
//         name: 'CLIENTE',
//         center: true,
//         selector: ({ persona }) => `${persona.nombre} ${persona.primerApellido}${persona.segundoApellido ? ' ' + persona.segundoApellido : ''}`,
//         width: "35%"
//     },
//     {
//         name: 'TOTAL',
//         center: true,
//         selector: row => `$${formatter.format(row.total)}`,
//         width: "25%"
//     },
//     {
//         name: 'FECHA ACTUALIZACIÓN',
//         center: true,
//         selector: (row) => Utileria.formatDateTime(row.fechaActualizacion),
//         width: "25%"
//     },
//     {
//         name: 'ACCIONES',
//         center: true,
//         width: "10%",
//         selector: row => row.acciones,
//     }
// ];

// //VALOR INICIAL DEL OBJETO DEL FORMULARIO
// const inicial = {
//     persona: {
//         nombre: '',
//         primerApellido: '',
//         segundoApellido: ''
//     },
//     carrito_producto: []
// };

// //VALIDACIONES POR CADA ATRIBUTO DEL FORMULARIO
// let validaciones = Yup.object().shape({
//     nombre: Yup.string().min(1).max(50).required(),
//     descripcion: Yup.string().min(1).max(100).required()
// });

// const ruta = {
//     path: RouteConstant.MI_CARRITO,
//     component: () => (
//         <Carrito columnas={columnas}
//             cabecera={cabecera}
//             inicial={inicial}
//             servicio={servicio}
//             Formulario={formulario}
//             validaciones={validaciones}
//             ocultarRegistro={true}
//         />
//     )

// };

// export default ruta;