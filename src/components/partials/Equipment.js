import { useEffect, useState } from 'react'
import axios from 'axios'
import useCollapse from 'react-collapsed'

export default function Equipment(props){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({})
    const [msg, setMsg] = useState('')

    const deleteEquipmentRoute = async () =>{
        try {
            console.log('equipment delete')
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/equipment/${props.equipment._id}`, options)
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.message)
            }
        }
    }

    useEffect(() => {
        const getCharacter = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/equipment/${props.equipment._id}`, options)
                const equipment = response.data
                
                setForm(equipment)
            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.message)
                }
            }
        }
        getCharacter()

    }, [])

    const setCharacter = async () => {
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/equipment/${props.equipment._id}`,form, options)
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.message)
            }
        }
    }
    
    const deleteEquipment = async e => {
        e.preventDefault()
        await deleteEquipmentRoute()
        await props.getCharacter()
    }

    const equipmentEdit = ()=>{
        if(editing === false){
            return(
                <div className='expand-equipment'>
                    <button {...getToggleProps()} className='equipmentnote'>
                        {isExpanded ? `${form.note}` : `${form.note}`}
                    </button>
                    <section {...getCollapseProps()}><div><button onClick={edit} className='edit-equipment-button' >{editing ? 'save' : 'edit'}</button></div></section>       
                </div>
            )
        } else{
            return(
                <div>
                    <form>
                        <input 
                            type='text'
                            id='note'
                            placeholder='Equipment'
                            value={form.note}
                            onChange={e => setForm ({ ...form, note: e.target.value})}
                            
                        />
                    </form>
                    <button onClick={edit} >{editing ? 'save' : 'edit'}</button>
                    <button onClick={deleteEquipment} >delete</button>
                </div>
            )
        }
    }
    const edit = async e => {
        e.preventDefault()
        try {
            if(editing === true){
                setCharacter()
                setEditing(false)
            } else{
                setEditing(true)
            }
        } catch(err) {
            console.warn(err)
            if(err.response){
                setMsg(err.response.data.message)
            }
        }
    }

    

    return(
        <div>
            {msg}
            {equipmentEdit()} 
            
        </div>
    )
}
