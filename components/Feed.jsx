'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard 
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)



  const filterPosts = (searchQuery) => {
    // creamos una expresión regular regex a partir del texto de búsqueda ingresado por el usuario
    const regex = new RegExp(searchQuery, 'i') // <- 'i' se utiliza para que la búsqueda sea insensible a mayúsculas y minúsculas

    const filteredPosts = posts.filter(post => 
      regex.test(post.creator.name) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    )
    return filteredPosts
  }

  const handleSearchChange = (evt) => {
    clearTimeout(searchTimeout)
    setSearchText(evt.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const filterResults = filterPosts(evt.target.value)
        setSearchResults(filterResults)  
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const filterResults = filterPosts(tag)
    setSearchResults(filterResults)
  }

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    getPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Busca por tag o usuario'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {
        !!searchText 
          ? <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
          : <PromptCardList data={posts} handleTagClick={handleTagClick} />
      }
      
    </section>
  )
}

export default Feed
