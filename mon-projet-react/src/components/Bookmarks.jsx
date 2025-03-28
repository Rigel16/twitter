import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Heart, MessageCircle, Bookmark, RefreshCw } from "lucide-react";
const styles = {
container: {
maxWidth: "800px",
margin: "0 auto",
padding: "20px",
color: "#f8f9fa"
},
header: {
display: "flex",
alignItems: "center",
marginBottom: "24px"
},
title: {
fontSize: "1.75rem",
fontWeight: "bold",
margin: "0 0 0 15px",
color: "#f8f9fa"
},
backButton: {
background: "transparent",
border: "none",
color: "#f8f9fa",
fontSize: "1.2rem",
cursor: "pointer",
padding: "8px",
borderRadius: "50%",
display: "flex",
alignItems: "center",
justifyContent: "center"
},
searchContainer: {
marginBottom: "24px"
},
searchInput: {
width: "100%",
padding: "12px 16px",
backgroundColor: "#2d2d2d",
color: "#f8f9fa",
border: "1px solid #444",
borderRadius: "20px",
fontSize: "0.95rem"
},
emptyState: {
textAlign: "center",
padding: "40px 20px",
backgroundColor: "#1a1a1a",
borderRadius: "12px",
marginTop: "20px"
},
emptyStateTitle: {
fontSize: "1.5rem",
fontWeight: "bold",
marginBottom: "16px",
color: "#f8f9fa"
},
emptyStateText: {
fontSize: "1rem",
color: "#adb5bd",
maxWidth: "450px",
margin: "0 auto"
},
postCard: {
backgroundColor: "#1a1a1a",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
marginBottom: "20px",
padding: "16px"
},
postHeader: {
display: "flex",
alignItems: "center",
marginBottom: "12px"
},
profileImage: {
width: "48px",
height: "48px",
borderRadius: "50%",
objectFit: "cover",
border: "2px solid #444"
},
userInfo: {
marginLeft: "12px"
},
username: {
color: "#f8f9fa",
fontWeight: "600",
fontSize: "1.05rem",
marginBottom: "4px"
},
timestamp: {
color: "#adb5bd",
fontSize: "0.8rem"
},
postContent: {
fontSize: "1rem",
lineHeight: "1.5",
color: "#f8f9fa",
margin: "16px 0"
},
postMedia: {
width: "100%",
borderRadius: "8px",
marginBottom: "16px",
maxHeight: "400px",
objectFit: "cover"
},
actionsContainer: {
display: "flex",
justifyContent: "space-between",
borderTop: "1px solid #333",
paddingTop: "12px",
marginTop: "12px"
},
actionButton: {
backgroundColor: "transparent",
border: "none",
color: "#adb5bd",
display: "flex",
alignItems: "center",
cursor: "pointer",
padding: "8px 12px",
borderRadius: "20px"
},
loadingSpinner: {
display: "flex",
justifyContent: "center",
alignItems: "center",
padding: "40px"
}
};

