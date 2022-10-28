import { useParams } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import Weapons from '../partials/Weapons'

export default function CharacterSheet(){
    const [weaponForm, setWeaponForm] = useState({
        name: '',
        damage: '',
        type: '',
        note: ''
    })
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
                console.log(character.weapons)
                
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

    const handleSubmit = async e => {   
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}/weapons`, weaponForm, options)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.message)
            }
        }
    }
    const proficiencyBonus = () =>{
        if(form.level >= 1 && form.level <= 4){
            return '+2'
        } else if(form.level >= 5 && form.level <= 8){
            return '+3'
        } else if(form.level >= 5 && form.level <= 8){
            return '+3'
        } else if(form.level >= 9 && form.level <= 12){
            return '+4'
        } else if(form.level >= 13 && form.level <= 16){
            return '+5'
        } else if(form.level >= 17 && form.level <= 20){
            return '+6'
        }
    }
    console.log(form.weapons)
//    const weaponsList = form.weapons.map(weapon =>{
//         return(
//             <Weapons weapon={weapon} form={form} setForm={setForm} />
//         )
//    })
    
    return(
        <div className='grid-container'>
            <h1>CharacterSheet Page</h1>
            {msg}
            <form>
                <div className='character-header'>
                    <img src={form.img_url} width={200} alt={form.name} ></img>
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
                        <label htmlFor='inpiration'><h2>inpiration: </h2></label>
                        <input 
                            type='number'
                            id='inpiration'
                            value={form.inpiration}
                            placeholder='inpiration'
                            onChange={e => setForm ({ ...form, inpiration: e.target.value})}
                        />
                        <h3>ProficiencyBonus: {proficiencyBonus()}</h3>
                        <div className='skills-chart'>
                            Skills
                        </div>
                </div>
                <div className='combat-info'>
                        <label htmlFor='armor'><h2>armor: </h2></label>
                        <input 
                            type='number'
                            id='armor'
                            value={form.armor}
                            placeholder='armor'
                            onChange={e => setForm ({ ...form, armor: e.target.value})}
                        />
                        <label htmlFor='initiative'><h2>initiative: </h2></label>
                        <input 
                            type='number'
                            id='initiative'
                            value={form.initiative}
                            placeholder='initiative'
                            onChange={e => setForm ({ ...form, initiative: e.target.value})}
                        />
                        <label htmlFor='speed'><h2>speed: </h2></label>
                        <input 
                            type='number'
                            id='speed'
                            value={form.speed}
                            placeholder='speed'
                            onChange={e => setForm ({ ...form, speed: e.target.value})}
                        />
                        <label htmlFor='maxhealth'><h2>maxhealth: </h2></label>
                        <input 
                            type='number'
                            id='maxhealth'
                            value={form.maxhealth}
                            placeholder='maxhealth'
                            onChange={e => setForm ({ ...form, maxhealth: e.target.value})}
                        />
                        <label htmlFor='temporaryhealth'><h2>temporaryhealth: </h2></label>
                        <input 
                            type='number'
                            id='temporaryhealth'
                            value={form.temporaryhealth}
                            placeholder='temporaryhealth'
                            onChange={e => setForm ({ ...form, temporaryhealth: e.target.value})}
                        />
                        <label htmlFor='currenthealth'><h2>currenthealth: </h2></label>
                        <input 
                            type='number'
                            id='currenthealth'
                            value={form.currenthealth}
                            placeholder='currenthealth'
                            onChange={e => setForm ({ ...form, currenthealth: e.target.value})}
                        />
                        <label htmlFor='totalhitdice'><h2>totalhitdice: </h2></label>
                        <input 
                            type='number'
                            id='totalhitdice'
                            value={form.totalhitdice}
                            placeholder='totalhitdice'
                            onChange={e => setForm ({ ...form, totalhitdice: e.target.value})}
                        />
                        <label htmlFor='currenthitdice'><h2>currenthitdice: </h2></label>
                        <input 
                            type='number'
                            id='currenthitdice'
                            value={form.currenthitdice}
                            placeholder='currenthitdice'
                            onChange={e => setForm ({ ...form, currenthitdice: e.target.value})}
                        />
                </div>
                <div className='proficiencies'>
                    
                </div>
            </form>
            <div className='weapons'>
                {/* {weaponsList} */}
                <form onSubmit={handleSubmit} >
                <input 
                    type='text'
                    id='name'
                    placeholder='name'
                    value={weaponForm.name}
                    onChange={e => setWeaponForm ({ ...weaponForm, name: e.target.value})}
                       
                />
                <input 
                    type='text'
                    id='damage'
                    placeholder='damage'
                    value={weaponForm.damage}
                    onChange={e => setWeaponForm ({ ...weaponForm, damage: e.target.value})}
                       
                />
                <input 
                    type='text'
                    id='type'
                    placeholder='type'
                    value={weaponForm.type}
                    onChange={e => setWeaponForm ({ ...weaponForm, type: e.target.value})}
                       
                />
                <input 
                    type='text'
                    id='note'
                    placeholder='note'
                    value={weaponForm.note}
                    onChange={e => setWeaponForm ({ ...weaponForm, note: e.target.value})}
                       
                />
                
                <button type='submit'>Add Weapon</button>
            </form>
            </div>  
                

        </div>
    )
}