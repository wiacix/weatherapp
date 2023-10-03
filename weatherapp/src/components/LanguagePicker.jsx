import React from 'react'
import './style/LanguagePicker.css'
import pl from '../data/img/pl.png'
import en from '../data/img/en.png'
import $ from 'jquery'

export default function LanguagePicker(props) {

    function select_lang(){
        $('.select').css({'width': '100%'});
        setTimeout(()=>{
            if(props.lang==='pl'){
                $('.select').css({'right':'0', 'left': 'auto'});
                $('.select').css({'width':'50%'});
            }
            else{
                $('.select').css({'right':'auto', 'left': '0'});
                $('.select').css({'width':'50%'});
            }
        },200)
    }

  return (
    <div className="langpicker" onClick={() => {props.changLang(); select_lang();}}>
        <img src={pl} alt='pl' className='pl_img'/>
        <div className="select"></div>
        <img src={en} alt='en' className='en_img'/>
    </div>
  )
}
