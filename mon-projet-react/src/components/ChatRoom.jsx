import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaRegSmile, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { sendMessage, fetchMessages, fetchUserProfile } from "../utils/api";

function ChatRoom() {
    const navigate = useNavigate();
    const { receiverId } = useParams(); 
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [receiverName, setReceiverName] = useState(""); // État pour le nom du destinataire

    const token = localStorage.getItem("userToken");
    const senderId = localStorage.getItem("userId");

    useEffect(() => {
        loadMessages();
        const messageInterval = setInterval(loadMessages, 5000); 
        return () => clearInterval(messageInterval);
    }, [receiverId, senderId, token]);

    // Récupérer les messages
    const loadMessages = async () => {
        if (!senderId || !receiverId || !token) return;
        try {
            const data = await fetchMessages(senderId, receiverId, token);
            setMessages(data);
        } catch (error) {
            console.error("Erreur lors du chargement des messages", error);
        }
    };

    // Récupérer le profil du destinataire
    useEffect(() => {
        const fetchReceiverName = async () => {
            try {
                const profileData = await fetchUserProfile(receiverId);
                setReceiverName(profileData.display_name); 
            } catch (error) {
                console.error("Erreur lors de la récupération du profil de l'utilisateur", error);
            }
        };

        fetchReceiverName();
    }, [receiverId]);

    // Envoyer un message
    const handleSendMessage = async () => {
        if (!message.trim() && !imageFile) return;
        const formData = new FormData();
        formData.append("sender_id", senderId);
        formData.append("receiver_id", receiverId);
        formData.append("content", message);

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const tempMessage = {
                sender_id: senderId,
                receiver_id: receiverId,
                content: message,
                image_url: imagePreview,
            };
            setMessages((prevMessages) => [...prevMessages, tempMessage]);
            await sendMessage(formData, token);
            setMessage("");
            setImageFile(null);
            setImagePreview(null);
            loadMessages();
        } catch (error) {
            console.error("Erreur lors de l'envoi du message", error);
        }
    };

    // Gérer la sélection de fichier image
    const handleFilePicker = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="chatroom">
            {/* Header */}
            <div className="chatroom__header">
                <button onClick={() => navigate(-1)} className="chatroom__back-btn">
                    <FaArrowLeft />
                </button>
                <p>Chat avec {receiverName || receiverId}</p> 
            </div>
    
            {/* Messages */}
            <div className="chatroom__messages">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`chatroom__message-container ${msg.sender_id == senderId ? "sent" : "received"}`}
                        >
                            <div className="chatroom__message">
                                {msg.content}
                                {msg.image_url && <img src={msg.image_url} alt="Image" className="chatroom__image" />}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">Aucun message</p>
                )}
            </div>
    
            {/* Input de message */}
            <div className="chatroom__input-container">
                <button className="chatroom__icon" onClick={() => setEmojiPicker(!emojiPicker)}>
                    <FaRegSmile />
                </button>
                {emojiPicker && (
                    <div className="emoji-picker">
                        <EmojiPicker onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)} />
                    </div>
                )}
    
                <label htmlFor="file-input" className="chatroom__icon">
                    <FaPaperclip />
                </label>
                <input 
                    id="file-input" 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFilePicker} 
                />
    
                {imagePreview && (
                    <div className="chatroom__preview">
                        <img src={imagePreview} alt="Preview" className="chatroom__preview-img" />
                        <button 
                            className="chatroom__remove-img" 
                            onClick={() => {
                                setImageFile(null);
                                setImagePreview(null);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                )}
    
                <input
                    type="text"
                    className="chatroom__input"
                    placeholder="Écrire un message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
    
                <button className="chatroom__send-btn" onClick={handleSendMessage}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};  

export default ChatRoom;
