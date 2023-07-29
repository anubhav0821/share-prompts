'use client'

import { useState, useEffect, useCallback } from "react"
import PromptCard from "./PromptCard"

const Feed = () => {
  
  const PromptCardList = ({data, handleTagClick}) => {
      return (
        <div className="mt-16 prompt_layout">
          {data.map((post) => (
            <PromptCard 
            key = {post._id}
            post={post}
            handleTagClick={handleTagClick}
            
             />
          ))}
          
        </div>
      )
  }

const [searchText, setSearchText] = useState('');

const [posts, setPosts] = useState([]);

const [filteredPost, setFilteredPost] = useState(posts);


//Search handler 
const searchHandler = useCallback(() => {
  const filteredPost = posts.filter((post) => {
    
      return ( post.prompt.toLowerCase().includes(searchText.toLowerCase())
              || post.tag.toLowerCase().includes(searchText.toLowerCase()) 
              || post.creator.username.toLowerCase().includes(searchText.toLowerCase()) 
      )
    
  })
  
  setFilteredPost(filteredPost);
  
},[posts,searchText])

// Effect: Search handler
useEffect(() => {
  //Debounce search handler
  const timer = setTimeout(() => {
    searchHandler()
  }, 500)

  //Cleanup
  return () => {
    clearTimeout(timer)
  }
},[searchHandler])





const handleSearchChange = (e) => {
  setSearchText(e.target.value)
}
useEffect (() => {
  const fetchPosts = async() => {
    const responce = await fetch('/api/prompt');
    const data = await responce.json();

    setPosts(data)
  }
  fetchPosts();
})

  
  return (
    <section className="feed">
    <form className="relative w-full flex-center">
      <input type='text' placeholder="Search for prompts or tags"
      value={searchText}
      onChange={handleSearchChange}
      required
      className="search_input peer"
       />
    </form>

    <PromptCardList
    data={searchText.length > 0 ? filteredPost : posts}
    handleTagClick={(e)=>{
      setSearchText(e)
    }}
     />
    </section>
  )
}

export default Feed