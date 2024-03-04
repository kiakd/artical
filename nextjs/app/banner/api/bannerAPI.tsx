'use server'

import React from 'react'

export async function DeleteBannerById($id:any) {
    console.log('del')
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner/${$id}}`,{
        method: "DELETE",
       })
       return {message:'del sucess', status: 200}
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function UpdateBannerById($id,$data) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner/${$id}}`,{
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

export async function StoreBanner($data) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`,{
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


export async function GetBannerById($id) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner/${$id}}`, { cache: 'no-store' })
       const reuslt  = await response.json()
       return reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function GetBannerAll() {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`, { cache: 'no-store' })
       return response.json()
    }
    catch (error)
    {
        return [{message: error, status: 500}]
    }
}
