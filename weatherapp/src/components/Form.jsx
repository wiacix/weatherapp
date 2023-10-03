import React from 'react'
import { Dictionary as text } from '../data/text'
import './style/Form.css'
import $ from 'jquery'
import { useState } from 'react'

export default function Form(props) {

    const [whatStateSearch, setWhatStateSearch] = useState(4);

    function optionSetState(){
        setWhatStateSearch(whatStateSearch===4?5:4);
        if(whatStateSearch===4){
            $('.optionsBox').css({'display': 'block'});
        }else{
            $('.optionsBox').css({'display': 'none'});
        }
    }

    return (
        <div className="form">
            <form>
                <div className="searchOption">
                    <input type='text' value={(props.TypeSearch?props.value:props.coords)} placeholder={(props.TypeSearch?text[1][props.lang]:text[2][props.lang])} onChange={props.change} disabled={(!props.TypeSearch?true:false)} />
                    <select onChange={props.changeTypeSearch}>
                        <option>{text[1][props.lang]}</option>
                        <option>{text[2][props.lang]}</option>
                    </select>
                </div>
                <div className="button">
                    <button onClick={props.submit}>{text[3][props.lang]}</button>
                </div>
            </form>
            <div className="moreOptions">
            <p onClick={() => optionSetState()} className='options'>{text[whatStateSearch][props.lang]}</p>
            <div className="optionsBox">
                <p>{text[6][props.lang]}:<span className='units' onClick={() => props.changUnits(0)}><span style={{textDecoration: (props.units[0]?'underline':'none')}}>°C </span>&nbsp;|&nbsp;<span style={{textDecoration: (!props.units[0]?'underline':'none')}}> °F</span></span></p>
                <p>{text[7][props.lang]}:<span className='units' onClick={() => props.changUnits(1)}><span style={{textDecoration: (!props.units[1]?'underline':'none')}}>mph </span>&nbsp;|&nbsp;<span style={{textDecoration: (props.units[1]?'underline':'none')}}> kph</span></span></p>
                <p>{text[8][props.lang]}:<span className='units' onClick={() => props.changUnits(2)}><span style={{textDecoration: (props.units[2]?'underline':'none')}}>mb </span>&nbsp;|&nbsp;<span style={{textDecoration: (!props.units[2]?'underline':'none')}}> in</span></span></p>
            </div>
        </div>
        </div>
    )
}
