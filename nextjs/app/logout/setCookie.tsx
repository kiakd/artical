'use server'

import React from 'react'
import { cookies } from "next/headers"

export default async function SetCookie() {
    cookies().set('role_user', '', {expires: 0})
    cookies().set('token_type', '', {expires: 0})
    cookies().set('token_laravel_login', '', {expires: 0})
  return (
    <div>setCookie</div>
  )
}
