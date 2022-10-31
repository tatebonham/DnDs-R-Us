import { useParams, useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import Weapons from '../partials/Weapons'
import Spells from '../partials/Spells'
import Attacks from '../partials/Attacks'
import Features from '../partials/Features'
import Prof from '../partials/Prof'
import Equipment from '../partials/Equipment'
import React from 'react'



export default function CharacterSheet(){
    
    const [active, setActive] = useState(false)
    const [casting, setCasting] = useState(false)
    const [edit, setEdit] = useState(false)
    const [hd, sethd] = useState({
        amount: ''
    })
    const [profForm, setProfForm] = useState({
        note: ''
    })
    const [featureForm, setFeatureForm] = useState({
        note: ''
    })
    const [equipmentForm, setEquipmentForm] = useState({
        note: ''
    })
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
            console.log(character.proficiencies)
            
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
    const handleProfSubmit = async e => {   
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            console.log(profForm)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}/profs`, profForm, options)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.message)
            }
        }
        getCharacter()
        setProfForm({
            note: ''
        })
    }
    const handleEquipmentSubmit = async e => {   
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}/equipment`, equipmentForm, options)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.message)
            }
        }
        getCharacter()
        setEquipmentForm({
            note: ''
        })
    }
    const handleFeatureSubmit = async e => {   
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/characters/${id}/features`, featureForm, options)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.message)
            }
        }
        getCharacter()
        setFeatureForm({
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

    const profsList = ()=>{
        if (form.proficiencies !== undefined){
            return form.proficiencies.map((prof, i) =>{
                return(
                    <div key={prof._id} >
                        <Prof getCharacter={getCharacter}  prof={prof} index={i} characterId={id} />
                    </div>
                
                )
        })
    }}
    const featuresList = ()=>{
        if (form.features !== undefined){
            return form.features.map((feature, i) =>{
                return(
                    <div key={feature._id} >
                        <Features getCharacter={getCharacter}  feature={feature} index={i} characterId={id} />
                    </div>
                
                )
        })
    }}
    const equipmentList = ()=>{
        if (form.equipment !== undefined){
            return form.equipment.map((equipment, i) =>{
                return(
                    <div key={equipment._id} >
                        <Equipment getCharacter={getCharacter}  equipment={equipment} index={i} characterId={id} />
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
                        <div key={spell._id} className='spell-list-item'>
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
    const healFor = e =>{
        e.preventDefault()
        if(hd.amount === null || hd.amount === 0 ){
            return 
        } else {
            const heal = Number(form.currenthealth) + Number(hd.amount)
            setForm({...form, currenthealth: heal})
            sethd({amount: ''})
        }
    }
    const damageFor = e =>{
        e.preventDefault()
        if(hd.amount === null || hd.amount === 0 ){
            return 
        } else if (form.temporaryhealth >= 1){
            let amount = Number(hd.amount)
            let temphp = Number(form.temporaryhealth)
            if((temphp - amount) <= 0){
                amount -= temphp
                temphp = 0
                const damage = Number(form.currenthealth) - amount
                setForm({...form, currenthealth: damage, temporaryhealth: ''})
                sethd({amount: ''})
            }
        } else {
            const damage = Number(form.currenthealth) - Number(hd.amount)
            setForm({...form, currenthealth: damage})
            sethd({amount: ''})
        }
        
    }
    const editing = e =>{
        e.preventDefault()
        if(edit === true){
            setEdit(false)
        } else {
            setEdit(true)
        }
    }
    const activeModal = e =>{
        e.preventDefault()
        if(active === true){
            setActive(false)
        } else {
            setActive(true)
        }
    }


    return(
        <div className='grid-container'>
            {msg}
            <div className='character-header'>
                <img src={form.img_url === undefined || form.img_url === '' ? 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg': form.img_url} width={200} alt='Character Profile Picture' ></img>

                {edit ? <input 
                    type='text'
                    id='img_url'
                    value={form.img_url}
                    placeholder='Character img_url'
                    onChange={e => setForm ({ ...form, img_url: e.target.value})}
                    /> : <input 
                    type='text'
                    id='name'
                    value={form.name}
                    placeholder='Character Name'
                    onChange={e => setForm ({ ...form, name: e.target.value})}
                    />}
                <button className='changepfp' onClick={editing} >{edit ? 'Save Image Link' : 'Change Image Link'}</button>
                <br/>
                <button className='delete' onClick={activeModal}>Delete Character</button>
            </div>
            <div className='character-info' >
                <div className='race'>
                <input 
                    type='text'
                    id='race'
                    value={form.race}
                    placeholder='Character Race'
                    onChange={e => setForm ({ ...form, race: e.target.value})}
                    />
                    <h3>Race</h3>
                </div>
                <div className='class'>
                <input 
                    type='text'
                    id='class'
                    value={form.class}
                    placeholder='Character Class'
                    onChange={e => setForm ({ ...form, class: e.target.value})}
                    />
                    <h3>Class</h3>
                </div>
                <div className='subclass'>
                <input 
                    type='text'
                    id='subclass'
                    value={form.subclass}
                    placeholder='Character Subclass'
                    onChange={e => setForm ({ ...form, subclass: e.target.value})}
                    />
                    <h3>Subclass</h3>
                </div>
                <div className='alignment'>
                <input 
                    type='text'
                    id='alignment'
                    value={form.alignment}
                    placeholder='Character Alignment'
                    onChange={e => setForm ({ ...form, alignment: e.target.value})}
                    />
                    <h3>Alignment</h3>
                </div>
                <div className='background'>
                <input 
                    type='text'
                    id='background'
                    value={form.background}
                    placeholder='Character Background'
                    onChange={e => setForm ({ ...form, background: e.target.value})}
                    />
                    <h3>Background</h3>
                </div>
                <div className='level'>
                <input 
                    type='number'
                    id='level'
                    value={form.level}
                    placeholder='Character Level'
                    onChange={e => setForm ({ ...form, level: e.target.value})}
                    />
                    <h3>Level</h3>
                </div>
            </div>
            <div className='character-stats'>
                    <p className='stat-title'>Strength:</p>
                   <h3 className='stat-data' >{stats.strength}</h3>

                <input className='stat'
                    type='number'
                    id='strength'
                    value={form.strength}
                    placeholder='Strength'
                    onChange={e => setForm ({ ...form, strength: e.target.value})}
                    />
                <p className='stat-title'>Dexterity: </p>
                <h3 className='stat-data' >{stats.dexterity}</h3>
                <input className='stat'
                    type='number'
                    id='dexterity'
                    value={form.dexterity}
                    placeholder='Dexterity'
                    onChange={e => setForm ({ ...form, dexterity: e.target.value})}
                    />

                    <p className='stat-title'>Constitution: </p>
                <h3 className='stat-data' >{stats.constitution}</h3>
                <input className='stat'
                    type='number'
                    id='constitution'
                    value={form.constitution}
                    placeholder='Constitution'
                    onChange={e => setForm ({ ...form, constitution: e.target.value})}
                    />
                <p className='stat-title'>Intelligence: </p>
                <h3 className='stat-data' >{stats.intelligence}</h3>
                <input className='stat'
                    type='number'
                    id='intelligence'
                    value={form.intelligence}
                    placeholder='Intelligence'
                    onChange={e => setForm ({ ...form, intelligence: e.target.value})}
                    />
                <p className='stat-title'>Wisdom: </p>
                <h3 className='stat-data' >{stats.wisdom}</h3>
                <input className='stat'
                    type='number'
                    id='wisdom'
                    value={form.wisdom}
                    placeholder='Wisdom'
                    onChange={e => setForm ({ ...form, wisdom: e.target.value})}
                    />
                <p className='stat-title'>Charisma: </p>
                <h3 className='stat-data' >{stats.charisma}</h3>
                <input className='stat'
                    type='number'
                    id='charisma'
                    value={form.charisma}
                    placeholder='Charisma'
                    onChange={e => setForm ({ ...form, charisma: e.target.value})}
                    />
            </div>
            <div className='skills'>
                    <div className='inspiration'>
                        <h2>
                        <input 
                            type='number'
                            id='inspiration'
                            value={form.inspiration}
                            placeholder='0'
                            onChange={e => setForm ({ ...form, inspiration: e.target.value})}
                        />
                        - Inspiration 
                        </h2>
                    </div>
                    <div className='pb'>
                        <h3>+{proficiencyBonus()} - Proficiency Bonus</h3>
                    </div>
                    <div className='skills-chart'>
                        <div className='skill-line'>       
                            <p><button onClick={e => toggleSkill(e, 'acrobatics')} style={form.acrobatics ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}} ></button>
                            <u>{form.acrobatics ? skillPlus(Number(stats.dexterity)) : stats.dexterity}</u> - Acrobatics {'(Dex)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'animalhandling')} style={form.animalhandling ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}} ></button>
                            <u>{form.animalhandling ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - Animal Handling {'(Str)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'arcana')} style={form.arcana ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.arcana ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - Arcana {'(Int)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'athletics')} style={form.athletics ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.athletics ? skillPlus(Number(stats.strength)): stats.strength}</u> - Athletics {'(Str)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'deception')} style={form.deception ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.deception ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - Deception {'(Cha)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'history')} style={form.history ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.history ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - History {'(Int)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'insight')} style={form.insight ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.insight ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - Insight {'(Wis)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'intimidation')} style={form.intimidation ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.intimidation ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - Intimidation {'(Cha)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'investigation')} style={form.investigation ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.investigation ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - Investigation {'(Int)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'medicine')} style={form.medicine ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.medicine ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - Medicine {'(Wis)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'nature')} style={form.nature ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.nature ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - Nature {'(Int)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'perception')} style={form.perception ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.perception ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - Perception {'(Wis)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'performance')} style={form.performance ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.performance ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - Performance {'(Cha)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'persuasion')} style={form.persuasion ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.persuasion ?  skillPlus(Number(stats.charisma)): stats.charisma}</u> - Persuasion {'(Cha)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'religion')} style={form.religion ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.religion ?  skillPlus(Number(stats.intelligence)): stats.intelligence}</u> - Religion {'(Int)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'sleight')} style={form.sleight ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.sleight ?  skillPlus(Number(stats.dexterity)): stats.dexterity}</u> - Sleight of Hand {'(Dex)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'stealth')} style={form.stealth ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.stealth ?  skillPlus(Number(stats.dexterity)): stats.dexterity}</u> - Stealth {'(Dex)'}</p>
                        </div>
                        <div className='skill-line'>
                            <p><button onClick={e => toggleSkill(e, 'survival')} style={form.survival ? {backgroundColor: '#1167b1'} : {backgroundColor: 'white'}}></button>
                            <u>{form.survival ?  skillPlus(Number(stats.wisdom)): stats.wisdom}</u> - Survival {'(Wis)'}</p>
                        </div>
                        <div className='skill-text'>
                            <h3>Skills</h3>
                        </div>
                    </div>
            </div>
            <div className='combat-info'>
                <div className='top-row'>
                    <div className='top-row-col'>
                        <input 
                            type='number'
                            id='armor'
                            value={form.armor}
                            placeholder='0'
                            onChange={e => setForm ({ ...form, armor: e.target.value})}
                        />
                        <h2>Armor</h2>
                    </div>
                    <div className='top-row-col'>
                        <input 
                            type='number'
                            id='initiative'
                            value={form.initiative}
                            placeholder='0'
                            onChange={e => setForm ({ ...form, initiative: e.target.value})}
                            />
                        <h2>Initiative</h2>
                    </div>
                    <div className='top-row-col'>
                        <input 
                            type='number'
                            id='speed'
                            value={form.speed}
                            placeholder='0'
                            onChange={e => setForm ({ ...form, speed: e.target.value})}
                        />
                        <h2>Speed</h2>
                    </div>
                </div>
                    <div className='max-health'>
                        <h2>Maximum Health Points - </h2>
                        <input 
                            type='number'
                            id='maxhealth'
                            value={form.maxhealth}
                            placeholder='0'
                            onChange={e => setForm ({ ...form, maxhealth: e.target.value})}
                        />
                    </div>
                    <div className='temp-health'>
                        <input 
                            type='number'
                            id='temporaryhealth'
                            value={form.temporaryhealth}
                            placeholder='0'
                            onChange={e => setForm ({ ...form, temporaryhealth: e.target.value})}
                        />
                        <h2> - Temporary Health</h2>
                    </div>
                    <div className='current-health'>
                        <input 
                            type='number'
                            id='currenthealth'
                            value={form.currenthealth}
                            placeholder='0'
                            onChange={e => setForm ({ ...form, currenthealth: e.target.value})}
                        />
                        <h2>Current Health</h2>
                    </div>
                    <div className='bottom-row' >
                        <div className='hit-dice'>
                            <div className='total'>
                                <h2>Total Hit Dice: </h2>
                                <input 
                                    type='string'
                                    id='totalhitdice'
                                    value={form.totalhitdice}
                                    placeholder='1d6'
                                    onChange={e => setForm ({ ...form, totalhitdice: e.target.value})}
                                />
                            </div>
                            <div className='current'>
                                <h2>Current Hit Dice: </h2>
                                <input 
                                    type='number'
                                    id='currenthitdice'
                                    value={form.currenthitdice}
                                    placeholder='0'
                                    onChange={e => setForm ({ ...form, currenthitdice: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className='heal-damage'>
                                <div className='hdinput'>
                                    <input 
                                        type='number'
                                        id='hd'
                                        value={hd.amount}
                                        placeholder='0'
                                        onChange={e => sethd ({ ...hd, amount: e.target.value})}
                                        />
                                </div>
                                <button className='heal-me' onClick={healFor}>Heal Me!</button>
                                <button className='damage-me' onClick={damageFor}>Damage Me!</button>
                            
                        </div>
                    </div>
                    
            </div>
            <div className='proficiencies'>
                        <div  className='add-prof'>
                            <form onSubmit={handleProfSubmit} >
                                <input 
                                    type='text'
                                    id='note'
                                    placeholder='New Proficiency '
                                    value={profForm.note}
                                    required
                                    onChange={e => setProfForm ({ ...profForm, note: e.target.value})}
                                />
                                
                                <button type='submit'>Add Proficiency</button>
                            </form>
                </div>
                    <div className='prof-list'>
                        {profsList()}
                    </div>
                    <h2 className='prof-text'>Proficiencies and Languages</h2>
            </div>
            <div className='equipment'>   
                    <div className='coin'>
                        <div className='gold coin-item'>
                            <input className='gold-input'
                                    type='number'
                                    id='note'
                                    placeholder='0'
                                    value={form.gold}
                                    onChange={e => setForm ({ ...form, gold: e.target.value})}
                                    />
                                    <h2>gold</h2>
                        </div>
                        <div className='silver coin-item'>
                            <input className='silver-input'
                                    type='number'
                                    id='note'
                                    placeholder='0'
                                    value={form.silver}
                                    onChange={e => setForm ({ ...form, silver: e.target.value})}
                                    />
                                    <h2>silver</h2>
                        </div>
                        <div className='copper coin-item'>
                            <input className='copper-input'
                                    type='number'
                                    id='note'
                                    placeholder='0'
                                    value={form.copper}
                                    onChange={e => setForm ({ ...form, copper: e.target.value})}
                                    />
                                    <h2>copper</h2>
                        </div>
                    </div>
                        <div  className='add-equipment'>
                            <form onSubmit={handleEquipmentSubmit} >
                                <input 
                                    type='text'
                                    id='note'
                                    placeholder='New Equipment'
                                    value={equipmentForm.note}
                                    onChange={e => setEquipmentForm ({ ...equipmentForm, note: e.target.value})}
                                />
                                
                                <button type='submit' className='equipbtn'>Add Equipment</button>
                            </form>
                </div>
                    <div equipment-list>
                        {equipmentList()}
                    </div>
                <h2 className='equipment-text' >Equipment</h2>
            </div>
            <div className='features'>
                        <div  className='add-feature'>
                            <form onSubmit={handleFeatureSubmit} >
                                <input 
                                    type='text'
                                    id='note'
                                    placeholder='note'
                                    value={featureForm.note}
                                    onChange={e => setFeatureForm ({ ...featureForm, note: e.target.value})}
                                />
                                
                                <button type='submit'>Add feature</button>
                            </form>
                </div>
                <h2 className='feature-text'>Features and Traits</h2>
                    <div className='feature-list'>
                        {featuresList()}
                    </div>

            </div>
            <div className='attacksandweapons'>
                <div className='weapons'>
                <div className='bottom-row-weapon'><p>Weapon Name</p><p>Damage Amount</p><p>Damage Type</p></div>
                    <div className='weaponlist'>
                        {weaponsList()}
                    </div>
                    <div className='weapon-form-container'>
                    <form onSubmit={handleSubmit} className='weapon-form' >
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
                        placeholder='description'
                        value={weaponForm.note}
                        onChange={e => setWeaponForm ({ ...weaponForm, note: e.target.value})}
                        
                    />
                    
                    <button type='submit' className='addweaponbutton'>+</button>
                </form>
                </div>
                </div>  
                <div className='attacks'>
                    <h2 className='attack-text'>Weapons and Attacks</h2>
                    <div className='attack-list'>
                        {attacksList()}
                    </div>
                        <div  className='add-attack'>
                            <form onSubmit={handleAttackSubmit} >
                                <input 
                                    type='text'
                                    id='note'
                                    placeholder='New Attack'
                                    require
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
                            <input className='addlevel'
                                type='text'
                                id='level'
                                placeholder='level'
                                value={spellForm.level}
                            onChange={e => setSpellForm ({ ...spellForm, level: e.target.value})}
                                
                            />
                            <input className='add'
                                type='text'
                                id='name'
                                placeholder='Spell Name'
                                value={spellForm.name}
                                onChange={e => setSpellForm ({ ...spellForm, name: e.target.value})}
                                
                            />
                            <input className='add'
                                type='text'
                                id='note'
                                placeholder='Description'
                                value={spellForm.note}
                                onChange={e => setSpellForm ({ ...spellForm, note: e.target.value})}
                                
                            />
                            
                            <button type='submit' class='addbutton'>Add Spell</button>
                        </form>
                    </div>
                    <div className='level-zero-spells spell-row'>
                        <h2>Cantrip</h2>
                        {spellsList(0)}
                    </div>
                    <div className='level-one-spells spell-row'>
                        <form>
                            <div className='spell-title'>
                            <h2>Level One Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                                <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='onetotal'
                                value={form.onetotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, onetotal: e.target.value})}
                                />
                            </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='oneremaining'
                                value={form.oneremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, oneremaining: e.target.value})}
                                />
                                </div>
                            </div>
                        </form>
                        {spellsList(1)}
                    </div>
                    <div className='level-two-spells spell-row'>
                        <form>
                            <div className='spell-title'>
                                <h2>Level Two Spells</h2>
                            </div>
                            
                            <div className='slot-inputs'>
                            <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='twototal'
                                value={form.twototal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, twototal: e.target.value})}
                                />
                                </div>
                                <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='tworemaining'
                                value={form.tworemaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, tworemaining: e.target.value})}
                                />
                                </div>
                            </div>
                        </form>
                        {spellsList(2)}
                    </div>
                    <div className='level-three-spells spell-row'>
                        <form>
                            <div className='spell-title'>
                            <h2>Level Three Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                            <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='threetotal'
                                value={form.threetotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, threetotal: e.target.value})}
                                />
                                </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='threeremaining'
                                value={form.threeremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, threeremaining: e.target.value})}
                                />
                                </div>
                            </div>
                        </form>
                        {spellsList(3)}
                    </div>
                    <div className='level-four-spells spell-row'>
                        <form>
                        <div className='spell-title'>
                            <h2>Level Four Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                                <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='fourtotal'
                                value={form.fourtotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, fourtotal: e.target.value})}
                                />
                                </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='fourremaining'
                                value={form.fourremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, fourremaining: e.target.value})}
                                />
                                </div>
                            </div>
                        </form>
                        {spellsList(4)}
                    </div>
                    <div className='level-five-spells spell-row'>
                        <form>
                        <div className='spell-title'>
                            <h2>Level Five Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                                <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='fivetotal'
                                value={form.fivetotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, fivetotal: e.target.value})}
                                />
                                </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='fiveremaining'
                                value={form.fiveremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, fiveremaining: e.target.value})}
                                />
                                 </div>
                            </div>
                        </form>
                        {spellsList(5)}
                    </div>
                    <div className='level-six-spells spell-row'>
                        <form>
                        <div className='spell-title'>
                            <h2>Level Six Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                                <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='sixtotal'
                                value={form.sixtotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, sixtotal: e.target.value})}
                                />
                                </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='sixremaining'
                                value={form.sixremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, sixremaining: e.target.value})}
                                />
                                </div>
                            </div>
                        </form>
                        {spellsList(6)}
                    </div>
                    <div className='level-seven-spells spell-row'>
                        <form>
                        <div className='spell-title'>
                            <h2>Level Seven Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                                <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='seventotal'
                                value={form.seventotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, seventotal: e.target.value})}
                                />
                                </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='sevenremaining'
                                value={form.sevenremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, sevenremaining: e.target.value})}
                                />
                                </div>
                            </div>
                        </form>
                        {spellsList(7)}
                    </div>
                    <div className='level-eight-spells spell-row'>
                        <form>
                        <div className='spell-title'>
                            <h2>Level Eight Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                                <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='eighttotal'
                                value={form.eighttotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, eighttotal: e.target.value})}
                                />
                                </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='eightremaining'
                                value={form.eightremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, eightremaining: e.target.value})}
                                />
                                 </div>
                            </div>
                        </form>
                        {spellsList(8)}
                    </div>
                    <div className='level-nine-spells spell-row'>
                        <form>
                        <div className='spell-title'>
                            <h2>Level nine Spells</h2>
                            </div>
                            <div className='slot-inputs'>
                                <div>
                            <p>Total</p>
                            <input 
                                type='number'
                                id='ninetotal'
                                value={form.ninetotal}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, ninetotal: e.target.value})}
                                />
                                </div>
                            <div>
                            <p>Remaining</p>
                            <input 
                                type='number'
                                id='nineremaining'
                                value={form.nineremaining}
                                placeholder='0'
                                onChange={e => setForm ({ ...form, nineremaining: e.target.value})}
                                />
                                </div>
                            </div>
                        </form>
                        {spellsList(9)}
                    </div>
            </div>
            <div id="myModal" className="modal" style={active? {display: 'block'} : {display: 'none'} }>
                <div className="modal-content">
                    <p>Are you sure you want to delete this character?</p>
                    <button className='close' onClick={activeModal} >Cancel</button>
                    <button className='close' onClick={deleteCharacter} >Delete</button>
                </div>
            </div>
            {/* <div id="myModal" className="modal" style={casting? {display: 'block'} : {display: 'none'} }>
                <div className="modal-content">
                    <p>Are you sure you want to delete this character?</p>
                    <button className='close' onClick={cast} >Cancel</button>
                    <button className='close' onClick={()=>{castSpell(1)}} >1st</button>
                    <button className='close' onClick={()=>{castSpell(2)}} >2nd</button>
                    <button className='close' onClick={()=>{castSpell(3)}} >3rd</button>
                    <button className='close' onClick={()=>{castSpell(4)}} >4th</button>
                    <button className='close' onClick={()=>{castSpell(5)}} >5th</button>
                    <button className='close' onClick={()=>{castSpell(6)}} >6th</button>
                    <button className='close' onClick={()=>{castSpell(7)}} >7th</button>
                    <button className='close' onClick={()=>{castSpell(8)}} >8th</button>
                    <button className='close' onClick={()=>{castSpell(9)}} >9th</button>
                </div>
            </div> */}
        </div>
    )
}