import React, { Fragment, useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Row, Col, Card, CardBody, Button, CardTitle, Label } from 'reactstrap';
import Slider from 'react-slick';
import { Formik, useFormik, Field } from "formik";
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import PageTitle from '../../Layout/AppMain/PageTitle';
import Utileria from '../../util';



const Crud = (props) => {

  let { cabecera, columnas, servicio, Formulario, inicial, validaciones, ocultarRegistro } = props;


  const [enviando, setEnviando] = useState(false);
  let [valoresFormulario, setValoresFormulario] = useState({});

  
  let obtenerMiCarrito = () => {

    if (!enviando) {

      setEnviando(true);

      servicio.obtenerMiCarrito().then(({ data }) => {
        setValoresFormulario(data);
      }).catch((e) => {
        Utileria.errorhttp(e);
      }).finally(() => {
        setEnviando(false);
      });

    }
  };


  const formularioVisualizacion = () => {
    let cancelar = () => {
      setValoresFormulario(inicial)
      setVista(LISTADO);
    };

    const { persona, fechaActualizacion, total, carrito_producto } = valoresFormulario;


    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>

        <Row className='mb-2 mt-4'>
          <Col>
            <h5><strong><i className="pe-7s-cart" style={{ fontSize: 20, marginRight: '10px' }} />Productos</strong></h5>
          </Col>
        </Row>

        {Utileria.nonEmptyList(carrito_producto) ? carrito_producto.map((item) => {
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
                  <strong ><Label>Fecha de registro: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {Utileria.formatDateTime(item.fechaRegistro)}
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
                  <strong ><Label>Precio: </Label></strong>
                  <span style={{ marginLeft: '10px' }}>
                    {Utileria.formatMoney(item.stock.precio)}
                  </span>
                </div>
                <div>
                  <strong ><Label>Existencia: </Label></strong>
                  <strong style={{ marginLeft: '10px' }} className='text-success'>
                    {item.stock.existencia}
                  </strong>
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
        }) : ""}

        {Utileria.isEmptyList(carrito_producto)? <Row><Col>Sin productos agregados.</Col></Row> : ''}

        
      </div>
    );
  };


  const vistaFormulario = () => {

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

  };

  useEffect(() => {
    obtenerMiCarrito();
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
