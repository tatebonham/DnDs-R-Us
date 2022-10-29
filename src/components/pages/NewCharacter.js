 import {  useState } from 'react'
 import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function NewCharacter(){
    const [msg, setMsg] = useState('')
    const [form, setForm] = useState({
        name: '',
        race: '',
        class: '',
        subclass: '',
        level: 0
    })
    const navigate = useNavigate()
    

    const handleSubmit = async e => {   
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/characters`, form, options)
            console.log(response.data)
            console.log(form)
            navigate('/mycharacters')
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.message)
            }
        }
    }
    
    
    return(
        <div className='grid-container'>
            <h1>CharacterSheet Page</h1>
            {msg}
            <form onSubmit={handleSubmit} >
                    <label htmlFor='name'><h2>Name:</h2></label>
                    <input 
                        type='text'
                        id='name'
                        value={form.name}
                        placeholder='Character Name'
                        onChange={e => setForm ({ ...form, name: e.target.value})}
                        />
                    <label htmlFor='race'><h2>Race:</h2></label>
                    <input 
                        type='text'
                        id='race'
                        value={form.race}
                        placeholder='Character Race'
                        onChange={e => setForm ({ ...form, race: e.target.value})}
                        />
                    <label htmlFor='class'><h2>class:</h2></label>
                    <input 
                        type='text'
                        id='class'
                        value={form.class}
                        placeholder='Character Class'
                        onChange={e => setForm ({ ...form, class: e.target.value})}
                        />
                    <label htmlFor='subclass'><h2>subclass:</h2></label>
                    <input 
                        type='text'
                        id='subclass'
                        value={form.subclass}
                        placeholder='Character Subclass'
                        onChange={e => setForm ({ ...form, subclass: e.target.value})}
                        />
                    <label htmlFor='level'><h2>level:</h2></label>
                    <input 
                        type='number'
                        id='level'
                        value={form.level}
                        placeholder='Character Level'
                        onChange={e => setForm ({ ...form, level: e.target.value})}
                        />
                <button type='submit'><h2>Save</h2></button>
            </form>
                

        </div>
    )
}