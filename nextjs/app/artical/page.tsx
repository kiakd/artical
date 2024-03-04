'use client'
import React, { useEffect, useState } from 'react'
import CardArtical from "./cardArtical"
import Link from "next/link"
import { GetArticalAll } from "./api/articalAPI"

export default function page() {
  const [result, setResult] = useState()
  const [search, SetSearch] = useState('')
  const initState = async () => {
    const response = await GetArticalAll()
    const data = await response
    setResult(data)
  }
  const searchInput = async (event) => {
    const searchstring = event.target.value
    const page: number = 1
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical?search=${searchstring}`)
    const data = await response.json()
    setResult(data)
    SetSearch(searchstring)
}
  useEffect(()=>{
    initState()
  }, [])
  return (
    <div className="">
      <div className="w-full flex justify-between py-5">
        <div className="flex">

        </div>
        <div className="flex">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" onChange={searchInput} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
        </div>
        <div className="flex-none w-24">
          <Link href={`/artical/add`} className="btn btn-accent">
            ADD
          </Link>
        </div>
      </div>
      <div className="px-24 grid  grid-cols-3">
        {
          result && (
            result.data.map((item:any)=>(
              <CardArtical item={item} key={item.id} />
            ))
            
          )
        }
      </div>

    </div>
  )
}
