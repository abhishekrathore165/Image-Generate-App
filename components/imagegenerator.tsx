'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2Icon } from 'lucide-react'
import axios from 'axios'
import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Imagegenerator = () => {
  const [prompt,setPrompt] = useState<string>("");
  const [loading,setloading] = useState<boolean>(false);
  const  [images,setImages] = useState<any[]>([]);

  useEffect(()=>{
  fetchImage();
  },[])
  
  const fetchImage = async()=>{
    const res = await axios.get("/api/generate");
    setImages(res.data.images)
  }

  const handleGenerateImage = async()=>{
    setloading(true)
    try{
      const res = await axios.post("/api/generate",{prompt})
      if(res.status === 200){
       fetchImage()
      }
      else{
        console.log("Something went wrong")
      }
    }
    catch(error){
       console.log(error)
    }
    finally{
      setPrompt("");
      setloading(false)
    }
  }
  return (
    <div className='flex flex-col items-center w-full h-full '>
      <h1 className='text-white  mt-5 lg:text-[3.5rem]  text-[2rem] px-5 font-bold '>Create <span className='bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-bold '>Powerful</span> AI art or <br />  image in seconds</h1>
      <div className="max-w-3xl w-full px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center  ">
          <div className="flex w-full items-center space-x-2 ">
            <Input type='text' value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder='Enter a prompt to generate an image' className='flex-1'/>
            <Button  onClick={handleGenerateImage} className='text-white bg-blue-400 fontbold' >
              {
                loading? <>Generate <Loader2Icon className='animate-spin size-4 ml-2' /> </>:"Generate"
              }
              </Button>
          </div>
          {images.length > 0?(<div className='mt-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full '>
            {
              images.map(image=>(
                <Dialog key={image._id}>
                  <DialogTrigger asChild >

                  <Card className='overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 '>
                    <CardContent className='p-0 flex items-center justify-center'>

                <Image src={image.imageUrl} alt={image.prompt} width={300} height={300} className='object-cover w-full aspect-square' />
                    </CardContent>
                  </Card>
                  </DialogTrigger>
                  <DialogContent className='pt-12  rounded-lg' >
                    <Image src={image.imageUrl} alt={image.prompt} width={600} height={600} className='object-cover w-full aspect-square' />
                    <p className="mt-4 text-center text-lg text-muted-foreground">
                      <strong>Prompt:</strong>
                      {image.prompt}
                    </p>
                  </DialogContent>
                </Dialog>
              ))
            }
          </div>):(<div className=' flex items-center justify-center'>
            <p className="text-lg textcenter text-muted-foreground">
              No Image found
            </p>
          </div>) }
        </div>
      </div>
    </div>
  )
}

export default Imagegenerator
