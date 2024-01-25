import React from 'react'

export default function Card({data}) {
  return (
    <div className='CardContainer'>
      <h3>{data.first_name}</h3>
      <p style={{margin:'5px'}}>{data.email}</p>
      <img className=' imgStyle' src={data.avatar} alt={data.first_name}/>
    </div>
  )
}
