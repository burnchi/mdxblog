import Link from 'next/link'
import React from 'react'

const PostItem = ({ post }) => {
    return (
        <Link href={post.url} className=''>
            <div className='border-b text-base'>
                <h1>{post.title}</h1>
                <h1>{post.date}</h1>
            </div>
        </Link>
    )
}

export default PostItem