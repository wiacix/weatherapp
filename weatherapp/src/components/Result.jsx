import React from 'react'
import './style/Result.css'
import { Dictionary as text } from '../data/text'

export default function Result(props) {
  return (
    <div className="result">
        <h3><span>{props.city}</span>&nbsp;&nbsp;({props.coords[0].toString().replace('.','°')+"'00\u2033,"+props.coords[1].toString().replace('.','°')+"'00\u2033"}) <img src={props.condition} alt='wheater' /></h3>
        <h4>{text[9][props.lang]}: <span>{props.country}</span></h4>
        <h4>{text[10][props.lang]}: <span>{props.date}</span></h4>
        <h4>{text[11][props.lang]}: <span>{props.temperature} {props.units[0]?'°C':'°F'}</span></h4>
        <h4>{text[12][props.lang]}: <span>{props.fellTemp} {props.units[0]?'°C':'°F'}</span></h4>
        <h4>{text[13][props.lang]}: <span>{props.windSpeed} {props.units[1]?'kph':'mph'}</span></h4>
        <h4>{text[14][props.lang]}: <span>{props.windDirection}</span></h4>
        <h4>{text[8][props.lang]}: <span>{props.pressure} {props.units[2]?'mb':'in'}</span></h4>
        <h4>{text[15][props.lang]}: <span>{props.cloud} %</span></h4>
    </div>
  )
}
