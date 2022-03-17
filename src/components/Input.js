import styled from "styled-components";
import { useField } from "formik";



const Container = styled.div`
    
    width:500px;
    display:flex;
    justify-content:center;
    flex-direction:column;
    margin-bottom: 40px;
`



const InputText = styled.input`
    color:white;
    width:480px;
    font-size:20px;
    padding:10px;
    border-radius: 4px;
    border: 1px solid white;
    background-color: transparent;
    outline: none;
    caret-color:white;
    
    &::placeholder{
        color:white;
        opacity:0.8;
    }
`

const ErrorMessage = styled.div`
    color: #f50;
    height:0;
    align-self:flex-end;
    font-size:20px;
`


const Input = ({ ...props}) => {
    const [field, meta] = useField(props)
    return(

        <Container>    
            <InputText {...field} {...props} />
            {meta.touched && meta.error ? (
            <ErrorMessage>{meta.error}</ErrorMessage>
            ):null}
        </Container>
    )
}


export default Input