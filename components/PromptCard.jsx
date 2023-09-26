'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {

  const { data: session } = useSession()
  const pathname = usePathname()
  const [copied, setCopied] = useState('')
  const router = useRouter()
  
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() =>  setCopied(''), 3000)
  }

  const handleClickUserProfile = () => {
    session && post.creator._id === session.user.id && router.push('/profile')
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div 
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleClickUserProfile}
        >
          <Image 
            src={post.creator.image}
            width={40}
            height={40}
            className='rounded-full object-contain'
            alt='user_image'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>
        <div className='copy_btn' onClick={() => handleCopy()}>
          <Image
            src={copied === post.prompt ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg'}
            width={12}
            height={12}
            alt='copy_icon'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p 
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === '/profile' && 
        (
          <div className='mt-5 flex-center gap-4 border-t pt-3'>
            <p 
              className='font-inter text-sm green_gradient cursor-pointer' 
              onClick={handleEdit}
            >
              Editar
            </p>
            <p 
              className='font-inter text-sm orange_gradient cursor-pointer' 
              onClick={handleDelete}
            >
              Eliminar
            </p>
          </div>
        ) 
      }
    </div>
  )
}

export default PromptCard