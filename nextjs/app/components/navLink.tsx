"use client"
import Link from "next/link"
import React from 'react'
import styles from './navlink.module.css'
import { usePathname } from "next/navigation"
export default function NavLink({ item }: any) {
  const pathName = usePathname();
  return (
    <li className={`navbarLi ${pathName == item.path && styles.active} p-2`}>
      <Link href={item.path}>{item.title}</Link>
    </li>
  )
}
