'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function FormLogin(prevState : any,formData:any) {
    const emails = formData.get("email")
    const passwords = formData.get("password")    
    const response = await GetLogin(emails, passwords)
    console.log(prevState)
    if (response.message == 'success')
    {
        redirect('/')
    }
    else
    {
        return response
    }
}

async function GetLogin(emails : string, passwords: string)
{
    try
    {
        const response = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": emails,
                "password": passwords,
            })
        })
    
        const result = await response.json()
        
        if (result.message != 'success'){
            return { message: 'Login fail' }
        }
        const thirtyMin = 10 * 60 * 1000
        cookies().set('token_laravel_login', result.access_token, {expires: Date.now() + thirtyMin})
        cookies().set('token_type', result.token_type, { expires: Date.now() + thirtyMin})
        cookies().set('role_user', result.role_type, { expires: Date.now() + thirtyMin})
        return { message: 'success' }
    }
    catch (error)
    {
        return { message: 'Error login' }
    }
}
