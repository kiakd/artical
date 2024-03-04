'use client'
import React, { useEffect, useState } from 'react'
import { GetBannerById } from "../api/bannerAPI";
import { RedirectPath } from "@/app/components/redirectpath";
import Link from "next/link";
import Image from 'next/image'

export default function page({ params }) {
    const [selectedImage, setSelectedImage] = useState();
    const [file, setFile] = useState<File>()
    const [banner, setBanner] = useState({
        'name': '',
        'is_active': '',
        'image_file': '',
    })
    // for Preview
    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setFile(e.target.files[0])
        }
    }
    const initState = async () => {
        const data = await GetBannerById(params.id)
        if (data) {
            const result = {
                'name': data.data.name,
                'is_active': data.data.is_active,
                'image_file': data.data?.image_file ?? '',
            }
            result['is_active'] ? SetRaidoActive('ACTIVE') : SetRaidoActive('NONE')
            
            setBanner(result)
        }

    }
    const handelForm = (e: any) => {
        const { name, value } = e.target
        setBanner((prev) => ({
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'name': banner.name,
                    'is_active': raidoActive == 'ACTIVE' ? true : false,
                    'image_file': nameImage,
                    'buffer': buffer,
                })
            })
            const reuslt = await response.json()
            if (!reuslt.ok) {
                console.log(response)
            }
            RedirectPath('/banner')
        }
        else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banner`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'name': banner.name,
                    'is_active': raidoActive == 'ACTIVE' ? true : false,
                    'image_file': nameImage,
                    'buffer': buffer,
                })
            })
            const reuslt = await response.json()
            if (!reuslt.ok) {
                console.log(response)
            }
            RedirectPath('/banner')
        }

    }
    const [raidoActive, SetRaidoActive] = useState();

    useEffect(()=>{
        if (params.id != 'add') {
            initState()
            
            
        }
        else
        {
            SetRaidoActive('ACTIVE')
        }
        
    }, [])
    return (
        <div className="container py-5">
            <div className="flex justify-center w-full">
                <div className="card w-96 shadow-xl  card-bg-color-defult ">
                    <div className="card-body">
                        <form onSubmit={handelOnSubmit}>
                            <h2 className="card-title">ADD Banner</h2>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text ">Name Banner</span>
                                </div>
                                <input name="name" type="text" placeholder="name.." className="input input-bordered w-full max-w-xs text-input-color-base-100" onChange={handelForm} value={banner.name} />
                            </label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Active</span>
                                    <input type="radio" name="is_active" value="ACTIVE" className="radio checked:bg-red-500"  onChange={e=> SetRaidoActive(e.target.value)} checked={raidoActive == 'ACTIVE'} />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">None Active</span>
                                    <input type="radio" name="is_active" value="NONE" className="radio checked:bg-red-500" onChange={e=> SetRaidoActive(e.target.value)}  checked={raidoActive == 'NONE'}/>
                                </label>
                            </div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Pick a Image To Banner</span>
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
                                    {banner.image_file && (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.image_file}`}
                                            width={500}
                                            height={500}
                                            alt="Picture of the author"
                                        />)
                                    }

                                </div>
                            )}
                            <div className="card-actions justify-between pt-2">
                                <Link className="btn" href="/banner">Cancel</Link>
                                <button className="btn btn-accent" type="submit">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}
