import construction from '../images/construction-2.jpg'

export default function DmScreen(){
    return(
        <div className="dmscreen-container">
            <div  className='dmcontent'>
                <h1>Woah there adventurer, this page is still under construction!</h1>
                <p>Coming Soon...</p>
                <img src={construction} width={600} ></img>
            </div>
        </div>
    )
}