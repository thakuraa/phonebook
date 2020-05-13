import React, { useState,useEffect } from 'react'
import Names from './components/Names.js'
import Filter from './components/Filter.js'
import Nameform from './components/Nameform.js'
import Errornotif from './components/Errornotif.js'
import Failnotif from './components/Failnotif.js'
import nameService from './services/persons.js'
const App = () => {
  const [ persons, setPersons ] = useState([])
  useEffect(() => {
    console.log('effect')
    nameService.getAll().then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, []) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorm,setError ] = useState(null)
  const [ fail,setFail] = useState(null)
  const addPerson = (event) => {
    event.preventDefault()
    if((persons.map(person => person.name.toLowerCase())).includes(newName.toLowerCase())){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new number`)){
        const  person=persons.find(n=>n.name===newName)
        nameService.update(person.id,{name:person.name,number:newNumber}).then(returnedName => {
          setPersons(persons.map(n => n.name !== newName ? n : {name:newName,number:newNumber,id:person.id}))
        })
        setError(`Updated ${newName}`)
        setTimeout(() => {
          setError(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }
    }
    else if((persons.map(person => person.number.replace('-',''))).includes(newNumber.replace('-',''))){
      window.alert(`${newNumber} is already added to phonebook`)
    }
    else{
      nameService.create({name:newName, number:newNumber}).then(response => {setPersons(persons.concat(response.data))})
      setError(`Added ${newName}`)
      setTimeout(() => {
        setError(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNamechange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberchange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }
  const handleclick = (id,name) => {
    if(window.confirm("Delete "+name)){
      nameService.delet(id).then(response => {setPersons(persons.filter(person=>person.id!=id))
      setError(`Deleted ${name}`)
      setTimeout(() => {
        setError(null)
      }, 5000)
      }).catch(error => {
        setError(`${name} was already removed from server`)
        setTimeout(()=>{
          setFail(null)
        },5000)
      })

      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Errornotif errorm={errorm} />
      <Failnotif fail={fail} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Nameform addPerson={addPerson} newName={newName} handleNamechange={handleNamechange} newNumber={newNumber} handleNumberchange={handleNumberchange} />
      <h3>Numbers</h3>
      <Names persons={persons} newFilter={newFilter} handleclick={handleclick}/>
    </div>
  )
}

export default App