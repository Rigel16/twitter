import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMessagesList } from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';

function Messages() {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadConversations = async () => {
        try {
            setLoading(true);
            const data = await fetchMessagesList();
            setConversations(data);
            setError(null);
        } catch (error) {
            console.error('Error loading conversations', error);
            setError('Impossible de charger les conversations');
        } finally {
            setLoading(false);
        }
    };

    const filteredConversations = conversations.filter(conversation => 
        (conversation.display_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (conversation.username?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        loadConversations();
        const intervalId = setInterval(loadConversations, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const formatRelativeTime = (timeStr) => {
        return timeStr;
    };

    return (
        <div className="container-messages">
            <h1 className="header-messages">Messages</h1>
            
            <div className="search-bar">
                <span className="search-icon">
                    <FaSearch />
                </span>
                <input 
                    type="text" 
                    className="search-input"
                    placeholder="Rechercher dans les messages" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            
            {loading && <p className="text-center">Chargement des conversations...</p>}
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="message-list">
                {!loading && filteredConversations.length === 0 && (
                    <p className="text-center text-muted">Aucune conversation trouvée</p>
                )}
                
                {filteredConversations.map((conversation) => (
                    <div 
                        key={conversation.receiver_id}
                        className="message-item"
                        onClick={() => navigate(`/chatRoom/${conversation.receiver_id}`)}
                    >
                        <img 
                            src={conversation.avatarUrl || "https://via.placeholder.com/50"} 
                            alt="Avatar" 
                            className="message-avatar"
                        />
                        
                        <div className="message-content">
                            <h6 className="message-username">{conversation.display_name}</h6>
                            <p className="message-handle">@{conversation.username}</p>
                            <p className="message-preview">{conversation.last_message}</p>
                        </div>
                        <small className="message-time">
                            {formatRelativeTime(conversation.last_message_time)}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Messages;
