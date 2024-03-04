'use client'
import React , {useEffect} from 'react'
import SetCookie from "./setCookie"
import { useRouter } from "next/navigation"

export default function page() {
    const route = useRouter()
    useEffect(()=>{
        SetCookie()
        route.replace("/")
    }, [])
  return (
    <div></div>
  )
}
