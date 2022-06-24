import React from 'react'

export default function fetch() {
    fetch("localhost:3000/json").then((res)=> res.json()).then((res)=>console.log(res))
  return (
    <div>fetch</div>
  )
}
