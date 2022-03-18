import FormDiv from "../components/FormDiv"
import Card from "../components/Card"
import Input from "../components/Input"
import { Formik, Form } from "formik"
import Button from "../components/Button"
import styled from "styled-components"
import  axios  from "axios"
import Swal from "sweetalert2"
import * as Yup from "yup"


const registerSchema = Yup.object().shape({
    user: Yup.string()
      .required('Requerido'),

    password: Yup.string()
      .required('Requerido')
  });


const P = styled.p`
    font-size:30px;
    color:white;
    margin-bottom:40px;
    text-align:center;
    padding:15px;
`

const Login = () => {

    const handleSubmit = ({user, password}) => {
        let formData = {
            "user":user,
            "password":password
        }

        axios.post("http://localhost:5000/login",formData)
            .then (res => {
                if(res.data===null){
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Usuario y/o contraseña incorrecto/s',
                        showConfirmButton: true,
                        timer: 6000
                        
                      })
                }else{
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Ingreso correcto!',
                        showConfirmButton: true,
                        timer: 6000
                        
                      })
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user", res.data.user)
                    window.location = "http://localhost:3000/"
                }
                console.log(res)
                
            })
            
    }
    const registro = () =>{
        window.location = "http://localhost:3000/register"
    }

    return (
        
        
        <FormDiv>
            
            <Card>
                <P>INICIAR SESION</P>
                <Formik initialValues={{
                    user : "",
                    password : ""
                }}
                onSubmit={handleSubmit}
                validationSchema={registerSchema} 
                >
                    <Form>
                        <Input name="user" placeholder="Usuario"/>
                        <Input name="password" placeholder="Contraseña"/>
                        <Button type="submit">Ingresar</Button>
                    </Form>
                </Formik>
                <Button onClick={registro} >Registrarse</Button>
            </Card>
        </FormDiv>
       
    )
}

export default Login