import React from 'react'
import { Table } from "./table"
import Link from "next/link"

export default function page() {

    return (
        <div className="py-5 px-24">
            <div className="flex justify-between">
                <div></div>
                <h1>Set Up Banner</h1>
                <div>
                    <Link href={`/banner/add`}  className="btn btn-accent">Add</Link>
                </div>
            </div>
            <Table />
        </div>

    )
}
