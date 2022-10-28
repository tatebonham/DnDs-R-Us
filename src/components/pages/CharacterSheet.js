import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CharacterSheet(){
    const [msg, setMsg] = useState('')
    const [form, setForm] = useState({})
    const [stats, setStats] = useState({
        strength: 'strength',
        dexterity: 'dexterity',
        constitution: 'constitution',
        wisdom: 'wisdom',
        intelligence: 'intelligence',
        charisma: 'charisma',
    })
    const { id } = useParams()
    const statBlock = (stat)=>{
        if (stat === 0 || stat === 1){
            return '-5'
        } else if(stat === 2 || stat === 3){
            return '-4'
        } else if(stat === 4 || stat === 5){
            return '-3'
        } else if(stat === 6 || stat === 7){
            return '-2'
        } else if(stat === 8 || stat === 9){
            return '-1'
        } else if(stat === 10 || stat === 11){
            return '0'
        } else if(stat === 12 || stat === 13){
            return '+1'
        } else if(stat === 14 || stat === 15){
            return '+2'
        } else if(stat === 16 || stat === 17){
            return '+3'
        } else if(stat === 18 || stat === 19){
            return '+4'
        } else if(stat === 20){
            return '+5'
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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}`, options)
                const character = response.data
                // console.log(character)
                
                setForm(character)
                setStats({
                    strength: statBlock(character.strength),
                    dexterity: statBlock(character.dexterity),
                    constitution: statBlock(character.constitution),
                    wisdom: statBlock(character.wisdom),
                    intelligence: statBlock(character.intelligence),
                    charisma: statBlock(character.charisma),
                })
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
                setStats({
                    strength: statBlock(Number(form.strength)),
                    dexterity: statBlock(Number(form.dexterity)),
                    constitution: statBlock(Number(form.constitution)),
                    wisdom: statBlock(Number(form.wisdom)),
                    intelligence: statBlock(Number(form.intelligence)),
                    charisma: statBlock(Number(form.charisma)),
                })
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

   
    
    return(
        <div >
            <h1>CharacterSheet Page</h1>
            {msg}
            <form className='grid-container'>
                <div className='character-header'>
                    <img src={form.img_url} width={200}  ></img>
                    <label htmlFor='img_url'><h2>img_url:</h2></label>
                    <input 
                        type='text'
                        id='img_url'
                        value={form.img_url}
                        placeholder='Character img_url'
                        onChange={e => setForm ({ ...form, img_url: e.target.value})}
                        />
                    <label htmlFor='name'><h2>Name:</h2></label>
                    <input 
                        type='text'
                        id='name'
                        value={form.name}
                        placeholder='Character Name'
                        onChange={e => setForm ({ ...form, name: e.target.value})}
                        />
                </div>
                <div className='character-info' >
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
                    <label htmlFor='alignment'><h2>alignment:</h2></label>
                    <input 
                        type='text'
                        id='alignment'
                        value={form.alignment}
                        placeholder='Character Alignment'
                        onChange={e => setForm ({ ...form, alignment: e.target.value})}
                        />
                    <label htmlFor='background'><h2>background:</h2></label>
                    <input 
                        type='text'
                        id='background'
                        value={form.background}
                        placeholder='Character Background'
                        onChange={e => setForm ({ ...form, background: e.target.value})}
                        />
                    <label htmlFor='level'><h2>level:</h2></label>
                    <input 
                        type='number'
                        id='level'
                        value={form.level}
                        placeholder='Character Level'
                        onChange={e => setForm ({ ...form, level: e.target.value})}
                        />
                </div>
                <div className='character-stats'>
                    <label htmlFor='strength'><h2>strength: {stats.strength}</h2></label>
                    <input 
                        type='number'
                        id='strength'
                        value={form.strength}
                        placeholder='Strength'
                        onChange={e => setForm ({ ...form, strength: e.target.value})}
                        />
                    <label htmlFor='dexterity'><h2>dexterity: {stats.dexterity}</h2></label>
                    <input 
                        type='number'
                        id='dexterity'
                        value={form.dexterity}
                        placeholder='Dexterity'
                        onChange={e => setForm ({ ...form, dexterity: e.target.value})}
                        />
                    <label htmlFor='constitution'><h2>constitution: {stats.constitution}</h2></label>
                    <input 
                        type='number'
                        id='constitution'
                        value={form.constitution}
                        placeholder='Constitution'
                        onChange={e => setForm ({ ...form, constitution: e.target.value})}
                        />
                    <label htmlFor='intelligence'><h2>intelligence: {stats.intelligence}</h2></label>
                    <input 
                        type='number'
                        id='intelligence'
                        value={form.intelligence}
                        placeholder='Intelligence'
                        onChange={e => setForm ({ ...form, intelligence: e.target.value})}
                        />
                    <label htmlFor='wisdom'><h2>wisdom: {stats.wisdom}</h2></label>
                    <input 
                        type='number'
                        id='wisdom'
                        value={form.wisdom}
                        placeholder='Wisdom'
                        onChange={e => setForm ({ ...form, wisdom: e.target.value})}
                        />
                    <label htmlFor='charisma'><h2>charisma: {stats.charisma}</h2></label>
                    <input 
                        type='number'
                        id='charisma'
                        value={form.charisma}
                        placeholder='Charisma'
                        onChange={e => setForm ({ ...form, charisma: e.target.value})}
                        />
                </div>
                <div className='skills'>

                </div>
                

            </form>
        </div>
    )
}