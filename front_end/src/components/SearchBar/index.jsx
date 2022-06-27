import './style.css'
import { BsSearch } from 'react-icons/bs'

export default function SearchBar(){
    return(
        <div className='search-bar'>
            <input className="search-bar-search-field"placeholder='Tìm kiếm'></input>
            <BsSearch/>
        </div>
    )
}