function Bookmarks() {
const navigate = useNavigate();
const [savedPosts, setSavedPosts] = useState([]);
const [filteredPosts, setFilteredPosts] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Récupérer les posts sauvegardés lors du chargement du composant
useEffect(() => {
fetchSavedPosts();
}, []);

useEffect(() => {
if (searchQuery.trim() === "") {
    setFilteredPosts(savedPosts);
} else {
    const filtered = savedPosts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
}
}, [searchQuery, savedPosts]);

const fetchSavedPosts = async () => {
try {
    setLoading(true);
    const token = localStorage.getItem("userToken");

    if (!token) {
    navigate("/login");
    return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/bookmarks", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    });

    if (!response.ok) {
    throw new Error("Impossible de récupérer les posts sauvegardés");
    }

    const data = await response.json();
    console.log("Données reçues:", data); 

    if (!Array.isArray(data)) {
    throw new Error("Format de données incorrect");
    }

    setSavedPosts(data);
    setFilteredPosts(data);
} catch (error) {
    console.error("Erreur lors de la récupération des posts sauvegardés:", error);
    setError(error.message);
} finally {
    setLoading(false);
}
};


const removeSavedPost = async (postId) => {
try {
    const token = localStorage.getItem("userToken");
    
    if (!token) {
    navigate("/login");
    return;
    }

    const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/save`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    });

    if (!response.ok) {
    throw new Error("Impossible de retirer le post des favoris");
    }

    setSavedPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
} catch (error) {
    console.error("Erreur lors du retrait du post des favoris:", error);
}
};

const formatDate = (dateString) => {
if (!dateString) return "";
const date = new Date(dateString);
return date.toLocaleDateString('fr-FR', { 
    day: 'numeric',
    month: 'short',
    hour: '2-digit', 
    minute: '2-digit' 
});
};

return (
<div style={styles.container}>
    <div style={styles.header}>
    <button onClick={() => navigate(-1)} style={styles.backButton}>
        <FaArrowLeft />
    </button>
    <h1 style={styles.title}>Bookmarks</h1>
    </div>

    <div style={styles.searchContainer}>
    <input
        type="text"
        placeholder="Rechercher dans vos bookmarks"
        style={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
    </div>

    {loading ? (
    <div style={styles.loadingSpinner}>
        <div className="spinner-border" style={{ color: "#ff6b6b" }} role="status">
        <span className="visually-hidden">Chargement...</span>
        </div>
    </div>
    ) : error ? (
    <div style={styles.emptyState}>
        <p style={styles.emptyStateText}>
        Une erreur est survenue: {error}
        </p>
    </div>
    ) : filteredPosts.length === 0 ? (
    <div style={styles.emptyState}>
        <h2 style={styles.emptyStateTitle}>Enregistrez des posts pour plus tard</h2>
        <p style={styles.emptyStateText}>
        Utilisez la fonction bookmark pour retrouver facilement vos posts préférés.
        </p>
    </div>
    ) : (
    <>
        <p style={{ marginBottom: "20px", color: "#adb5bd" }}>
        Vous avez {filteredPosts.length} post{filteredPosts.length > 1 ? 's' : ''} enregistré{filteredPosts.length > 1 ? 's' : ''}.
        </p>
        
        {filteredPosts.map(post => (
        <div key={post.post_id} style={styles.postCard}>
            <div style={styles.postHeader}>
            <Link to={`/UserProfile/${post.user?.id}`} style={{ textDecoration: "none" }}>
                <img
                src={post.user?.profile_picture || "https://placehold.co/50x50?text=No+Image"}
                alt={`${post.user?.username} profile`}
                style={styles.profileImage}
                onError={(e) => {
                    e.target.src = "https://placehold.co/50x50?text=No+Image";
                }}
                />
            </Link>
            <div style={styles.userInfo}>
                <Link to={`/UserProfile/${post.user?.id}`} style={{ textDecoration: "none" }}>
                <h6 style={styles.username}>{post.user?.username}</h6>
                </Link>
                <small style={styles.timestamp}>{formatDate(post.created_at)}</small>
            </div>
            </div>
            
            <p style={styles.postContent}>{post.content}</p>
            
            {post.media && post.media.length > 0 && (
            <div>
                {post.media.map((mediaItem, mediaIndex) => {
                const mediaUrl = `http://127.0.0.1:8000/storage/media/${mediaItem.file_name}`;
                return (
                    <img
                    key={mediaIndex}
                    src={mediaUrl}
                    style={styles.postMedia}
                    alt="Post media"
                    onError={(e) => {
                        console.error(`Image failed to load: ${e.target.src}`);
                        e.target.src = "https://placehold.co/300x200?text=Image+Not+Found";
                    }}
                    />
                );
                })}
            </div>
            )}
            
            <div style={styles.actionsContainer}>
            <button style={styles.actionButton}>
                <Heart size={18} style={{ marginRight: "6px" }} />
                <span>{post.like_count || 0}</span>
            </button>
            
            <button style={styles.actionButton}>
                <MessageCircle size={18} style={{ marginRight: "6px" }} />
                <span>{post.comment_count || 0}</span>
            </button>
            
            <button style={styles.actionButton}>
                <RefreshCw size={18} style={{ marginRight: "6px" }} />
                <span>{post.repost_count || 0}</span>
            </button>
            
            <button 
                style={{...styles.actionButton, color: "#ff9800"}} 
                onClick={() => removeSavedPost(post.post_id)}
            >
                <Bookmark size={18} />
            </button>
            </div>
        </div>
        ))}
    </>
    )}
</div>
);
}

export default Bookmarks;