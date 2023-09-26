'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'

const UserProfile = ({ params }) => {

  const searchParams  = useSearchParams()
  const userName = searchParams.get('name')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if(params?.id) getPosts()
  }, [])

  return (
    <Profile 
      name={`${userName}`}
      description={`Bienvenido a la página de usuario de ${userName}. Aquí puedes ver todos los prompts que ha creado. `}
      data={posts}
    />
    
  ) 
}

export default UserProfile
