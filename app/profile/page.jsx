'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MyProfile = () => { 

  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${session.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if(session?.user.id) getPosts()
  }, [])


  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('¿Estás seguro que deseas eliminar este prompt?')
    if(hasConfirmed){
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
 
        const filteredPost = posts.filter(p => p._id !== post._id)
        setPosts(filteredPost)
  
        if(response.ok){
          router.push('/')
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <Profile 
      name='Mi'
      description='Bienvenido a tu página de perfil de usuario'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
