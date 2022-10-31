import { useEffect, useState } from 'react'
import axios from 'axios'
import useCollapse from 'react-collapsed'

export default function Attacks(props){
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({})
    const [msg, setMsg] = useState('')
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const deleteAttackRoute = async () =>{
        try {
            console.log('Attack delete')
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/attacks/${props.attack._id}`, options)
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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/attacks/${props.attack._id}`, options)
                const attack = response.data
                
                setForm(attack)
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
            
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/attacks/${props.attack._id}`,form, options)
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.message)
            }
        }
    }
    
    const deleteAttack = async e => {
        e.preventDefault()
        await deleteAttackRoute()
        await props.getCharacter()
    }

    const attackEdit = ()=>{
        if(editing === false){
            return(
                <div className='expand-attack'>
                <button {...getToggleProps()} className='attacknote'>
                    {isExpanded ? `${form.note}` : `${form.note}`}
                </button>
                <section {...getCollapseProps()}><div><button onClick={edit} className='edit-attack-button' >{editing ? 'save' : 'edit'}</button></div></section>       
            </div>
            )
        } else{
            return(
                <div>
                    <form>
                        <input 
                            type='text'
                            id='note'
                            placeholder='note'
                            value={form.note}
                            onChange={e => setForm ({ ...form, note: e.target.value})}
                            
                        />
                    </form>
                    <button onClick={edit} >{editing ? 'save' : 'edit'}</button>
                    <button onClick={deleteAttack} >delete</button>
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
            {attackEdit()} 
            
        </div>
    )
}
