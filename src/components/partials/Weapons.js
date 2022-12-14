// import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import useCollapse from 'react-collapsed'

export default function Weapons(props){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({})
    const [msg, setMsg] = useState('')

    const deleteWeaponRoute = async () =>{
        try {
            console.log('Weapon delete')
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/characters/${props.characterId}/weapons/${props.weapon._id}`, options)
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
    
    const deleteWeapon = async e => {
        e.preventDefault()
        await deleteWeaponRoute()
        await props.getCharacter()
    }

    const weaponEdit = ()=>{
        if(editing === false){
            return(
                <div className='expand'>
                    <button {...getToggleProps()} className='weapon-expand-button'>
                        {isExpanded ? `Weapon: ${form.name}  |   Damage: ${form.damage}  |  Type: ${form.type}` : `Weapon: ${form.name}  |  Damage: ${form.damage}  |  Type: ${form.type}`}
                    </button>
                    <section {...getCollapseProps()} className='weapon' >Description: {form.note} ????<div><button onClick={edit} className='editweaponbutton'>{editing ? 'save' : 'edit'}</button></div></section>
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
                    <button onClick={edit} className='editweaponbutton'>{editing ? 'save' : 'edit'}</button>
                    <button onClick={deleteWeapon} className='editweaponbutton'>delete</button>
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
            {weaponEdit()} 
            
        </div>
    )
}




