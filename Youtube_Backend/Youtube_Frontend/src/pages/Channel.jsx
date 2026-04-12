// shows channel + videos

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    API.get(`/channels/${id}`).then((res) => setChannel(res.data));
  }, [id]);

  if (!channel) return <p>Loading...</p>;

  return (
    <div>
      <h2>{channel.channelName}</h2>
      <p>{channel.description}</p>

      {channel.videos.map((v) => (
        <p key={v._id}>{v.title}</p>
      ))}
    </div>
  );
}

export default Channel;