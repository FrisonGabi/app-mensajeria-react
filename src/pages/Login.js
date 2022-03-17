import FormDiv from "../components/FormDiv"
import Card from "../components/Card"
import Input from "../components/Input"
import { Formik, Form } from "formik"
import Button from "../components/Button"
import styled from "styled-components"

const P = styled.p`
    font-size:30px;
    color:white;
    margin-bottom:40px;
    text-align:center;
    padding:15px;
`

const Login = () => {
    return (
        
        <FormDiv>
            <Card>
                <P>INICIAR SESION</P>
                <Formik>
                    <Form>
                        <Input name="user" placeholder="Usuario" />
                        <Input name="password" placeholder="Contraseña" />
                        <Button>Ingresar</Button>
                    </Form>
                </Formik>
                <Button>Registrarse</Button>
            </Card>
        </FormDiv>
    )
}

export default Login