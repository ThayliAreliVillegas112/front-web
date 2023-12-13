import { ENDPOINT } from "../config/ApiConfig";

export default class ServiceConstant {

    static LOGIN = `${ENDPOINT}auth/login`;

    static CATEGORIA_LISTAR = `${ENDPOINT}categoria`;
    static CATEGORIA_REGISTRAR = `${ENDPOINT}categoria/registrar`;
    static CATEGORIA_OBTENER = `${ENDPOINT}categoria/obtener`;
    static CATEGORIA_ACTUALIZAR = `${ENDPOINT}categoria/actualizar`;
    static CATEGORIA_ELIMINAR = `${ENDPOINT}categoria/eliminar`;

    static PRODUCTO_LISTAR = `${ENDPOINT}producto`;
    static PRODUCTO_REGISTRAR = `${ENDPOINT}producto/registrar`;
    static PRODUCTO_OBTENER = `${ENDPOINT}producto/obtener`;
    static PRODUCTO_ACTUALIZAR = `${ENDPOINT}producto/actualizar`;
    static PRODUCTO_ELIMINAR = `${ENDPOINT}producto/eliminar`;

    static STOCK_LISTAR = `${ENDPOINT}stock`;
    static STOCK_REGISTRAR = `${ENDPOINT}stock/registrar`;
    static STOCK_OBTENER = `${ENDPOINT}stock/obtener`;
    static STOCK_ACTUALIZAR = `${ENDPOINT}stock/actualizar`;
    static STOCK_ELIMINAR = `${ENDPOINT}stock/eliminar`;

    // static PAGO_LISTAR = `${ENDPOINT}pago`;
    // static PAGO_REGISTRAR = `${ENDPOINT}pago/registrar`;
    // static PAGO_OBTENER = `${ENDPOINT}pago/obtener`;
    // static PAGO_ACTUALIZAR = `${ENDPOINT}pago/actualizar`;
    // static PAGO_ELIMINAR = `${ENDPOINT}pago/eliminar`;

    static SUBCATEGORIA_LISTAR = `${ENDPOINT}subcategoria`;
    static SUBCATEGORIA_REGISTRAR = `${ENDPOINT}subcategoria/registrar`;
    static SUBCATEGORIA_OBTENER = `${ENDPOINT}subcategoria/obtener`;
    static SUBCATEGORIA_ACTUALIZAR = `${ENDPOINT}subcategoria/actualizar`;
    static SUBCATEGORIA_ELIMINAR = `${ENDPOINT}subcategoria/eliminar`;

    static USUARIO_LISTAR = `${ENDPOINT}usuario`;
    static USUARIO_REGISTRAR = `${ENDPOINT}usuario/registrar`;
    static USUARIO_OBTENER = `${ENDPOINT}usuario/obtener`;
    static USUARIO_ACTUALIZAR = `${ENDPOINT}usuario/actualizar`;
    static USUARIO_ELIMINAR = `${ENDPOINT}usuario/eliminar`;

    static TALLA_LISTAR = `${ENDPOINT}talla`;
    static TALLA_REGISTRAR = `${ENDPOINT}talla/registrar`;
    static TALLA_OBTENER = `${ENDPOINT}talla/obtener`;
    static TALLA_ACTUALIZAR = `${ENDPOINT}talla/actualizar`;
    static TALLA_ELIMINAR = `${ENDPOINT}talla/eliminar`;

    static TIPO_MEDIDA_LISTAR = `${ENDPOINT}tipoMedida`;
    static TIPO_MEDIDA_REGISTRAR = `${ENDPOINT}tipoMedida/registrar`;
    static TIPO_MEDIDA_OBTENER = `${ENDPOINT}tipoMedida/obtener`;
    static TIPO_MEDIDA_ACTUALIZAR = `${ENDPOINT}tipoMedida/actualizar`;
    static TIPO_MEDIDA_ELIMINAR = `${ENDPOINT}tipoMedida/eliminar`;

    static COMPRA_LISTAR = `${ENDPOINT}compra`;
    static COMPRA_REGISTRAR = `${ENDPOINT}compra/registrar`;
    static COMPRA_OBTENER = `${ENDPOINT}compra/obtener`;
    static COMPRA_ACTUALIZAR = `${ENDPOINT}compra/actualizar`;
    static COMPRA_ELIMINAR = `${ENDPOINT}compra/eliminar`;
    static COMPRA_ACEPTAR = `${ENDPOINT}compra/aceptar`;
    static COMPRA_RECHAZAR = `${ENDPOINT}compra/rechazar`;

    static ENVIO_LISTAR = `${ENDPOINT}envio`;
    static ENVIO_REGISTRAR = `${ENDPOINT}envio/registrar`;
    static ENVIO_OBTENER = `${ENDPOINT}envio/obtener`;
    static ENVIO_ACTUALIZAR = `${ENDPOINT}envio/actualizar`;
    static ENVIO_ELIMINAR = `${ENDPOINT}envio/eliminar`;
    static ENVIO_ENVIAR = `${ENDPOINT}envio/enviar`;
    static ENVIO_ENTREGAR = `${ENDPOINT}envio/entregar`;

    static CARRITO_LISTAR = `${ENDPOINT}carrito`;
    static CARRITO_REGISTRAR = `${ENDPOINT}carrito/registrar`;
    static CARRITO_OBTENER = `${ENDPOINT}carrito/obtener`;
    static CARRITO_ACTUALIZAR = `${ENDPOINT}carrito/actualizar`;
    static CARRITO_ELIMINAR = `${ENDPOINT}carrito/eliminar`;
    static CARRITO_MI_CARRITO = `${ENDPOINT}carrito/miCarrito`;
}