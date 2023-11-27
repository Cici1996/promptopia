import React from 'react'
import PrompCard from './prompCard'

interface ProfileProps {
  name: string,
  desc: string,
  data: any[],
  handleEdit: (data: any) => void,
  handleDelete: (data: any) => void
}

const Profile = ({ name, desc, data, handleDelete, handleEdit }: ProfileProps) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PrompCard
            key={post?._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile