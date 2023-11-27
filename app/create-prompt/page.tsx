"use client"

import Form from '@components/form'
import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })


  const createPrompt = async (e: React.ChangeEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
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
      type='Create'
      submitting={submitting}
      createPrompt={createPrompt}
      setPost={setPost}
      post={post}
    />
  )
}

export default CreatePrompt