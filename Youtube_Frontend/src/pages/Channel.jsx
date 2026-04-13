import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import YourChannel from '../components/YourChannel.jsx'
import CreateChannel from '../components/CreateChannel.jsx'
import { useOutletContext } from 'react-router-dom'

// Channel page
function Channel() {

    const { user } = useAuth()
    const { sidebarOpen } = useOutletContext()

    return (
        <div className='channel-page'>
            {/* if user has channel → show it, else create */}
            {user?.channelId ? <YourChannel /> : <CreateChannel />}
        </div>
    )
}

export default Channel