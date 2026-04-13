import React, { useState } from "react";
import "../css/createChannel.css";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";

function CreateChannel() {
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    channelPic: "",
    channelBanner: "",
  });

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Login first");
      return;
    }

    const trimmed = {
      channelName: form.channelName.trim(),
      description: form.description.trim(),
      channelPic: form.channelPic.trim(),
      channelBanner: form.channelBanner.trim(),
    };

    if (!trimmed.channelName) {
      alert("Channel name required");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/channels", trimmed);

      console.log("CHANNEL RESPONSE:", res.data);

      // ✅ SAFE HANDLING
      const channel = res.data.data || res.data;

      if (!channel?._id) {
        throw new Error("Channel ID not found in response");
      }

      setUser({ ...user, channelId: channel._id });

      alert("✅ Channel created");
      navigate("/channel");
    } catch (err) {
      console.error(err);
      alert("Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-channel-modal-bg">
      <div className="create-channel-modal">
        <h2 className="create-channel-title">How you'll appear</h2>

        <form className="create-channel-form" onSubmit={handleSubmit}>
          {/* 👤 Avatar Preview */}
          <div className="create-channel-avatar-section">
            <img
              src={form.channelPic || "https://placehold.co/84x84?text=You"}
              alt="avatar"
              className="create-channel-avatar"
            />

            <input
              type="url"
              name="channelPic"
              placeholder="Channel picture URL"
              value={form.channelPic}
              onChange={handleChange}
              className="create-channel-input"
            />
          </div>

          {/* 📝 Fields */}
          <div className="create-channel-fields">
            <label className="create-channel-label">Name</label>
            <input
              name="channelName"
              type="text"
              placeholder="Channel name"
              value={form.channelName}
              onChange={handleChange}
              className="create-channel-input"
              required
            />

            <label className="create-channel-label">Description</label>
            <textarea
              name="description"
              placeholder="Channel description"
              value={form.description}
              onChange={handleChange}
              className="create-channel-input"
              rows={2}
            />

            <label className="create-channel-label">Banner URL</label>
            <input
              name="channelBanner"
              type="url"
              placeholder="Channel banner URL"
              value={form.channelBanner}
              onChange={handleChange}
              className="create-channel-input"
            />
          </div>

          {/* 🎯 Buttons */}
          <div className="create-channel-actions">
            <button
              type="button"
              className="create-channel-cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-channel-submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

          {/* 📄 Terms */}
          <div className="create-channel-terms">
            By clicking Create, you agree to our Terms of Service.
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;
