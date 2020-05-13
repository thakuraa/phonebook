import React from 'react'

const Failnotif = ({fail}) => {
    if(fail===null){
        return null
    }
    return(
        <div className="fail">
            {fail}
        </div>
    )
}

export default Failnotif