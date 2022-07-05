import './style.css'
import { BsSearch } from 'react-icons/bs'
import {FaSearch} from 'react-icons/fa'

export default function SearchBar(){
    return(
        <div className='search-bar'>
            <input className="search-bar-search-field"placeholder='Tìm kiếm'></input>
            <div className='search-icon'><BsSearch/></div>
        </div>
    )
}