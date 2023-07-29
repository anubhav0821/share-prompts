'use client'

import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";


const EditPrompt = () => {

  const router = useRouter();

    const searchParams = useSearchParams();
    const promptID = searchParams.get('id')


    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        if(!promptID) return  alert("Prompt ID is not available")

        try {
          const responce = await fetch(`/api/prompt/${promptID}`, {
            method: "PATCH",
            body: JSON.stringify({
              prompt: post.prompt,
              
              tag: post.tag
            })
          })
  
          if(responce.ok){
            router.push("/")
          }
  
        } catch (error) {
          console.log(error)
        } finally {
          setSubmitting(false)
        }
  
  
      }

    useEffect(() => {
        const getPromptDetails = async () => {
            const responce = await fetch(`/api/prompt/${promptID}`);
            const data = await responce.json();
            
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptID) getPromptDetails();
    }, [promptID]);

    

  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
     />
  )
}

export default EditPrompt