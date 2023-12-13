import React, { Fragment, useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Row, Col, Card, CardBody, Button, CardTitle, Label } from 'reactstrap';
import Slider from 'react-slick';
import { Formik, useFormik, Field } from "formik";
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import PageTitle from '../../Layout/AppMain/PageTitle';
import Tabla from '../tabla';
import Utileria from '../../util';
import constantes from '../../util/constantes';



const Crud = (props) => {

  let { cabecera, columnas, servicio, Formulario, inicial, validaciones, ocultarRegistro } = props;

  const LISTADO = 1;
  const REGISTRO = 2;
  const MODIFICACION = 3;
  const VISUALIZACION = 4;

  const [registros, setRegistros] = useState([]);
  const [vista, setVista] = useState(LISTADO);
  const [enviando, setEnviando] = useState(false);
  let [valoresFormulario, setValoresFormulario] = useState({});


  let obtener = (params, i) => {

    if (!enviando) {

      setEnviando(true);

      servicio.obtener(params).then(({ data }) => {
        setValoresFormulario(data);
        setVista(MODIFICACION);
      }).catch((e) => {
        Utileria.errorhttp(e);
      }).finally(() => {
        setEnviando(false);
      });
    }
  };

  let ver = (params, i) => {

    if (!enviando) {

      setEnviando(true);

      servicio.obtener(params).then(({ data }) => {
        setValoresFormulario(data);
        setVista(VISUALIZACION);
      }).catch((e) => {
        Utileria.errorhttp(e);
      }).finally(() => {
        setEnviando(false);
      });
    }
  };

  let eliminar = (params, i) => {
    if (!enviando) {

      const resultado = window.confirm('¿Desea eliminar el elemento?');

      if (resultado) {
        servicio.eliminar(params).then((response) => {
          listar();
          Utileria.notifications("Eliminado correctamente.", "success")
        }).catch((e) => {
          Utileria.errorhttp(e);
        }).finally(() => {
          setEnviando(false);
        })
      } else {
        setEnviando(false);
      }



    }
  };
  const listar = () => {
    servicio.listar().then(({ data }) => {

      let datos = data.map((item, i) => {
        item["indice"] = (<div>{i + 1}</div>)
        item["acciones"] = (<div>

          {/* <Button onClick={() => eliminar(item)} outline className="my-2 border-0 btn-transition" color="danger">
            <i className="pe-7s-trash" style={{ fontSize: 19 }} />
          </Button>
          <Button onClick={() => obtener(item)} outline className="my-2 me-2 border-0 btn-transition" color="warning">
            <i className="pe-7s-pen" style={{ fontSize: 19 }} />
          </Button> */}
          <Button onClick={() => ver(item)} outline className="my-2 me-2 border-0 btn-transition" color="blue">
            <i className="pe-7s-look" style={{ fontSize: 19 }} />
          </Button>
        </div>);
        return item;
      })
      setRegistros(datos);

    }).catch((e) => {
      Utileria.errorhttp(e);
    });
  };

  const registrar = (valores) => {
    console.log('valores', valores);
    if (!enviando) {
      setEnviando(true);

      servicio.registrar(valores).then(({ data, status }) => {
        listar();
        Utileria.notifications("Se ha registrado correctamente.", "SUCCESS");
        setValoresFormulario(inicial);
        setVista(LISTADO);
      }).catch((e) => {
        Utileria.errorhttp(e);
      }).finally(() => {
        setEnviando(false);
      });
    }
  };

  let actualizar = (valores) => {

    if (!enviando) {
      setEnviando(true);

      servicio.actualizar(valores).then(({ data, status }) => {
        listar();
        Utileria.notifications("Se ha actualizado correctamente.", "SUCCESS");
        setValoresFormulario(inicial);
        setVista(LISTADO);
      }).catch((e) => {
        Utileria.errorhttp(e);
      }).finally(() => {
        setEnviando(false);
      });
    }
  };

  let rechazarCompra = () => {

    if (!enviando) {
      const resultado = window.confirm('¿Desea RECHAZAR la compra?');
      if (resultado) {
        setEnviando(true);

        servicio.rechazarCompra({ idCompra: valoresFormulario.idCompra }).then(({ data, status }) => {
          listar();
          Utileria.notifications("Compra rechazada correctamente.", "SUCCESS");
          setValoresFormulario(inicial);
          setVista(LISTADO);
        }).catch((e) => {
          Utileria.errorhttp(e);
        }).finally(() => {
          setEnviando(false);
        });
      } else {
        setEnviando(false);
      }

    }
  };
  let aceptarCompra = () => {

    if (!enviando) {
      const resultado = window.confirm('¿Desea ACEPTAR la compra?');
      if (resultado) {
        setEnviando(true);

        servicio.aceptarCompra({ idCompra: valoresFormulario.idCompra }).then(({ data, status }) => {
          listar();
          Utileria.notifications("Compra aceptada correctamente.", "SUCCESS");
          setValoresFormulario(inicial);
          setVista(LISTADO);
        }).catch((e) => {
          Utileria.errorhttp(e);
        }).finally(() => {
          setEnviando(false);
        });
      } else {
        setEnviando(false);
      }

    }
  };


  const guardar = (valores) => {
    switch (vista) {
      case REGISTRO:
        registrar(valores);
        break;
      case MODIFICACION:
        actualizar(valores);
        break;
      default:
        break;
    }
  };



  const formularioFormik = (props) => {
    const { errors, touched, isValid, values, setValues, setFieldValue } = props;
    let cancelar = () => {
      setValoresFormulario(inicial)
      setVista(LISTADO);
    };

    return (
      <div>

        <Formulario errors={errors} touched={touched} values={values} isValid={isValid} setValues={setValues} setFieldValue={setFieldValue} />

        <div className="text-center">
          <Button className="mt-4 hand m-3"
            color="warning" type="button"
            onClick={() => { cancelar() }}
            disabled={enviando}>
            <i className="pe-7s-back-2" /> Cancelar
          </Button>
          <Button className="mt-4 hand m-3"
            color="success" type="submit"
            onClick={() => { guardar(values) }}
            disabled={!(isValid) || enviando}>
            {/* disabled={!(isValid && Utileria.nonEmptyObject(touched)) || enviando}> */}
            {enviando ? 'Guardando...' : 'Guardar'} <i className="pe-7s-diskette" />
          </Button>
        </div>
      </div>
    );
  };

  const formularioVisualizacion = () => {
    let cancelar = () => {
      setValoresFormulario(inicial)
      setVista(LISTADO);
    };

    const descargarComprobante = (pago) => {

      const {formato, imagen} = pago.comprobante
      const fileName = `PAGO_${pago.clave}.${formato}`;
      let type = `image/${formato}`;
      if(formato.includes('pdf')){
         type = `application/pdf`;
      }

      console.log(pago.comprobante);

      const base64String = imagen;
      // Convertir el string base64 a datos binarios
      const byteCharacters = window.atob(unescape(encodeURIComponent(base64String)));
      // const byteCharacters = window.atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      // Crear un blob con los datos binarios
      const blob = new Blob([byteArray], { type: type }); // Cambiar 'image' a 'application' para PDFs

      // Crear un objeto URL para el blob
      const url = URL.createObjectURL(blob);

      // Crear un enlace y simular un clic para iniciar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      // Liberar el objeto URL
      URL.revokeObjectURL(url);

    };

    const { persona, fechaCompra, total, status, montoPagado, compra_producto, idCompra, pagos } = valoresFormulario;


    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>

        <Row className='mb-2'>
          <Col md={8}>
            <h5><strong> <i className="pe-7s-ticket" style={{ fontSize: 20, marginRight: '10px' }} /> Compra No. {idCompra}</strong></h5>
          </Col>
          <Col md={4}>
            {
              constantes.ESTATUS_EN_PROCESO === status?.nombre ? (<Button onClick={() => rechazarCompra()} className="my-2 border-0 btn-transition" color="danger" disabled={enviando}>
                <i className="pe-7s-close-circle" style={{ fontSize: 21 }} /> RECHAZAR
              </Button>) : ''
            }
            {
              constantes.ESTATUS_EN_PROCESO === status?.nombre || constantes.ESTATUS_RECHAZADO === status?.nombre ?
                (<Button onClick={() => aceptarCompra()} className="my-2 me-2 border-0 btn-transition mx-lg-4" color="success" disabled={enviando}>
                  <i className="pe-7s-like2" style={{ fontSize: 21 }} /> ACEPTAR
                </Button>) : ''
            }
          </Col>
        </Row>
        <hr></hr>
        <Row className="mt-4 justify-content-center" >
          <Col >
            <h5>
              <strong ><Label>Nombre: </Label></strong>
              <span style={{ marginLeft: '10px' }}>
                {`${persona?.nombre} ${persona?.primerApellido} ${persona?.segundoApellido ? ' ' + persona?.segundoApellido : ''}`}
              </span>
            </h5>
          </Col>
          <Col >
            <h5>
              <strong ><Label>Fecha de actualización: </Label></strong>
              <span style={{ marginLeft: '10px' }}>
                {Utileria.formatDateTime(fechaCompra)}
              </span>
            </h5>
          </Col>
          <Col md={2}>
            <h5><strong ><Label>Total: </Label></strong>
              <span style={{ marginLeft: '10px' }}>
                {`${Utileria.formatMoney(total)}`}
              </span></h5>
          </Col>
          <Col md={2}>
            <h5><strong ><Label>Monto pagado: </Label></strong>
              <span style={{ marginLeft: '10px' }}>
                {`${Utileria.formatMoney(montoPagado)}`}
              </span></h5>
          </Col>
          <Col md={2}>
            <h5><strong ><Label>Estatus: </Label></strong>
              <span style={{ marginLeft: '10px' }}>
                {status?.nombre}
              </span></h5>
          </Col>
        </Row>
        <hr></hr>
        <Row className='mb-2 mt-4'>
          <Col>
            <h5><strong><i className="pe-7s-cash" style={{ fontSize: 20, marginRight: '10px' }} />Pagos</strong></h5>
          </Col>
        </Row>
        {!enviando ? (pagos.map((item) => {
          return (<div>
            <Row>
              <Col >
                <div>
                  <strong ><Label>Fecha de pago: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {Utileria.formatDateTime(item.fechaPago)}
                  </span>
                </div>


              </Col>
              <Col>
                <div>
                  <strong ><Label>Clave: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {item.clave}
                  </span>
                </div>

              </Col>
              <Col>
                <div>
                  <strong ><Label>Monto: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {Utileria.formatMoney(item.monto)}
                  </span>
                </div>
              </Col>

              <Col>
                <div>
                  {item.comprobante ? (<Button style={{ marginLeft: '10px' }} onClick={() => descargarComprobante(item)} className=" btn-transition" color="danger" disabled={enviando}>
                    <i className="pe-7s-cloud-download" />
                  </Button>) : (<small>Sin comprobante</small>)}
                </div>

              </Col>

            </Row>
            <hr />
          </div>)
        })) : ''}

        {!enviando && compra_producto.length == 0 ? <Row><Col>Sin pagos realizados.</Col></Row> : ''}

        <Row className='mb-2 mt-4'>
          <Col>
            <h5><strong><i className="pe-7s-cart" style={{ fontSize: 20, marginRight: '10px' }} />Productos</strong></h5>
          </Col>
        </Row>
        {enviando ? (<Row>
          <Col md={{ size: 5, offset: 4 }}>
            <img src={require('../../assets/images/loading.gif')} alt=" " height="80%" />
          </Col>
        </Row>) : ''}

        {!enviando ? (compra_producto.map((item) => {
          return (<div>
            <Row>
              <Col md={{ offset: 3, size: 3 }}>
                <div>
                  <strong ><Label>Producto: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {item.stock?.producto.nombre}
                  </span>
                </div>
                <div>
                  <strong ><Label>Cantidad: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {item.cantidad}
                  </span>
                </div>
                <div>
                  <strong ><Label>Precio: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {Utileria.formatMoney(item.stock.precio)}
                  </span>
                </div>
                <div>
                  <strong ><Label>Subtotal: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {Utileria.formatMoney(item.total)}
                  </span>
                </div>
                <div>
                  <strong ><Label>Talla: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {item.stock?.talla.nombre}
                  </span>
                </div>
                <div>
                  <strong ><Label>Color: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {item.stock?.color ? (<span style={{ backgroundColor: item.stock.color.color, borderRadius: '8px', padding: '5px' }}>
                      {item.stock.color.color}</span>) : '- - -'
                    }
                  </span>
                </div>

                <div>
                  <strong ><Label>Existencia: </Label></strong>
                  <strong style={{ marginLeft: '10px' }} className='text-success'>
                    {item.stock.existencia}
                  </strong>
                </div>
                <div>
                  <strong ><Label>Comentario: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {item.comentario || ' - - -'}
                  </span>
                </div>
              </Col>
              <Col md={3}>
                {item.stock.producto.imagenes.length > 0 && (
                  <div style={{ maxWidth: '200px', width: '100%', margin: 'auto' }}>
                    <Slider {...settings}>
                      {item.stock.producto.imagenes.map((image, index) => (
                        <img
                          src={image}
                          alt={`Preview ${index}`}
                          style={{ height: 50, objectFit: 'cover' }}
                        />

                      ))}
                    </Slider>
                  </div>
                )}
              </Col>
            </Row>
            <hr />
          </div>)
        })) : ''}

        {!enviando && compra_producto.length == 0 ? <Row><Col>Sin resultados disponibles.</Col></Row> : ''}









        <div className="text-center">
          <Button className="mt-4 hand m-3"
            color="warning" type="button"
            onClick={() => { cancelar() }}
            disabled={enviando}>
            <i className="pe-7s-back-2" /> Volver
          </Button>
        </div>
      </div>
    );
  };

  const vistaListado = () => {
    if (vista === LISTADO) {
      return (
        <Card className="main-card mb-3">
          <div style={{ marginLeft: 40, marginTop: 40 }} className='row'>
            <Col md="10">
              <PageTitle
                className="col-10"
                heading={cabecera.titulo}
                subheading={cabecera.descripcion}
                icon={cabecera.icono || "pe-7s-tools"}
              />
            </Col>
            <Col md="2">
              <CardTitle className="text-center mt-2">
                {ocultarRegistro ? '' :
                  <i className="pe-7s-plus btn-outline-2x hand col-2" style={{ fontSize: '2.5em' }} size="lg" onClick={() => setVista(REGISTRO)} />


                }
              </CardTitle>
            </Col>
          </div>
          <CardBody>
            <Tabla columnas={columnas} registros={registros} />
          </CardBody>
        </Card>)
    }
    return "";
  };

  const vistaFormulario = () => {

    if (vista === REGISTRO || vista === MODIFICACION) {
      return (
        <Card className="main-card mb-3">
          <div style={{ marginLeft: 40, marginTop: 40 }} className='row'>
            <Col md="12">
              <PageTitle
                className="col-10"
                heading={cabecera.titulo}
                subheading={cabecera.descripcion}
                icon={cabecera.icono || "pe-7s-tools"}
              />
              <hr />
            </Col>

          </div>
          <CardBody className='mt-1'>

            <div className="ml-8 mr-8">
              <Formik initialValues={valoresFormulario} validationSchema={validaciones} >
                {formularioFormik}
              </Formik>
            </div>
          </CardBody>
        </Card>)
    } else if (vista === VISUALIZACION) {
      return (
        <Card className="main-card mb-3">
          <div style={{ marginLeft: 40, marginTop: 40 }} className='row'>
            <Col md="12">
              <PageTitle
                className="col-10"
                heading={cabecera.titulo}
                subheading={cabecera.descripcion}
                icon={cabecera.icono || "pe-7s-tools"}
              />
              <hr />
            </Col>

          </div>
          <CardBody className='mt-1'>

            <div className="ml-8 mr-8">
              {formularioVisualizacion()}
            </div>
          </CardBody>
        </Card>)
    }
    return "";
  };

  useEffect(() => {
    listar();
    setValoresFormulario(inicial);
  }, []);


  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Fragment>
              <TransitionGroup>
                <CSSTransition component="div" appear={true} timeout={0} enter={false} exit={false}>
                  <div>
                    <div>
                      <Row>
                        <Col lg="12">
                          {vistaListado()}
                          {vistaFormulario()}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Crud;
