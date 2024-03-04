import React from 'react'
import { GetBannerAll } from "./api/bannerAPI"
import Link from "next/link"

export async function Table() {
    const response = await GetBannerAll()
    const result = await response
    console.log(result.data)
    return (
        <div className="">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Banner</th>
                        <th>Setup</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {result.data ? result.data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-bold">{item.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.image_file}`} width={200} height={200} alt={item.name} />
                            </td>
                            <td>{item.is_active ? 'Active' : 'None Active'}</td>
                            <td>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn m-1">Actions</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link href={`/banner/${item.id}/view`}>
                                            Views
                                        </Link></li>
                                        <li><Link href={`/banner/${item.id}`}>
                                            Edit
                                        </Link></li>
                                        <li><Link href={`/banner/${item.id}`}>
                                            Remove
                                        </Link></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))
                        : (<tr><td rowSpan={3}>none banner</td></tr>)}

                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
