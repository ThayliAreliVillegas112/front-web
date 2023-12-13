import ServiceConstant from "./ServiceConstant";
import MainService from "./MainService";

export default class CarritoService extends MainService {

    static obtenerMiCarrito() {
        return this.GET_SECURED(ServiceConstant.CARRITO_MI_CARRITO);
    }
    static listar() {
        return this.GET_SECURED(ServiceConstant.CARRITO_LISTAR);
    }

    static obtener(parametros) {
        return this.POST_SECURED(ServiceConstant.CARRITO_OBTENER, parametros);
    }

    static registrar(parametros) {
        return this.PUT_SECURED(ServiceConstant.CARRITO_REGISTRAR, parametros);
    }

    static actualizar(parametros) {
        return this.POST_SECURED(ServiceConstant.CARRITO_ACTUALIZAR, parametros);
    }

    static eliminar(parametros) {
        return this.DELETE_SECURED(ServiceConstant.CARRITO_ELIMINAR, parametros);
    }

}