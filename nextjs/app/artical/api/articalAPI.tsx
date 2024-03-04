'use server'
import { redirect } from "next/navigation"
import React from 'react'

export async function DeleteArticalById($id:any) {
    console.log('del')
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical/${$id}}`,{
        method: "DELETE",
       })
       return {message:'del sucess', status: 200}
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function UpdateArticalById($id,$data) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical/${$id}}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify($data)
       })
       const reuslt  = await response.json()
       return reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function StoreArtical($data) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify($data)
       })
       const reuslt  = await response.json()
       return  reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}


export async function GetArticalById($id) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical/${$id}}`, { cache: 'no-store' })
       const reuslt  = await response.json()
       return reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function GetArticalAll() {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical`, { cache: 'no-store' })
       return response.json()
    }
    catch (error)
    {
        return [{message: error, status: 500}]
    }
}
