import React from 'react';

function Button(props: any) {

    return (
        <div>
            <label className="container">
                <input
                    type="radio"
                    name="baseColor"
                    value={props.myColor}
                    onChange={props.setColor}
                />
                <span
                    className="checkmark"
                    style={{ 
                        backgroundColor: props.myColor,                                              
                        }}
                ></span>
            </label>
        </div>
    )


}

export default Button