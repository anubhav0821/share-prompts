'use client'

import { useState, useEffect } from "react"
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

const handleSearchChange = (e) => {

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
    data={posts}
    handleTagClick={()=>{}}
     />
    </section>
  )
}

export default Feed