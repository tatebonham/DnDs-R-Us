// import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Weapons(props){
    const [deleteState, setDelete] = useState()
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({})
    const [msg, setMsg] = useState('')

    useEffect(() => {
        const getCharacter = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/weapons/${props.weapon._id}`, options)
                const weapon = response.data
                
                setForm(weapon)
            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.message)
                }
            }
        }
        getCharacter()

    }, [])

    useEffect(() => {
        const setCharacter = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                
                const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/weapons/${props.weapon._id}`,form, options)
            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.message)
                }
            }
        }
        setCharacter()
    }, [form])
    const deleteWeapon = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/weapons/${props.weapon._id}`, options)
            setDelete()
            setEditing(false)
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.message)
            }
        }
        setEditing(false)
    }
    const weaponEdit = ()=>{
        if(editing === false){
            return(
                <div>
                    <p>Name: {form.name}, Damage: {form.damage}, Type: {form.type}, Note: {form.note}</p>
                </div>
            )
        } else{
            return(
                <div>
                    <form>
                        <input 
                            type='text'
                            id='name'
                            placeholder='name'
                            value={form.name}
                            onChange={e => setForm ({ ...form, name: e.target.value})}
                            
                        />
                        <input 
                            type='text'
                            id='damage'
                            placeholder='damage'
                            value={form.damage}
                            onChange={e => setForm ({ ...form, damage: e.target.value})}
                            
                        />
                        <input 
                            type='text'
                            id='type'
                            placeholder='type'
                            value={form.type}
                            onChange={e => setForm ({ ...form, type: e.target.value})}
                            
                        />
                        <input 
                            type='text'
                            id='note'
                            placeholder='note'
                            value={form.note}
                            onChange={e => setForm ({ ...form, note: e.target.value})}
                            
                        />
                    </form>
                    <button onClick={deleteWeapon} >delete</button>
                </div>
            )
        }
    }
    const edit = async e => {
        e.preventDefault()
        try {
            if(editing === true){
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
            {weaponEdit()} <button onClick={edit} >{editing ? 'save' : 'edit'}</button>
            
        </div>
    )
}




