import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CharacterSheet(){
    const [msg, setMsg] = useState('')
    const [form, setForm] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const getCharacter = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}`, options)
                const character = response.data
                console.log(character)
                
                setForm(character)
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
                const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}`,form, options)
            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.message)
                }
            }
        }
        setCharacter()

    }, [form])

    console.log(form)
    return(
        <div>
            <h1>CharacterSheet Page</h1>
            <form>
                <div>
                    <label htmlFor='name'><h2>Name:</h2></label>
                    <input 
                        type='text'
                        id='name'
                        value={form.name}
                        // placeholder='Add your goal here'
                        onChange={e => setForm ({ ...form, name: e.target.value})}
                        />
                </div>
                <div>
                    <label htmlFor='race'><h2>Race:</h2></label>
                    <input 
                        type='text'
                        id='race'
                        value={form.race}
                        // placeholder='Add direct URL'
                        onChange={e => setForm ({ ...form, race: e.target.value})}
                        />
                </div>
                <div>
                    <label htmlFor='class'><h2>class:</h2></label>
                    <input 
                        type='text'
                        id='class'
                        value={form.class}
                        placeholder='Thoughts? Ideas? Concerns?'
                        onChange={e => setForm ({ ...form, class: e.target.value})}
                        />
                </div>

                <button type='submit'><h2>Submit edits</h2></button>

            </form>
        </div>
    )
}