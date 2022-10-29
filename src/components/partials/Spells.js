// import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Spells(props){
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({})
    const [msg, setMsg] = useState('')

    const deleteSpellRoute = async () =>{
        try {
            console.log('Spell delete')
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/spells/${props.spell._id}`, options)
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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/spells/${props.spell._id}`, options)
                const spell = response.data
                
                setForm(spell)
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
            
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/spells/${props.spell._id}`,form, options)
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.message)
            }
        }
    }
    
    const deleteSpell = async e => {
        e.preventDefault()
        await deleteSpellRoute()
        await props.getCharacter()
    }

    const spellEdit = ()=>{
        if(editing === false){
            return(
                <div>
                    <p>Level: {form.level}, Name: {form.name}, Note: {form.note}</p>
                </div>
            )
        } else{
            return(
                <div>
                    <form>
                        <input 
                            type='text'
                            id='level'
                            placeholder='level'
                            value={form.level}
                            onChange={e => setForm ({ ...form, level: e.target.value})}
                            
                        />
                        <input 
                            type='text'
                            id='name'
                            placeholder='name'
                            value={form.name}
                            onChange={e => setForm ({ ...form, name: e.target.value})}
                            
                        />
                        <input 
                            type='text'
                            id='note'
                            placeholder='note'
                            value={form.note}
                            onChange={e => setForm ({ ...form, note: e.target.value})}
                            
                        />
                    </form>
                    <button onClick={deleteSpell} >delete</button>
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
            {spellEdit()} <button onClick={edit} >{editing ? 'save' : 'edit'}</button>
            
        </div>
    )
}


