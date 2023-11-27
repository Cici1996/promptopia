"use client"

import Form from '@components/form'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';

const UpdatePrompt = () => {
    const router = useRouter();
    const { data: session }: any = useSession();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data?.prompt,
                tag: data?.tag
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])



    const UpdatePrompt = async (e: React.ChangeEvent) => {
        e.preventDefault()
        setSubmitting(true)
        if(!promptId) alert('Prompt ID is Missing')
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {

        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type='Edit'
            submitting={submitting}
            createPrompt={UpdatePrompt}
            setPost={setPost}
            post={post}
        />
    )
}

export default UpdatePrompt