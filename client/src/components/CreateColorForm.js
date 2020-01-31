import React, { useState } from 'react'

import { authios } from '../utils/authios';

const CreateColorForm = (props) =>{
    const [color, setColor] = useState({
        color: '',
        code: {hex:''},
        id: Date.now()
    })

    const postColor = e =>{
        e.preventDefault()
        authios().post('/api/colors', {
            color: color.color,
            code: color.code,
            id: color.id
            
        }).then(
            res => {
                console.log(res, 'posted new color')
            }
        ).catch(
            error => console.log(error)
        )

        const copy = props.state.map((elm)=>{
                return elm
            })
        let newArray = copy.push(color)
            console.log(copy)
        props.updateColors(copy)
    }

    const handelChange = (event) => {
        setColor({...color, [event.target.name]: event.target.value})
    }

    const handleHex = (event) =>{
        console.log(event.target.name)
        setColor({...color, code:{[event.target.name]: event.target.value}})
    }

    console.log(props)

    return(
        <form onSubmit={event => postColor(event)}>
        <label>
            Name:
            <input type="text" name="color" value={color.color} onChange={event =>handelChange(event)} required/>
        </label>
        <label>
            Hex Code:
            <input type="text" name="hex" value={color.code.hex} onChange={event => handleHex(event)} required/>
        </label>
        <button type="submit">ADD A NEW COLOR</button>
    </form>
    )

}

export default CreateColorForm