import './style.css'
import {TiThumbsUp } from "react-icons/ti";

export function CommentCard(){
    return(
        <>
            <div className='container__flex comment__card'>
                <div>
                    avt
                </div>
                <div>
                    <label>Name</label>
                    <div>Rating | Date</div>
                    <p>Content</p>
                    <TiThumbsUp/>
                </div>
            </div>
            <hr></hr>
        </>

    )
}