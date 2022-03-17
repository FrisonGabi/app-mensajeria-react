import {Formik, Form} from "formik"
import * as Yup from "yup"
import FormDiv from "../components/FormDiv"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"
import Swal from "sweetalert2"
import styled from "styled-components"


const P = styled.p`
    font-size:30px;
    color:white;
    margin-bottom:40px;
    text-align:center;
    padding:30px;
`

const registerSchema = Yup.object().shape({
    user: Yup.string()
      .min(5, 'Usuario muy corto')
      .max(15, 'Usuario muy largo!')
      .required('Requerido'),
    name: Yup.string()
      .required('Requerido'),
    lastName: Yup.string()
      .required('Requerido'),
    password: Yup.string()
      .required('Requerido')
      
  });


const Register = () => {

    const handleSubmit =  ( {user, name, country, state, lastName, password}) =>{
        let formData = {
            "user": user,
            "name": name,
            "lastName": lastName,
            "country": country,
            "state": state,
            "password": password
        }

            fetch("http://localhost:5000/api/users",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })  
            .then(res => res.json())
            .then(data =>{

                if(data.errno===1062){
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'El usuario ya existe, intenta otro!',
                        showConfirmButton: true,
                        timer: 6000
                        
                      })
                }else{
                    
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Usuario creado con exito!',
                        showConfirmButton: true,
                        timer:6000
                        
                      })
                      window.location = "http://localhost:3000/login";
                      
                }
            })
            
    }

    return (
        <FormDiv> 
            <Card>
                <P>REGISTRO DE USUARIO</P>
                <Formik initialValues={{
                    user : "",
                    name : "",
                    lastName : "",
                    country : "", 
                    state : "", 
                    password : ""
                }}
                onSubmit={handleSubmit}
                validationSchema={registerSchema}   
                >
                    <Form>
                       <Input name="user" placeholder="Usuario"/>
                       <Input name="name" placeholder="Nombre"/>
                       <Input name="lastName" placeholder="Apellido"/>
                       <Input name="country" placeholder="Pais"/>
                       <Input name="state" placeholder="Provincia"/>
                       <Input type="password" name="password" placeholder="Contraseña"/>
                       <Button type="submit">Registrarse</Button>
                    </Form>
                </Formik>
           </Card>
        </FormDiv>
        
    )
}

export default Register