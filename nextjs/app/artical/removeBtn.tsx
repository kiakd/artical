'use client'
import React from 'react'
import {useRouter } from "next/navigation"

export function RemoveBtn({id}) {
    const router = useRouter()
    const removeData = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical/${id}`,{
            method: "DELETE",
        })
        router.refresh()
    }
  return (
    <li onClick={removeData}><a href="#">Delete</a></li>
  )
}
