'use client'

import { useState, useEffect } from "react"

import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const UserProfile = ({params}) => {

  const searchParams = useSearchParams();
  const username = searchParams.get('name');
  

  const [posts, setPosts] = useState('');

  useEffect (() => {
    const fetchPosts = async() => {
      const responce = await fetch(`/api/users/${params?.id}/posts`);
      const data = await responce.json();
  
      setPosts(data)
    }
    if(params?.id) {
      fetchPosts();
    }
  },[params.id])

 

  return (
    <Profile
    name= {username}
    desc={`Welcome to ${username} profile page.`}
    data = {posts}
     />
  )
}

export default UserProfile