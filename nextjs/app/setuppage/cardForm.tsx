'use client'
import React, { useEffect, useState } from 'react'
import { GetSetUpPageById, StoreSetUpPage, UpdateSetUpPageById } from "./api/setuppageAPI"
import { RedirectPath } from "../components/redirectpath"

export function CardForm() {
    const [data, setData] = useState({
        'title': '',
        'description': '',
        'keywords': '',
        'title_id': null,
    })
    // for Image
    const [selectedImage, setSelectedImage] = useState();
    const [file, setFile] = useState<File>()
    // for Preview
    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setFile(e.target.files[0])
        }
    };

    const initState = async () => {
        const response = await GetSetUpPageById(1)
        const result = await response
        if (result?.data)
        {
            const datas = {
                'title': result.data?.title,
                'description': result.data?.description,
                'keywords': result.data?.keywords,
                'title_id': result.data?.id
            }
            setData(datas)
        }
    }

    const handelForm = (e: any) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value,

        }))
    }
    const handelOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(data)
        const dataFile: File | null = file as unknown as File
        let buffer = null
        let nameImage = null
        // buffer image
        if (dataFile) {
            const bytes = await dataFile.arrayBuffer()
            buffer = Buffer.from(bytes)
            nameImage = dataFile.name
        }
        if (data.title_id)
        {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/setUpPage/${data.title_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'title': data.title,
                    'description': data.description,
                    'keywords': data.keywords,
                    'image_file': nameImage,
                    'buffer': buffer,
                })
            })
            const reuslt = await response.json()
            if (!reuslt.ok) {
                console.log(response)
            }
            // console.log('update')
            // const response = await UpdateSetUpPageById(data.title_id, data)
            // const result = await response

            RedirectPath("/")
        }
        else 
        {
            console.log('add')
            const response = await StoreSetUpPage(data)
            const result = await response
    
            RedirectPath("/")
        }
        
    }
    useEffect(()=>{
        initState()
    }, [])
    return (
        <div>
            <div className="card card-bg-color-defult shadow-xl flex justify-center ">
                <div className="card-body">
                    <form onSubmit={handelOnSubmit}>
                        <h2 className="card-title flex w-full justify-center">Setup</h2>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input name="title" type="text" placeholder="meta title ..." className="input input-bordered w-full max-w-xs" onChange={handelForm} value={data.title} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea  name="description" placeholder="meta description ..." className="textarea textarea-bordered"  onChange={handelForm} value={data.description} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Keywords</span>
                            </div>
                            <div className="label">
                                <span className="label-text">Exmple. artical,banner,...</span>
                            </div>
                            <input  name="keywords" type="text" placeholder="meta keywords ..." className="input input-bordered w-full max-w-xs"  onChange={handelForm} value={data.keywords} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Icon</span>
                            </div>
                            <input name="image_file" type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={imageChange} accept="image/png" />
                        </label>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary">SetUp</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
