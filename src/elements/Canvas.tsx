import React, { Component } from 'react';



function Canvas(props: any) {

    return (
        <canvas
            style = {{
                zIndex: props.zindex,
                opacity: props.transparency
            }}
            id={props.id}
            width="1740"
            height="800"
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseMove={props.onMouseMove}
            onKeyDown={props.onKeyDown}
            tabIndex={0}>
            
        </canvas>
    )

}

export default Canvas