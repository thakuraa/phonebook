import React from 'react'

const Errornotif = ({errorm}) => {
    if(errorm === null){
        return null
    }
    return(
        <div className="error">
            {errorm}
        </div>
    )
}

export default Errornotif

