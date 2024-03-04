'use server'
import { redirect } from "next/navigation"
export async function RedirectPath(path:string) {
    redirect(path)
}
