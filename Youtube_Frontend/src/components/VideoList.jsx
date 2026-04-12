import React, { useState, useEffect } from 'react'
import Video from './Video.jsx'
import '../css/homePage.css'
import { useOutletContext } from 'react-router-dom'

import API from '../api/axios.js'

function VideoList({ sidebarOpen }) {

    const categories = ["All", "Programming", "Tech", "Design", "AI", "Gaming", "Vlogs", "Music", "Education"]

    const [videos, setVideos] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")

    const {
        searchedVal,
        setSearchedVal,
        searchActive,
        setSearchActive
    } = useOutletContext()

    useEffect(() => {

        const fetchVideos = async () => {
            try {
                let query = ""

                if (searchActive && searchedVal.trim()) {
                    query = `?search=${searchedVal}`
                } 
                else if (selectedCategory !== "All") {
                    query = `?category=${selectedCategory}`
                }

                const { data } = await API.get(`/videos${query}`)

                console.log("API response:", data)

                // ✅ FINAL FIX
                setVideos(data.videos || [])

            } catch (err) {
                console.error("❌ Failed to load videos:", err.message)
                setVideos([])
            }
        }

        fetchVideos()

    }, [selectedCategory, searchedVal, searchActive])


    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat)
        setSearchedVal("")
        setSearchActive(false)
    }

    const effectiveCategory = searchActive ? "All" : selectedCategory


    return (
        <div className='home-page'>

            <div className='filter-options'>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${effectiveCategory === cat ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className='videoList'>

                {videos.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No videos found</p>
                ) : (
                    videos.map(video => (
                        <Video key={video._id} video={video} />
                    ))
                )}

            </div>

        </div>
    )
}

export default VideoList