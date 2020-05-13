import React from 'react'

const Nameform = ({addPerson,newName,handleNamechange,newNumber,handleNumberchange}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNamechange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberchange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default Nameform