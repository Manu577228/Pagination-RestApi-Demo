import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import './PaginationExample.css' 
import Posts from './Posts'
import axios from 'axios'

const PaginationExample = () => {
 
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [postsPerPage, setPostsPerPage] = useState(10)

useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true)   
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        console.log(response.data)
        setPosts(response.data)
        setLoading(false)
    }
     fetchPosts()
    console.log(setPosts)
}, []);

//Get Current Posts

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

// Change Page
const paginate = pageNumber => setCurrentPage(pageNumber)
    return (
        <div className='container'>
          <h1 className='text'>My Blog</h1>
          <Posts posts={currentPosts} loading={loading} /> 
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
    )
}

export default PaginationExample
