import { allPost, getPostHtml } from '@/lib/post'
import React from 'react'



const PostPage = async ({ params }) => {
    console.log(params.slug)
    const post = allPost.find(post => post.id === decodeURI(params.slug[params.slug.length-1]))
    const postHtml = await getPostHtml(post)

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className=' text-4xl font-bold mb-10 mt-5'>{post.title}</h1>
            <article className='prose' dangerouslySetInnerHTML={{ __html: postHtml }}></article>
        </div>
    )
}

export default PostPage