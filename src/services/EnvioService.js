import ServiceConstant from "./ServiceConstant";
import MainService from "./MainService";

export default class EnvioService extends MainService {

    static listar() {
        return this.GET_SECURED(ServiceConstant.ENVIO_LISTAR);
    }

    static obtener(parametros) {
        return this.POST_SECURED(ServiceConstant.ENVIO_OBTENER, parametros);
    }

    static registrar(parametros) {
        return this.PUT_SECURED(ServiceConstant.ENVIO_REGISTRAR, parametros);
    }

    static actualizar(parametros) {
        return this.POST_SECURED(ServiceConstant.ENVIO_ACTUALIZAR, parametros);
    }

    static eliminar(parametros) {
        return this.DELETE_SECURED(ServiceConstant.ENVIO_ELIMINAR, parametros);
    }

    static enviarCompra(parametros) {
        return this.POST_SECURED(ServiceConstant.ENVIO_ENVIAR, parametros);
    }
    static entregarCompra(parametros) {
        return this.POST_SECURED(ServiceConstant.ENVIO_ENTREGAR, parametros);
    }


}