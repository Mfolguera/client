import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import { toast } from "react-toastify";
import "./RegisterForm.scss";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("Tu nombre es obligatorio"),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre de usuario tiene carácteres no válidos"
        )
        .required(),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "La contraseña no coincide"),
      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "La contraseña no coincide"),
    }),
    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;

        const result = await register({
          variables: {
            input: newUser,
          },
        });

        console.log(result);
        toast.success("Usuario registrado correctamente");
        setShowLogin(true);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Registrate para ver fotos y videos de tus amigos.
      </h2>
      <Form
        className="register-form"
        onSubmit={formik.handleSubmit}
        validateOnBlur
      >
        <Form.Input
          type="text"
          placeholder="Nombre y apellidos"
          name="name"
          onChange={formik.handleChange}
          error={formik.errors.name}
        ></Form.Input>
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          error={formik.errors.username}
        ></Form.Input>
        <Form.Input
          type="text"
          placeholder="Correo electronico"
          name="email"
          onChange={formik.handleChange}
          error={formik.errors.email}
        ></Form.Input>
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
        ></Form.Input>
        <Form.Input
          type="password"
          placeholder="Repetir contraseña"
          name="repeatPassword"
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword}
        ></Form.Input>
        <Button className="btn-submit">Registrarse</Button>
      </Form>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
