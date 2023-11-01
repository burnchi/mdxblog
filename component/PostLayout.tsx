import React from 'react'
import PostItem from './PostItem'
import { allPost } from '@/lib/post'

const PostLayout = () => {
    // console.log(allPost)
    return (
        <div className='flex flex-col items-center justify-center'>
            {
                allPost.map(post => <PostItem post={post} key={post.id} />)
            }
        </div>
    )
}

export default PostLayout