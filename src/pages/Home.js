import { Link } from "react-router-dom"
import Navbar from "../components/Navbar";
import DivC from "../components/DivC";
import styled from "styled-components";
import {useState, useEffect} from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import Input from "../components/Input";
import Button from "../components/Button";
import * as Yup from "yup"
import Swal from "sweetalert2";
import Select from "../components/Select";

const msgSchema = Yup.object().shape({
    usuarioDestino: Yup.string()
      .required('Requerido'),

    usuarioOrigen: Yup.string()
      .required('Requerido'),
    mensaje: Yup.string()
      .required('Requerido'),

  });


const DivNoSession = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    height:100%;
`
const Card = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    gap:30px;
    background-color: #2a47b2;
    width:300px;
    height:350px;
    padding:35px 30px;
    border-radius:5px;
    box-shadow: 1px 4px 6px rgb(0,0,0,0.5);
`

const StyledLink = styled(Link)`
    text-decoration:none;
    color: #111;
    background-color: white;
    padding:15px 25px;
    border-radius:5px;
    font-weight:bold;
    margin:15px;
`
const P = styled.p`
    font-size:25px;
    margin-bottom: 150px;
`

const Div = styled.div`

    display:inline;
    margin-bottom: 50px;
`

const Card2 = styled.div`
    color: white;
    background-color: #2a47b2;
    padding: 30px 45px;
    width:auto;
    box-shadow: 1px 4px 6px rgb(0,0,0,0.5);
    border-radius:8px;
    display:flex;
    justify-content:center;
    flex-direction:column;
    
`


const DivSeleccion = styled.div`
`

const Seleccionar = styled.button`

`
const Table = styled.table`
    text-align:center;
`
const Tr = styled.tr`
    
`
const Th = styled.th`
`
const Td = styled.td`
    padding:15px;
`
const Tbody = styled.tbody`
    
`
const Thead = styled.thead`
`

const Home = () => {

    const [usuarios, setUsuarios] = useState([])
    const [mensajesEnviados, setMensajesEnviados] = useState([])
    const [mensajesRecibidos, setMensajesRecibidos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then(res => {
                const data = res.data
                setUsuarios(data.users)
            })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/users/${localStorage.getItem("user")}/messages/inbox`)
            .then(res => {
                const data = res.data
                setMensajesRecibidos(data)
               console.log(data)
            })
            
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/users/${localStorage.getItem("user")}/messages/sent`)
            .then(res => {
                const data = res.data
                setMensajesEnviados(data)
               console.log(data)
            })
            
    },[])




    const handleSubmit = ({usuarioDestino, usuarioOrigen,mensaje}) => {
        let formData = {
            "usuarioDestino":usuarioDestino,
            "usuarioOrigen":usuarioOrigen,
            "mensaje":mensaje
        }

        axios.post("http://localhost:5000/api/users/:user/messages",formData)
            .then (res =>{
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Mensaje enviado',
                    showConfirmButton: true,
                    timer: 6000
                    
                  })
                  console.log(res.data)
            })     
            
    }
    const [showEnviar, setShowEnviar] = useState(false)
    const [showRecibidos, setShowRecibidos] = useState(false)
    const [showEnviados, setShowEnviados] = useState(false)

    if(!localStorage.getItem("token")){
        return(
            
            <DivNoSession>
                <Card>                    
                    <P>DEBE INICIAR SESION</P>
                    <Div>
                        <StyledLink to="/login">INGRESAR</StyledLink>
                        <StyledLink to="/register">REGISTRO</StyledLink>
                    </Div>
                </Card>
            </DivNoSession>
            
        )
    }

    return (


        <DivC>
            <Navbar/>

            <DivSeleccion>
                <Seleccionar onClick={() =>{ 
                    setShowEnviar(true) 
                    setShowEnviados(false) 
                    setShowRecibidos(false)} 
                }>Nuevo Mensaje</Seleccionar>
                <Seleccionar onClick={() => {
                    setShowRecibidos(true) 
                    setShowEnviados(false) 
                    setShowEnviar(false) }
                    }>Mensajes Recibidos</Seleccionar>
                <Seleccionar onClick={() => {
                    setShowEnviados(true) 
                    setShowEnviar(false) 
                    setShowRecibidos(false)}
                    }>Mensajes Enviados</Seleccionar>
            </DivSeleccion>

            
                {showEnviar && (
                    <Card2>
                        <p>ENVIAR MENSAJE</p>
                    <Formik initialValues={{
                        usuarioDestino:"",
                        usuarioOrigen:localStorage.getItem("user"),
                        mensaje:""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={msgSchema}
                    >
                        <Form>
                            <Select label="usuario destino" name="usuarioDestino">
                                {usuarios.map (u => (
                                <option value={u.user} key={u.id}>{u.user.toUpperCase()}</option>
                                ))}
                            </Select>
                            <Input name="mensaje" placeholder="Escriba su mensaje..." as="textarea"/>
                            <Input name="usuarioOrigen" style={{"display":"none"}}/>
                            <Button type="submit">Enviar</Button>
                        </Form>

                    </Formik>

                    </Card2>
                )}
                
                {showRecibidos && (
                    <Card2>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Remitente</Th>
                                    <Th>Destinatario</Th>
                                    <Th>Mensaje</Th>
                                </Tr>
                            </Thead>
                            <Tbody>                               
                                    {mensajesRecibidos.map (m => (
                                        <Tr key={m.id}>
                                            <Td >{m.usuario_origen}</Td>
                                            <Td >{m.usuario_destino}</Td>
                                            <Td >{m.mensaje}</Td>
                                        </Tr>
                                    ))}                                        
                             
                            </Tbody>
                        </Table>
                    </Card2>
                )}

                {showEnviados && (
                    <Card2>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Remitente</Th>
                                    <Th>Destinatario</Th>
                                    <Th>Mensaje</Th>
                                </Tr>
                            </Thead>
                            <Tbody>                               
                                    {mensajesEnviados.map (m => (
                                        <Tr key={m.id}>
                                            <Td >{m.usuario_origen}</Td>
                                            <Td >{m.usuario_destino}</Td>
                                            <Td >{m.mensaje}</Td>
                                        </Tr>
                                    ))}                                        
                             
                            </Tbody>
                        </Table>
                    </Card2>
                )}    


            

        </DivC>
    )   
}

export default Home