import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../css/channel.css'
import { useAuth } from '../contexts/AuthContext.jsx'
import { BsThreeDotsVertical } from "react-icons/bs"

// ✅ use centralized API
import API from '../api/axios.js'

// View other user's channel
function Channels() {

    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const [channel, setChannel] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [descExpanded, setDescExpanded] = useState(false)

    // ==============================
    // 🔁 REDIRECT IF OWN CHANNEL
    // ==============================
    useEffect(() => {
    if (user && id && user.channelId === id) {
        navigate("/channel")
    }
}, [user, id, navigate])

    // ==============================
    // 📡 FETCH CHANNEL DATA
    // ==============================
    useEffect(() => {

        const fetchChannel = async () => {
            try {
                setLoading(true)
                setError(null)

                const res = await API.get(`/channels/${id}`)

                // ✅ backend structure fix
                const data = res.data.data || res.data
                setChannel(data)

            } catch (err) {
                console.error(err)
                setError("Failed to load channel")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchChannel()

    }, [id])


    // ==============================
    // ⏳ STATES
    // ==============================
    if (loading) return <div style={{ padding: 32 }}>Loading...</div>
    if (error) return <div style={{ padding: 32, color: 'red' }}>{error}</div>
    if (!channel) return null


    // ==============================
    // 📄 DESCRIPTION LOGIC
    // ==============================
    const descLimit = 180
    const showMore = channel.description?.length > descLimit

    const descToShow = descExpanded || !showMore
        ? channel.description
        : channel.description.slice(0, descLimit)


    return (
        <div className="channel-page" style={{ flex: 1 }}>

            {/* 🔝 Banner */}
            <div className="channel-banner-container">
                <img
                    className="channel-banner"
                    src={channel.channelBanner || "https://img.youtube.com/vi/7u6-hMqBoWo/mqdefault.jpg"}
                    alt="banner"
                />
            </div>

            {/* 👤 Header */}
            <div className="channel-header">

                <img
                    className="channel-avatar"
                    src={channel.channelPic || "https://img.youtube.com/vi/bupN-xuCVt4/mqdefault.jpg"}
                    alt={channel.channelName}
                />

                <div className="channel-info">

                    <div className="channel-title">
                        {channel.channelName}
                    </div>

                    <div className="channel-meta">
                        <span>@{channel.channelName?.toLowerCase().replace(/\s/g, '')}</span>
                        <span className="channel-dot">·</span>
                        <span>{channel.subscribers || 0} subscribers</span>
                        <span className="channel-dot">·</span>
                        <span>{channel.videos?.length || 0} videos</span>
                    </div>

                    {/* 📝 Description */}
                    <div className="channel-desc">
                        {descToShow}

                        {showMore && !descExpanded && (
                            <span onClick={() => setDescExpanded(true)}> ...more</span>
                        )}

                        {showMore && descExpanded && (
                            <span onClick={() => setDescExpanded(false)}> Show less</span>
                        )}
                    </div>

                    <div className="channel-actions">
                        <button className="channel-btn subscribe">
                            Subscribe
                        </button>
                    </div>

                </div>
            </div>

            {/* 📂 Tabs */}
            <div className="channel-tabs">
                <div className="channel-tab">Home</div>
                <div className="channel-tab active">Videos</div>
                <div className="channel-tab">Shorts</div>
                <div className="channel-tab">Playlists</div>
            </div>

            {/* 🎬 Videos */}
            <div className="channel-videos-list">

                {channel.videos?.map(video => (
                    <div className="channel-video-card" key={video._id}>

                        <Link to={`/video/${video._id}`}>
                            <img
                                className="channel-video-thumb"
                                src={video.thumbnail || "https://via.placeholder.com/300x180"}
                                alt={video.title}
                            />
                        </Link>

                        <div className="channel-video-info">
                            <div className="channel-video-title">
                                {video.title}
                            </div>

                            <div className="channel-video-meta">
                                <span>{video.views} views</span>
                                <span className="channel-dot">·</span>
                                <span>
                                    {video.uploadDate
                                        ? new Date(video.uploadDate).toLocaleDateString()
                                        : ""}
                                </span>
                            </div>
                        </div>

                        <div className="channel-video-actions">
                            <BsThreeDotsVertical />
                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default Channels