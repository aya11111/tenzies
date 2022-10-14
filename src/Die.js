import React from "react";

function Die(props){
    const style={
        backgroundColor: props.isHeld? "#59E391": "#fff"
    }
    return (
        <>
            <div className="die" style={style} onClick={props.func}>{props.value}</div>
        </>
    )
}

export default Die;