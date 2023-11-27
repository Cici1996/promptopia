'use client'

import React, { useEffect, useState } from 'react'
import PrompCard from './prompCard'

interface PromptCardListProps {
  data: any[],
  handleTagClick: (tag:string) => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PrompCard
        key={post?._id}
        post={post}
        handleTagClick={handleTagClick}
        handleDelete={() => {}}
        handleEdit={() => {}}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [post, setPost] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPost(data)
    }

    fetchPost()
  }, [])


  const handleSearchChange = (e: React.ChangeEvent) => {

  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          className='search_input peer'
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList
        data={post}
        handleTagClick={() => { }} />
    </section>
  )
}

export default Feed