import ServiceConstant from "./ServiceConstant";
import MainService from "./MainService";

export default class CompraService extends MainService {

    static listar() {
        return this.GET_SECURED(ServiceConstant.COMPRA_LISTAR);
    }

    static obtener(parametros) {
        return this.POST_SECURED(ServiceConstant.COMPRA_OBTENER, parametros);
    }

    static registrar(parametros) {
        return this.PUT_SECURED(ServiceConstant.COMPRA_REGISTRAR, parametros);
    }

    static actualizar(parametros) {
        return this.POST_SECURED(ServiceConstant.COMPRA_ACTUALIZAR, parametros);
    }

    static eliminar(parametros) {
        return this.DELETE_SECURED(ServiceConstant.COMPRA_ELIMINAR, parametros);
    }
    static aceptarCompra(parametros) {
        return this.POST_SECURED(ServiceConstant.COMPRA_ACEPTAR, parametros);
    }
    static rechazarCompra(parametros) {
        return this.POST_SECURED(ServiceConstant.COMPRA_RECHAZAR, parametros);
    }

}