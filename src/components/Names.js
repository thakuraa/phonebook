import React from 'react'

const Names = ({persons,newFilter,handleclick}) =>{

    return (
        <div>
            {(persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))).map((person)=> <span key={person.number} >{person.name} {person.number} <button type="button" onClick={()=>handleclick(person.id,person.name)}>delete</button><br /></span>)}
        </div>
    )
}

export default Names