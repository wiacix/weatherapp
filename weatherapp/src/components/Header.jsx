import { Dictionary as text } from '../data/text'
import './style/Header.css'

const Header = (props) => {
    return (
        <header>
            <h1>WeatherWiacus</h1>
            <h2>{text[0][props.lang]}</h2>
        </header>
    )
}

export default Header;