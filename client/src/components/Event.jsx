import React from 'react'
import '../css/Event.css'

// Event component now renders from props passed by the parent pages.
// Expected props: id, title, date, time, image
const Event = ({ id, title, date, time, image }) => {
    return (
        <article className='event-information' id={`event-${id}`}>
            {image ? <img src={image} alt={title} /> : null}

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {time}</p>
                </div>
            </div>
        </article>
    )
}

export default Event