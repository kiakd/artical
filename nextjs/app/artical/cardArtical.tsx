import Link from "next/link"
import React from 'react'
import { RemoveBtn } from "./removeBtn"

export default function CardArtical({ item }: any) {
    return (
        <div className="card card-bg-color-defult shadow-xl p-3">
            <figure><img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.image_file}`}
                width={200}
                height={200}
                alt="Picture of the author" /></figure>
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.shot_description}</p>
                <div className="card-actions justify-end">

                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1">Actions</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href={`/artical/${item.id}/view`}>
                                Views
                            </Link></li>
                            <li><Link href={`/artical/${item.id}`}>
                                Edit
                            </Link></li>
                            <RemoveBtn id={item.id} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
