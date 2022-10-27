export default function CharacterCard(props){
    return(
        <div>
            Name: {props.character.name}{' | '}
            Race: {props.character.race}{' | '}
            Class: {props.character.class}{' | '}
            Subclass: {props.character.subclass}{' | '}
            Level: {props.character.level}
        </div>
    )
}