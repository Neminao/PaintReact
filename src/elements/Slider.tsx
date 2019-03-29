import React from 'react'

function Slider(props: any){
    return (
        <div>
        <input 
        type="range" 
        min={props.min} 
        max={props.max}             
        onChange={props.mySliderChange}
        />
        <output id="output" ></output>
        </div>
    )
}

export default Slider