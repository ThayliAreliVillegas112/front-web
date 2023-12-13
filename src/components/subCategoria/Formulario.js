import React, { useState, useEffect } from "react";
import { Label, InputGroup, FormGroup, Row, Col, UncontrolledCarousel } from "reactstrap";
import { Form, Field, ErrorMessage, Formik } from "formik";
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Utileria from "../../util";
import CategoriaService from "../../services/CategoriaService";

const Formulario = (props) => {
    let { errors, touched, setValues, values, } = props;

    const [categorias, setCategorias] = useState([]);

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

    const listarCategorias = () => {
        CategoriaService.listar().then(({ data }) => {
            setCategorias(data);
        }).catch((e) => {
            Utileria.errorhttp(e);
        });
    };


    useEffect(() => {
        listarCategorias();
        values.imagenes && setEstadoFormulario((prevState) => ({
            ...prevState,
            imagenes: values.imagenes
        }));


    }, []);



    return (
        <>

            <Form role="form" >

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
                        <FormGroup
                            className={Utileria.claseInputForm(
                                errors.categoriaId,
                                touched.categoriaId
                            )}
                        >
                            <Label htmlFor="categoriaId">Categoría:</Label>
                            <InputGroup className="input-group-alternative">
                                <Field
                                    className="form-control"
                                    placeholder="Ingrese..."
                                    id="categoriaId"
                                    name="categoriaId"
                                    type="number"
                                    autoComplete="off"
                                    required
                                    as="select"
                                >
                                    <option value="">Seleccione...</option>
                                    {categorias.map((item) => (
                                        <option
                                            key={item.idCategoria}
                                            value={item.idCategoria}
                                        >
                                            {item.nombre}
                                        </option>
                                    ))}
                                </Field>
                            </InputGroup>
                            <ErrorMessage
                                name="categoriaId"
                                component={() => (
                                    <small className="text-danger">{errors.categoriaId}</small>
                                )}
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
const yourBtnStyle = {
    position: 'relative',
    top: '150px',
    fontFamily: 'calibri',
    width: '150px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px dashed #BBB',
    textAlign: 'center',
    backgroundColor: '#DDD',
    cursor: 'pointer',
};

const labelStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
};