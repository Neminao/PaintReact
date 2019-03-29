import React from 'react'
import Background from "./img/Pencil-icon.png"

function ShapeButton(props: any) {
    return (
        <div >
            <label className="containerShape">
                <input
                    type="radio"
                    name="baseShape"
                    value={props.myShape}
                    onChange={props.setShape}
                />
                 <span id="shape"
                    className={props.myShape}
                    
                ></span>
            </label>

            
            
        </div>
    )
}

export default ShapeButton