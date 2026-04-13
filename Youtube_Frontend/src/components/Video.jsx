import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import '../css/homePage.css'

// Video card component
function Video({ video }) {

    const {
        _id,
        title,
        channel,
        views,
        thumbnail,
        uploadDate
    } = video

    return (
        <div className='video'>

            {/* 🎬 Thumbnail */}
            <Link className='video-pic' to={`/video/${_id}`}>
                <img
                    src={thumbnail || "https://img.youtube.com/vi/7u6-hMqBoWo/mqdefault.jpg"}
                    alt={title}
                    className='thumbnail'
                />
            </Link>

            <div>

                {/* 👤 Channel Image */}
                <figure className='channel'>
                    <Link to={`/channels/${channel?._id || ""}`}>
                        <img
                            src={channel?.channelPic || "https://img.youtube.com/vi/bupN-xuCVt4/mqdefault.jpg"}
                            alt={channel?.channelName || "Channel"}
                            className='channel-icon'
                        />
                    </Link>
                </figure>

                <div>

                    {/* 🎥 Title */}
                    <Link to={`/video/${_id}`}>
                        <div className='video-title'>{title}</div>
                    </Link>

                    {/* 📺 Channel Name */}
                    <Link to={`/channels/${channel?._id || ""}`}>
                        <div className='channel-name'>
                            {channel?.channelName || "Unknown Channel"}
                        </div>
                    </Link>

                    {/* 👁 Views + Date */}
                    <div className='views'>
                        {views || 0} views

                        <span className="video-card-date">
                            {uploadDate
                                ? " • " + formatDistanceToNow(new Date(uploadDate), { addSuffix: true }).replace('about ', '')
                                : ""}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Video