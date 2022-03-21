import { useField } from "formik"
import styled from "styled-components"

const SelectU = styled.select`


`


const Select = ({...props}) => {

    const [field, meta] = useField(props)
    return(
        <div>
            <SelectU {...field} {...props}/>
            {meta.touched && meta.error
            ? <div>{meta.error}</div>:null}
        </div>
    )

}

export default Select