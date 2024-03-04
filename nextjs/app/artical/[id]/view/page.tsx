import Link from "next/link"
import React from 'react'
import { GetArticalById } from "../../api/articalAPI"

export default async function page({params}:any) {
    const response = await GetArticalById(params.id)
    const result = await response

  return (
    <div className="container py-5">
            <div className="flex justify-center w-full">
                <div className="card w-96 shadow-xl  card-bg-color-defult ">
                    <div className="card-body">
                            <h2 className="card-title">View Artical</h2>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text ">Title</span>
                                </div>
                                <input name="title" type="text" placeholder="Title.." className="input input-bordered w-full max-w-xs text-input-color-base-100" disabled value={result.data.title} />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text ">Short description</span>
                                </div>
                                <input name="shot_description" type="text" placeholder="Short description..." className="input input-bordered w-full max-w-xs text-input-color-base-100" disabled value={result.data.shot_description} />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text ">Description</span>
                                </div>
                                <textarea name="description" className="textarea textarea-bordered" placeholder="Description..." disabled value={result.data.description}></textarea>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Image</span>
                                </div>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${result.data.image_file}`} height={500} width={500} />
                            </label>
                            <div className="card-actions justify-between pt-2">
                                <Link className="btn" href="/artical">Cancel</Link>
                            </div>
                    </div>
                </div>
            </div>

        </div>
  )
}
