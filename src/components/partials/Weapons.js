// import { useParams } from 'react-router-dom' 
// import { useEffect, useState } from 'react'

export default function Footer(props){

    return(
        <div>
            <form>
                <input 
                    type='number'
                    id='currenthitdice'
                    value={props.form.currenthitdice}
                    placeholder='currenthitdice'
                    onChange={e => props.setForm ({ ...props.form, currenthitdice: e.target.value})}
                />
                <input 
                    type='number'
                    id='currenthitdice'
                    value={props.form.currenthitdice}
                    placeholder='currenthitdice'
                    onChange={e => props.setForm ({ ...props.form, currenthitdice: e.target.value})}
                />
                <input 
                    type='number'
                    id='currenthitdice'
                    value={props.form.currenthitdice}
                    placeholder='currenthitdice'
                    onChange={e => props.setForm ({ ...props.form, currenthitdice: e.target.value})}
                />
            </form>
        </div>
    )
}




