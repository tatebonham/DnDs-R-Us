// import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import useCollapse from 'react-collapsed'

export default function Spells(props){
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({})
    const [msg, setMsg] = useState('')
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

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
        await props.getCharacter()
    }
    
    const deleteSpell = async e => {
        e.preventDefault()
        await deleteSpellRoute()
        await props.getCharacter()
    }

    const spellEdit = ()=>{
        if(editing === false){
            return(
                <div className='expand-spell'>
                    <button {...getToggleProps()}>
                        {isExpanded ? `Spell: ${form.name}` : `Spell: ${form.name}`}
                    </button>
                    <section {...getCollapseProps()}>Description: {form.note} ???? <div><button onClick={edit} className='edit-button' >{editing ? 'save' : 'edit'}</button></div></section>
                    
                </div>
                
            )
        } else{
            return(
                <div className='editing-form'>
                    <form>
                        <h4>Spell Level</h4>
                        <input className='editcontent'
                            type='text'
                            id='level'
                            placeholder='level'
                            value={form.level}
                            onChange={e => setForm ({ ...form, level: e.target.value})}
                            
                        />
                        <h4>Spell Name</h4>
                        <input className='editcontent'
                            type='text'
                            id='name'
                            placeholder='name'
                            value={form.name}
                            onChange={e => setForm ({ ...form, name: e.target.value})}
                            
                        />
                        <h4>Description</h4>
                        <input className='editcontent'
                            type='text'
                            id='note'
                            placeholder='note'
                            value={form.note}
                            onChange={e => setForm ({ ...form, note: e.target.value})}
                            
                        />
                    </form>
                    <button onClick={edit} className='edit-button'>{editing ? 'save' : 'edit'}</button>
                    <button onClick={deleteSpell} className='edit-button' >delete</button>
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
        <div className='spell-line'>
            {msg}
            {spellEdit()} 
            
        </div>
    )
}


