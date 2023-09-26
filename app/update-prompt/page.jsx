'use client'
import { useEffect, useState } from 'react' 
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)

  const [post, setPost] = useState({
    prompt: '',
    tag:''
  })

  useEffect(() => {
    const promptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    } 
    if (promptId) promptDetails()
  }, [promptId])

  const updatePrompt = async (evt) => {
    evt.preventDefault()
    setSubmitting(true)

    if(!promptId) return alert('El ID del prompt no ha sido encontrado')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if(response.ok){
        router.push('/')
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form 
      type='Editar'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
