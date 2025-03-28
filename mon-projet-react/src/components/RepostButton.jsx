import React from 'react';
import { RefreshCw } from 'lucide-react';

const RepostButton = ({ postId, isReposted, repostCount, onRepost }) => {
  const handleRepost = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"}/api/posts/${postId}/repost`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Repost failed");
      }
      onRepost(data.reposted ? 'reposted' : 'unreposted');
    } catch (error) {
      console.error("Error toggling repost:", error);
    }
  };

  return (
    <button
      className={`btn ${isReposted ? 'text-success' : 'text-secondary'}`}
      style={{ background: 'transparent' }}
      onClick={handleRepost}
    >
      <RefreshCw size={20} />
      {repostCount > 0 && <span className="ms-1">{repostCount}</span>}
    </button>
  );
};

export default RepostButton;