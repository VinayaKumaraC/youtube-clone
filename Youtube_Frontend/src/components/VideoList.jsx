import React, { useState, useEffect } from 'react'
import Video from './Video.jsx'
import '../css/homePage.css'
import { useOutletContext } from 'react-router-dom'

import API from '../api/axios.js'

// VideoList component
function VideoList({ sidebarOpen }) {

    // ✅ include all categories present in DB
    const categories = [
        "All",
        "Programming",
        "Tech",
        "Design",
        "AI",
        "Gaming",
        "Vlogs",
        "Music",
        "Education",
        "News",
        "Sports"
    ]

    const [videos, setVideos] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")

    const {
        searchedVal,
        setSearchedVal,
        searchActive,
        setSearchActive
    } = useOutletContext()

    // ==============================
    // 🎥 FETCH VIDEOS FROM BACKEND
    // ==============================
    useEffect(() => {

        const fetchVideos = async () => {
            try {
                let query = ""

                // search
                if (searchActive && searchedVal.trim()) {
                    query = `?search=${searchedVal}`
                }
                // category
                else if (selectedCategory !== "All") {
                    query = `?category=${selectedCategory}`
                }

                const { data } = await API.get(`/videos${query}`)

                console.log("API response:", data)

                // ✅ handle backend structure safely
                setVideos(Array.isArray(data.data) ? data.data : [])

            } catch (err) {
                console.error("❌ Failed to load videos:", err.message)
                setVideos([])
            }
        }

        fetchVideos()

    }, [selectedCategory, searchedVal, searchActive])


    // ==============================
    // 🎯 CATEGORY CLICK
    // ==============================
    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat)
        setSearchedVal("")
        setSearchActive(false)
    }

    const effectiveCategory = searchActive ? "All" : selectedCategory


    return (
        <div className='home-page'>

            {/* 🔘 Category filter buttons */}
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

            {/* 🎬 Video Grid */}
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