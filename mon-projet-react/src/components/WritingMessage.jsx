import React, { useState, useEffect, useRef } from "react";
import { Smile, Image as ImageIcon, X as XIcon, Users } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { API_URL } from "../utils/api";
import { fetchFollowing } from "../utils/api";
const WritingMessage = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [following, setFollowing] = useState([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const [mentionPosition, setMentionPosition] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/user`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUserId(data.id);
          fetchFollowing(data.id)
            .then(followingData => {
              setFollowing(followingData);
            })
            .catch(error => console.error("Erreur lors de la récupération des abonnements:", error));
        } else {
          console.error(" Erreur récupération user:", data);
        }
      } catch (error) {
        console.error(" Erreur API user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleFilePicker = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setMediaFiles((prevFiles) => [...prevFiles, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setMediaPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const toggleEmojiPicker = () => {
    setEmojiPicker(!emojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    
    // Détecter si l'utilisateur tape "@" pour déclencher les suggestions
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = newMessage.substring(0, cursorPosition);
    const atSymbolIndex = textBeforeCursor.lastIndexOf('@');
    
    if (atSymbolIndex !== -1 && (atSymbolIndex === 0 || textBeforeCursor[atSymbolIndex - 1] === ' ')) {
      const mentionText = textBeforeCursor.substring(atSymbolIndex + 1);
      setMentionFilter(mentionText);
      setShowMentions(true);
      setMentionPosition(atSymbolIndex);
    } else {
      setShowMentions(false);
    }
  };

  const selectMention = (user) => {
    const beforeMention = message.substring(0, mentionPosition);
    const afterMention = message.substring(mentionPosition + mentionFilter.length + 1);
    // Ajouter un identifiant unique entre accolades après le nom
    const newMessage = `${beforeMention}${user.display_name}{${user.id}} ${afterMention}`;
    setMessage(newMessage);
    setShowMentions(false);
    
    // Réajuster la position du curseur
    setTimeout(() => {
      const newCursorPosition = mentionPosition + user.display_name.length + 4 + user.id.toString().length; // +4 pour @{} et espace
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const sendPost = async () => {
    const token = localStorage.getItem("userToken");
    if (!userId) {
      alert("Utilisateur non connecté !");
      return;
    }
    if (!message.trim() && mediaFiles.length === 0) {
      alert("Message cannot be empty!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("content", message);
      mediaFiles.forEach((file) => {
        formData.append("media[]", file);
      });

      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create post");
      }

      alert("Post created successfully!");
      setMessage("");
      setMediaFiles([]);
      setMediaPreviews([]);
    } catch (error) {
      console.error("Error creating post:", error);
      alert(`Failed to create post: ${error.message}`);
    }
  };

  const filteredFollowing = following.filter(user => 
    user.display_name.toLowerCase().includes(mentionFilter.toLowerCase())
  );

  return (
    <div className="tweet-box">
      <textarea
        ref={textareaRef}
        className="tweet-input"
        placeholder="Quoi de neuf ?"
        value={message}
        onChange={handleMessageChange}
        rows="3"
      />

      {/* Système de suggestions d'utilisateurs */}
      {showMentions && filteredFollowing.length > 0 && (
        <div className="mention-suggestions">
          {filteredFollowing.map((user) => (
            <div 
              key={user.id} 
              className="mention-item" 
              onClick={() => selectMention(user)}
            >
              <img src={user.profile_picture} alt={user.display_name} className="mention-avatar" />
              <span className="mention-name">{user.display_name}</span>
            </div>
          ))}
        </div>
      )}

      {mediaPreviews.length > 0 && (
        <div className="media-preview">
          {mediaPreviews.map((preview, index) => (
            <div key={index} className="media-item">
              <img src={preview} alt="media-preview" className="media-img" />
              <button className="remove-media" onClick={() => removeMedia(index)}>
                <XIcon size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="tweet-actions">
        <div className="icons">
          <button onClick={toggleEmojiPicker} className="emoji-btn">
            <Smile size={20} />
          </button>
          <label className="image-btn">
            <ImageIcon size={20} />
            <input type="file" accept="image/*" onChange={handleFilePicker} multiple />
          </label>
          <button className="mention-btn" onClick={() => {
            setMessage(prev => prev + "@");
            setTimeout(() => {
              textareaRef.current.focus();
              const cursorPosition = textareaRef.current.selectionStart;
              setMentionPosition(cursorPosition - 1);
              setShowMentions(true);
              setMentionFilter("");
            }, 0);
          }}>
            <Users size={20} />
          </button>
        </div>
        <button className="tweet-btn" onClick={sendPost} disabled={!message.trim() && mediaFiles.length === 0}>
          Publier
        </button>
      </div>

      {emojiPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
    </div>
  );
};

export default WritingMessage;