import React from 'react'

const Filter = ({newFilter,handleFilter}) => (
    <span>
    filter shown with<input value={newFilter} onChange={handleFilter} />
    </span>
)
export default Filter