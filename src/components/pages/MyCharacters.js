import { Link} from 'react-router-dom' 
import { useState, useEffect } from 'react'
import axios from 'axios'
import CharacterCard from '../partials/CharacterCard'

export default function MyCharacters(){
    const [characters, setCharacters] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(()=>{
        const getCharacters = async ()=>{
            try{
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/characters`, options)
                setCharacters(response.data)
                console.log(response.data)
            } catch(err){
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.message)
                }
            }
        }
        getCharacters()
    }, [])

    const characterList = characters.map((character, index) =>{
        return(
            <div key={character._id}>
                index: {index}
                <CharacterCard character={character} />
            </div>
        )
    })

    return(
        <div>
            {msg}
            {characterList}
        </div>
    )
}