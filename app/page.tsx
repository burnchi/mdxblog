import PostLayout from '@/component/PostLayout'
import PostItem from '@/component/PostLayout'
import Image from 'next/image'

export default function Home() {
  // console.log(allPost)
  return (
    <div className='flex-1'>
      <PostLayout/>
    </div>
   
  )
}
