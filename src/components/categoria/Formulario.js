
import { Label, InputGroup, FormGroup, Row, Col } from "reactstrap";
import { Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import Utileria from "../../util";
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Formulario = (props) => {
    let { errors, touched, setValues, values, } = props;


    const [estadoFormulario, setEstadoFormulario] = useState({
        imagenes: []
    });


    const handleFileChange = (event) => {

        const maxAllowedFiles = 2;
        const countImages = estadoFormulario.imagenes?.length || 0;

        if (countImages > maxAllowedFiles) {
            Utileria.catchError(`Selecciona como máximo 3 archivos.`);

            setEstadoFormulario({ ...estadoFormulario, imagen: '' });
            setValues({ ...values, imagen: '' });
        } else {

            const file = event.currentTarget.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {

                const newImageBase64 = reader.result;
                let updatedImages = [...estadoFormulario.imagenes, newImageBase64];

                setEstadoFormulario({ ...estadoFormulario, imagenes: updatedImages, imagen: '' });
                setValues({ ...values, imagenes: updatedImages, imagen: '' });



            };
            reader.readAsDataURL(file);

        }


    };

    const handleRemoveImage = (index) => {

        const updatedImages = [...estadoFormulario.imagenes];

        updatedImages.splice(index, 1);


        setEstadoFormulario({ ...estadoFormulario, imagenes: updatedImages });
        setValues({ ...values, imagenes: updatedImages });

    };

    useEffect(() => {
        
        values.imagenes && setEstadoFormulario((prevState) => ({
          ...prevState,
          imagenes: values.imagenes
        }));
    
      }, []);

    return (
        <>

            <Form role="form">

                <Row>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.nombre, touched.nombre)}>
                            <Label htmlFor="nombre">Nombre:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    autoComplete="off"
                                    required
                                />
                            </InputGroup>
                            <ErrorMessage
                                name="nombre"
                                component={() => <small className="text-danger">{errors.nombre}</small>}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className={Utileria.claseInputForm(errors.descripcion, touched.descripcion)}>
                            <Label htmlFor="nombre">Descripción:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="descripcion"
                                    name="descripcion"
                                    type="text"
                                    autoComplete="off"
                                    required
                                />

                            </InputGroup>
                            <ErrorMessage
                                name="descripcion"
                                component={() => <small className="text-danger">{errors.descripcion}</small>}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-4 justify-content-center" >
                    <Col md="4" >
                        <FormGroup
                            className={Utileria.claseInputForm(errors.imagen, touched.imagen)}
                        >
                            <Label htmlFor="nombre">Imagen:</Label>
                            <InputGroup className="input-group-alternative">

                                <Field
                                    placeholder="Seleccione imagen"
                                    className="form-control"
                                    autoComplete="off"
                                    type="file"
                                    id="imagen"
                                    name="imagen"
                                    accept="image/*"
                                    onChange={(event) => handleFileChange(event)}
                                />


                            </InputGroup>
                            <ErrorMessage
                                name="imagen"
                                component={() => (
                                    <small className="text-danger">{errors.imagen}</small>
                                )}
                            />
                        </FormGroup>
                    </Col>


                </Row>
                <Row className="mt-1 justify-content-center" >
                    <Col md="12" className="justify-content-center">
                        <FormGroup>
                            <InputGroup className="input-group-alternative">

                                {values.imagenes && (
                                    values.imagenes.map((imagen, index) => {
                                        return <div className="mt-1  justify-content-center align-items-center" key={index} >

                                            <img src={imagen} alt="Imagen cargada" className="mt-2 mr-4" style={{ height: "30vh" }} />
                                            <br />
                                            <a
                                                className="text-black ml-6"
                                                onClick={() => handleRemoveImage(index)}
                                                style={{ fontSize: 24, color: "black", cursor: "pointer", marginLeft: "50%" }}
                                            >
                                                x
                                            </a>
                                        </div>
                                    })

                                )}


                            </InputGroup>

                        </FormGroup>
                    </Col>
                </Row>
            </Form>

        </>
    );
};

export default Formulario;
