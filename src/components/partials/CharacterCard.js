import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function CharacterCard(props){
    const navigate = useNavigate()

    const handleClick = e=>{
        e.preventDefault()
        navigate(`/charactersheet/${props.character._id}`)
    }
    return(
        <div className="card-container" onClick={handleClick}>
        <div className="char-card">
            <div className="char-name">Name</div>
            <div className="char-race">Race</div>
            <div className="char-class">Class</div>
            <div className="char-subclass">Subclass</div>
            <div className="char-level">Level</div>
            <div className="char-class2">{props.character.class}</div>
            <div className="char-race2">{props.character.race}</div>
            <div className="char-name2">{props.character.name}</div>
            <div className="char-subclass2">{props.character.subclass}</div>
            <div className="char-level2">{props.character.level}</div>
            <img className="char-img" src={props.character.img_url === undefined || props.character.img_url === '' ? 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg': props.character.img_url} width={200} alt='Character Profile Picture' ></img>

        </div>
        </div>
    )
}