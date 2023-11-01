import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compareDesc, parseISO,format } from 'date-fns'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

// 博客存放路径
const postsDirectory = path.join(process.cwd(),'posts')
const filePathList = readFilesRecursively(postsDirectory)
export const allPost = getSortedPostsData()

// 遍历所有md文件
function readFilesRecursively(dir) {
    const files = fs.readdirSync(dir);
    const filePaths = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // 如果是子目录，递归调用 readFilesRecursively 函数
            readFilesRecursively(filePath);
            filePaths.push(...readFilesRecursively(filePath));
        } else {
            // 如果是文件，你可以在这里执行你的操作
            filePaths.push(filePath);
        }
    });
    return filePaths;
}

function getSortedPostsData(){

    const allPostsData = filePathList.map((filePath) =>{
        // 文件名
        const id = filePath.split('\\')[filePath.split('\\').length-1].replace(/\.md$|\.mdx$/,'');
        const fileName = filePath.split('\\')[filePath.split('\\').length-1]
        const url = ('/posts' + filePath.split('posts')[1]).replace(/\\/g, "/").replace(/\.md$|\.mdx$/,'')
        const sourceDirPath = filePath.split('posts')[1].replace(/\\/g, "/")
        // console.log(url)
        // const fullPath = path.join(postsDirectory,fileName);
        // 文件内容
        const fileContents = fs.readFileSync(filePath,'utf8')
        //md文件的元数据
        const matterResult = matter(fileContents)

        const blogPost: Blogpost = {
            id,
            fileName,
            sourceDirPath,
            title:matterResult.data.title,
            date:format(matterResult.data.date,'yyyy-MM-dd'),
            url:url,
            raw:matterResult.content

        }
        // 返回每个blog元数据对象
        return blogPost
    })

    // 按照时间排序博客
    return allPostsData.sort((a,b) => compareDesc(parseISO(a.date), parseISO(b.date)))
}

export async function getPostHtml(post) {
    const file = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .use(remarkGfm)
        .use(rehypeAutolinkHeadings)
        .use(rehypeSlug)
        .process(post.raw)
    return String(file)
}




