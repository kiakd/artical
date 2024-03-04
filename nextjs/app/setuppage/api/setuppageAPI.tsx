'use server'

import React from 'react'

export async function DeleteSetUpPageById($id:any) {
    console.log('del')
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setUpPage/${$id}}`,{
        method: "DELETE",
       })
       return {message:'del sucess', status: 200}
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function UpdateSetUpPageById($id,$data) {
    try
    {   
        console.log($id)
        console.log($data)
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setUpPage/${$id}}`,{
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

export async function StoreSetUpPage($data) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setUpPage`,{
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


export async function GetSetUpPageById($id) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setUpPage/${$id}}`, { cache: 'no-store' })
       const reuslt  = await response.json()
       return reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function GetSetUpPageAll() {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setUpPage`, { cache: 'no-store' })
       return response.json()
    }
    catch (error)
    {
        return [{message: error, status: 500}]
    }
}
