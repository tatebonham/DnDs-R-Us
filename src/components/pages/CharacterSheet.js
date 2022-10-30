import { useParams, useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import Weapons from '../partials/Weapons'
import Spells from '../partials/Spells'
import Attacks from '../partials/Attacks'

export default function CharacterSheet(){
    const [attackForm, setAttackForm] = useState({
        note: ''
    })
    const [spellForm, setSpellForm] = useState({
        level: 0,
        name: '',
        note: ''
    })
    const [weaponForm, setWeaponForm] = useState({
        name: '',
        damage: '',
        type: '',
        note: ''
    })
    const navigate = useNavigate()
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
    const getCharacter = async () => {
        try {
            console.log('getCharacter')
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

    useEffect(() => {
        getCharacter()
        console.log('Empty Dependancy')
    }, [])

    
    const setCharacter = async e => {
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
    
    useEffect(  () => {
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
        getCharacter()
        setWeaponForm({
            name: '',
            damage: '',
            type: '',
            note: ''
        })
    }
    const handleAttackSubmit = async e => {   
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}/attacks`, attackForm, options)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.message)
            }
        }
        getCharacter()
        setAttackForm({
            note: ''
        })
    }
    const handleSpellSubmit = async e => {   
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}/spells`, spellForm, options)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.message)
            }
        }
        getCharacter()
        setSpellForm({
            level: 0,
            name: '',
            note: ''
        })
    }
    
    const proficiencyBonus = () =>{
        if(form.level >= 1 && form.level <= 4){
            return 2
        } else if(form.level >= 5 && form.level <= 8){
            return 3
        } else if(form.level >= 5 && form.level <= 8){
            return 3
        } else if(form.level >= 9 && form.level <= 12){
            return 4
        } else if(form.level >= 13 && form.level <= 16){
            return 5
        } else if(form.level >= 17 && form.level <= 20){
            return 6
        }
    }
    // console.log(form.weapons)
    const weaponsList = ()=>{
        if (form.weapons !== undefined){
            return form.weapons.map((weapon, i) =>{
                return(
                    <div key={weapon._id} >
                        <Weapons getCharacter={getCharacter}  weapon={weapon} index={i} characterId={id} />
                    </div>
                
                )
        })
    }}

    const attacksList = ()=>{
        if (form.attacks !== undefined){
            return form.attacks.map((attack, i) =>{
                return(
                    <div key={attack._id} >
                        <Attacks getCharacter={getCharacter}  attack={attack} index={i} characterId={id} />
                    </div>
                
                )
        })
    }}
    
    const spellsList = (level)=>{
        if (form.spells !== undefined){
            return form.spells.map((spell, i) =>{
                if(level === spell.level){
                    return(
                        <div key={spell._id} >
                            <Spells getCharacter={getCharacter}  spell={spell} index={i} characterId={id} />
                        </div>
                    )
                }
        })
    }}
    
    const deleteCharacter = async () =>{
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}/`, options)
            navigate('/mycharacters')
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.message)
            }
        }
    }
    const toggleSkill = async (event, skill) =>{
        event.preventDefault()
        if(skill === 'acrobatics'){
            if(form.acrobatics === true){
                setForm({ ...form, acrobatics: false})
            } else {
                setForm({ ...form, acrobatics: true})
            }
        } else if(skill === 'animalhandling'){
            if(form.animalhandling === true){
                setForm({ ...form, animalhandling: false})
            } else {
                setForm({ ...form, animalhandling: true})
            }
        } else if(skill === 'arcana'){
            if(form.arcana === true){
                setForm({ ...form, arcana: false})
            } else {
                setForm({ ...form, arcana: true})
            }
        } else if(skill === 'athletics'){
            if(form.athletics === true){
                setForm({ ...form, athletics: false})
            } else {
                setForm({ ...form, athletics: true})
            }
        } else if(skill === 'deception'){
            if(form.deception === true){
                setForm({ ...form, deception: false})
            } else {
                setForm({ ...form, deception: true})
            }
        } else if(skill === 'history'){
            if(form.history === true){
                setForm({ ...form, history: false})
            } else {
                setForm({ ...form, history: true})
            }
        } else if(skill === 'insight'){
            if(form.insight === true){
                setForm({ ...form, insight: false})
            } else {
                setForm({ ...form, insight: true})
            }
        } else if(skill === 'intimidation'){
            if(form.intimidation === true){
                setForm({ ...form, intimidation: false})
            } else {
                setForm({ ...form, intimidation: true})
            }
        } else if(skill === 'investigation'){
            if(form.investigation === true){
                setForm({ ...form, investigation: false})
            } else {
                setForm({ ...form, investigation: true})
            }
        } else if(skill === 'medicine'){
            if(form.medicine === true){
                setForm({ ...form, medicine: false})
            } else {
                setForm({ ...form, medicine: true})
            }
        } else if(skill === 'nature'){
            if(form.nature === true){
                setForm({ ...form, nature: false})
            } else {
                setForm({ ...form, nature: true})
            }
        } else if(skill === 'perception'){
            if(form.perception === true){
                setForm({ ...form, perception: false})
            } else {
                setForm({ ...form, perception: true})
            }
        } else if(skill === 'performance'){
            if(form.performance === true){
                setForm({ ...form, performance: false})
            } else {
                setForm({ ...form, performance: true})
            }
        } else if(skill === 'persuasion'){
            if(form.persuasion === true){
                setForm({ ...form, persuasion: false})
            } else {
                setForm({ ...form, persuasion: true})
            }
        } else if(skill === 'religion'){
            if(form.religion === true){
                setForm({ ...form, religion: false})
            } else {
                setForm({ ...form, religion: true})
            }
        } else if(skill === 'sleight'){
            if(form.sleight === true){
                setForm({ ...form, sleight: false})
            } else {
                setForm({ ...form, sleight: true})
            }
        } else if(skill === 'stealth'){
            if(form.stealth === true){
                setForm({ ...form, stealth: false})
            } else {
                setForm({ ...form, stealth: true})
            }
        } else if(skill === 'survival'){
            if(form.survival === true){
                setForm({ ...form, survival: false})
            } else {
                setForm({ ...form, survival: true})
            }
        } 
    }

    // set skills to have a + if it is over 0
    const skillPlus = (skill) =>{
        if(proficiencyBonus() + skill > 0){
            return `+${proficiencyBonus() + skill}`
        } else {
            return `${proficiencyBonus() + skill}`
        }
    }

    return(
        <div className='grid-container'>
            {msg}
            
            {/* <button type='submit'>Save</button> */}
            {/* <button onClick={deleteCharacter}>Delete</button> */}
            <div className='character-header'>
            <form>
                <img src={form.img_url} width={200} alt='Character Profile Picture' ></img>
                <input 
                    type='text'
                    id='img_url'
                    value={form.img_url}
                    placeholder='Character img_url'
                    onChange={e => setForm ({ ...form, img_url: e.target.value})}
                    />
                <input 
                    type='text'
                    id='name'
                    value={form.name}
                    placeholder='Character Name'
                    onChange={e => setForm ({ ...form, name: e.target.value})}
                    />
                </form>
            </div>
            <div className='character-info' >
                <input 
                    type='text'
                    id='race'
                    value={form.race}
                    placeholder='Character Race'
                    onChange={e => setForm ({ ...form, race: e.target.value})}
                    />
                <input 
                    type='text'
                    id='class'
                    value={form.class}
                    placeholder='Character Class'
                    onChange={e => setForm ({ ...form, class: e.target.value})}
                    />
                
                <input 
                    type='text'
                    id='subclass'
                    value={form.subclass}
                    placeholder='Character Subclass'
                    onChange={e => setForm ({ ...form, subclass: e.target.value})}
                    />
                
                <input 
                    type='text'
                    id='alignment'
                    value={form.alignment}
                    placeholder='Character Alignment'
                    onChange={e => setForm ({ ...form, alignment: e.target.value})}
                    />

                <input 
                    type='text'
                    id='background'
                    value={form.background}
                    placeholder='Character Background'
                    onChange={e => setForm ({ ...form, background: e.target.value})}
                    />
                
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
                    <h3>ProficiencyBonus: +{proficiencyBonus()}</h3>
                    <div className='skills-chart'>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'acrobatics')}>{form.acrobatics ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.acrobatics ? skillPlus(Number(stats.dexterity)) : stats.dexterity}</u> - Acrobatics</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'animalhandling')}>{form.animalhandling ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.animalhandling ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - animalhandling</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'arcana')}>{form.arcana ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.arcana ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - arcana</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'athletics')}>{form.athletics ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.athletics ? skillPlus(Number(stats.strength)): stats.strength}</u> - athletics</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'deception')}>{form.deception ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.deception ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - deception</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'history')}>{form.history ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.history ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - history</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'insight')}>{form.insight ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.insight ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - insight</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'intimidation')}>{form.intimidation ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.intimidation ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - intimidation</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'investigation')}>{form.investigation ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.investigation ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - investigation</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'medicine')}>{form.medicine ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.medicine ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - medicine</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'nature')}>{form.nature ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.nature ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - nature</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'perception')}>{form.perception ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.perception ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - perception</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'performance')}>{form.performance ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.performance ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - performance</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'persuasion')}>{form.persuasion ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.persuasion ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - persuasion</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'religion')}>{form.religion ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.religion ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - religion</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'sleight')}>{form.sleight ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.sleight ?  skillPlus(Number(stats.dexterity)): stats.dexterity}</u> - sleight</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'stealth')}>{form.stealth ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.stealth ?  skillPlus(Number(stats.dexterity)): stats.dexterity}</u> - stealth</p>
                        </div>
                        <div className='skill-line'>
                            <button onClick={e => toggleSkill(e, 'survival')}>{form.survival ? 'Active' : 'Not Active'}</button>
                            <p><u>{form.survival ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - survival</p>
                        </div>
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
                    <h2>proficiencies</h2>
                    <input 
                        type='number'
                        id='proficiencies'
                        value={form.proficiencies}
                        placeholder='proficiencies'
                        onChange={e => setForm ({ ...form, proficiencies: e.target.value})}
                    />
            </div>
            <div className='attacksandweapons'>
                <div className='weapons'>
                    {weaponsList()}
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
                <div className='attacks'>
                    {attacksList()}
                        <div  className='add-attack'>
                            <form onSubmit={handleAttackSubmit} >
                                <input 
                                    type='text'
                                    id='note'
                                    placeholder='note'
                                    value={attackForm.note}
                                    onChange={e => setAttackForm ({ ...attackForm, note: e.target.value})}
                                />
                                
                                <button type='submit'>Add Attack</button>
                            </form>
                        </div>
                </div>   
            </div>
            <div className='spells'>
                    <div  className='add-spell'>
                        <form onSubmit={handleSpellSubmit} >
                            <input 
                                type='text'
                                id='level'
                                placeholder='level'
                                value={spellForm.level}
                            onChange={e => setSpellForm ({ ...spellForm, level: e.target.value})}
                                
                            />
                            <input 
                                type='text'
                                id='name'
                                placeholder='name'
                                value={spellForm.name}
                                onChange={e => setSpellForm ({ ...spellForm, name: e.target.value})}
                                
                            />
                            <input 
                                type='text'
                                id='note'
                                placeholder='note'
                                value={spellForm.note}
                                onChange={e => setSpellForm ({ ...spellForm, note: e.target.value})}
                                
                            />
                            
                            <button type='submit'>Add Spell</button>
                        </form>
                    </div>
                    <div className='level-zero-spells'>
                        <h2>Cantrip</h2>
                        {spellsList(0)}
                    </div>
                    <div className='level-one-spells'>
                        <form>
                            <label htmlFor='img_url'><h2>Level One Spells</h2></label>
                            <input 
                                type='number'
                                id='onetotal'
                                value={form.onetotal}
                                placeholder='Character onetotal'
                                onChange={e => setForm ({ ...form, onetotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='oneremaining'
                                value={form.oneremaining}
                                placeholder='Character oneremaining'
                                onChange={e => setForm ({ ...form, oneremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(1)}
                    </div>
                    <div className='level-two-spells'>
                        <form>
                            <h2>Level two Spells</h2>
                            <input 
                                type='number'
                                id='twototal'
                                value={form.twototal}
                                placeholder='Character twototal'
                                onChange={e => setForm ({ ...form, twototal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='tworemaining'
                                value={form.tworemaining}
                                placeholder='Character tworemaining'
                                onChange={e => setForm ({ ...form, tworemaining: e.target.value})}
                                />
                        </form>
                        {spellsList(2)}
                    </div>
                    <div className='level-three-spells'>
                        <form>
                            <h2>Level three Spells</h2>
                            <input 
                                type='number'
                                id='threetotal'
                                value={form.threetotal}
                                placeholder='Character threetotal'
                                onChange={e => setForm ({ ...form, threetotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='threeremaining'
                                value={form.threeremaining}
                                placeholder='Character threeremaining'
                                onChange={e => setForm ({ ...form, threeremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(3)}
                    </div>
                    <div className='level-four-spells'>
                        <form>
                            <h2>Level four Spells</h2>
                            <input 
                                type='number'
                                id='fourtotal'
                                value={form.fourtotal}
                                placeholder='Character fourtotal'
                                onChange={e => setForm ({ ...form, fourtotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='fourremaining'
                                value={form.fourremaining}
                                placeholder='Character fourremaining'
                                onChange={e => setForm ({ ...form, fourremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(4)}
                    </div>
                    <div className='level-five-spells'>
                        <form>
                            <h2>Level five Spells</h2>
                            <input 
                                type='number'
                                id='fivetotal'
                                value={form.fivetotal}
                                placeholder='Character fivetotal'
                                onChange={e => setForm ({ ...form, fivetotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='fiveremaining'
                                value={form.fiveremaining}
                                placeholder='Character fiveremaining'
                                onChange={e => setForm ({ ...form, fiveremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(5)}
                    </div>
                    <div className='level-six-spells'>
                        <form>
                            <h2>Level six Spells</h2>
                            <input 
                                type='number'
                                id='sixtotal'
                                value={form.sixtotal}
                                placeholder='Character sixtotal'
                                onChange={e => setForm ({ ...form, sixtotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='sixremaining'
                                value={form.sixremaining}
                                placeholder='Character sixremaining'
                                onChange={e => setForm ({ ...form, sixremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(6)}
                    </div>
                    <div className='level-seven-spells'>
                        <form>
                            <h2>Level seven Spells</h2>
                            <input 
                                type='number'
                                id='seventotal'
                                value={form.seventotal}
                                placeholder='Character seventotal'
                                onChange={e => setForm ({ ...form, seventotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='sevenremaining'
                                value={form.sevenremaining}
                                placeholder='Character sevenremaining'
                                onChange={e => setForm ({ ...form, sevenremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(7)}
                    </div>
                    <div className='level-eight-spells'>
                        <form>
                            <h2>Level eight Spells</h2>
                            <input 
                                type='number'
                                id='eighttotal'
                                value={form.eighttotal}
                                placeholder='Character eighttotal'
                                onChange={e => setForm ({ ...form, eighttotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='eightremaining'
                                value={form.eightremaining}
                                placeholder='Character eightremaining'
                                onChange={e => setForm ({ ...form, eightremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(8)}
                    </div>
                    <div className='level-nine-spells'>
                        <form>
                            <h2>Level nine Spells</h2>
                            <input 
                                type='number'
                                id='ninetotal'
                                value={form.ninetotal}
                                placeholder='Character ninetotal'
                                onChange={e => setForm ({ ...form, ninetotal: e.target.value})}
                                />
                            <input 
                                type='number'
                                id='nineremaining'
                                value={form.nineremaining}
                                placeholder='Character nineremaining'
                                onChange={e => setForm ({ ...form, nineremaining: e.target.value})}
                                />
                        </form>
                        {spellsList(9)}
                    </div>
            </div>
            
        </div>
    )
}