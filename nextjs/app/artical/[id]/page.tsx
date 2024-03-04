"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { GetArticalById, StoreArtical, UpdateArticalById } from "../api/articalAPI";
import { RedirectPath } from "@/app/components/redirectpath";

export default function page({ params }) {
    const [selectedImage, setSelectedImage] = useState();
    const [file, setFile] = useState<File>()
    const [artical, setArtical] = useState({
        'title': '',
        'shot_description': '',
        'description': '',
        'image_file': '',
    })
    // for Preview
    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setFile(e.target.files[0])
        }
    };
    const initState = async () => {
        const data = await GetArticalById(params.id)
        if (data) {
            const result = {
                'title': data.data.title,
                'shot_description': data.data?.shot_description ?? '',
                'description': data.data?.description ?? '',
                'image_file': data.data?.image_file ?? '',
            }
            setArtical(result)
        }

    }
    const handelArtical = (e: any) => {
        const { name, value } = e.target
        setArtical((prev) => ({
            ...prev,
            [name]: value,

        }))
    }
    const handelOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const dataFile: File | null = file as unknown as File
        let buffer = null
        let nameImage = null
        // buffer image
        if (dataFile) {
            const bytes = await dataFile.arrayBuffer()
            buffer = Buffer.from(bytes)
            nameImage = dataFile.name
        }

        if (params.id != 'add') {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'title': artical.title,
                    'shot_description': artical.shot_description,
                    'description': artical.description,
                    'image_file': nameImage,
                    'buffer': buffer,
                })
            })
            const reuslt = await response.json()
            if (!reuslt.ok) {
                console.log(response)
            }
            RedirectPath('/artical')
        }
        else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/artical`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'title': artical.title,
                    'shot_description': artical.shot_description,
                    'description': artical.description,
                    'image_file': nameImage,
                    'buffer': buffer,
                })
            })
            const reuslt = await response.json()
            if (!reuslt.ok) {
                console.log(response)
            }
            RedirectPath('/artical')
        }

    }
    useEffect(() => {
        if (params.id != 'add') {
            initState()
        }

    }, [])

    return (
        <div className="container py-5">
            <div className="flex justify-center w-full">
                <div className="card w-96 shadow-xl  card-bg-color-defult ">
                    <div className="card-body">
                        <form onSubmit={handelOnSubmit}>
                            <h2 className="card-title">ADD Artical</h2>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text ">Title</span>
                                </div>
                                <input name="title" type="text" placeholder="Title.." className="input input-bordered w-full max-w-xs text-input-color-base-100" onChange={handelArtical} value={artical.title} />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text ">Short description</span>
                                </div>
                                <input name="shot_description" type="text" placeholder="Short description..." className="input input-bordered w-full max-w-xs text-input-color-base-100" onChange={handelArtical} value={artical.shot_description} />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text ">Description</span>
                                </div>
                                <textarea name="description" className="textarea textarea-bordered" placeholder="Description..." onChange={handelArtical} value={artical.description}></textarea>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Pick a Image To Artical</span>
                                </div>
                                <input name="image_file" type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={imageChange} />
                            </label>

                            {selectedImage && (
                                <div>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Preview Image</span>
                                        </div>
                                    </label>
                                    <Image
                                        src={URL.createObjectURL(selectedImage)}
                                        width={500}
                                        height={500}
                                        alt="Picture of the author"
                                    />

                                </div>
                            )}
                            {!selectedImage && (
                                <div>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Preview Image</span>
                                        </div>
                                    </label>
                                    {artical.image_file && (
                                        <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${artical.image_file}`}
                                        width={500}
                                        height={500}
                                        alt="Picture of the author"
                                    />
                                    )

                                    }
                                </div>
                            )}
                            <div className="card-actions justify-between pt-2">
                                <Link className="btn" href="/artical">Cancel</Link>
                                <button className="btn btn-accent" type="submit">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>

    )
}
