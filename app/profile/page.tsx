'use client'

import Profile from '@components/profile'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
    const { data: session }: any = useSession();
    const router = useRouter()
    const [post, setPost] = useState<any[]>([])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${session?.user?.id}/posts`)
            const data = await response.json()
            setPost(data)
        }

        if (session?.user?.id) fetchPost()
    }, [session?.user?.id])

    const handleEdit = (postData: any) => {
        router.push(`/update-prompt?id=${postData?._id}`)
    }


    const handleDelete = async (postData: any) => {
        const hasConfimr = confirm('Are you sure to delete this data?')
        if (hasConfimr) {
            try {
                await fetch(`/api/prompt/${postData?._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPost = post?.filter((p) => p?._id !== postData?._id)
                setPost(filteredPost)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="welcome to your personalized profile page"
            data={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default page