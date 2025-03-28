import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, RefreshCw } from "lucide-react";
import { fetchPosts, likePost, savePost, commentPost, repostPost, fetchUserByUsername } from "../utils/api"; 

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const styles = {
  darkCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    marginBottom: "20px"
  },
  repostCard: {
    backgroundColor: "#222222",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    borderLeft: "3px solid #ff6b6b",
    marginBottom: "20px"
  },
  postContent: {
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#f8f9fa",
    margin: "16px 0"
  },
  username: {
    color: "#f8f9fa",
    fontWeight: "600",
    fontSize: "1.05rem"
  },
  timestamp: {
    color: "#adb5bd",
    fontSize: "0.8rem"
  },
  actionButton: {
    backgroundColor: "transparent",
    borderRadius: "50px",
    padding: "6px 12px",
    transition: "background-color 0.2s ease"
  },
  actionButtonHover: {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  commentInput: {
    backgroundColor: "#2d2d2d",
    color: "#f8f9fa",
    border: "1px solid #444",
    borderRadius: "20px",
    padding: "8px 16px"
  },
  commentButton: {
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: "20px",
    fontWeight: "600"
  },
  profilePicture: {
    border: "2px solid #444",
    objectFit: "cover"
  },
  repostHeader: {
    color: "#adb5bd",
    fontSize: "0.85rem",
    paddingBottom: "8px",
    borderBottom: "1px solid #333"
  },
  mentionLink: {
    color: "#ff6b6b",
    fontWeight: "500",
    textDecoration: "none",
    transition: "color 0.2s ease"
  }
};

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [repostedPosts, setRepostedPosts] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showCommentForm, setShowCommentForm] = useState({});
  const [mentionedUsers, setMentionedUsers] = useState({});
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      fetchCurrentUser();
      loadPosts();
    }
  }, []);

  const lookupUserByUsername = async (username) => {
    if (!mentionedUsers[username]) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/search-users?q=${username}`);
        const users = await response.json();
        
        // Si nous trouvons l'utilisateur exact, nous le stockons
        const exactMatch = users.find(user => user.display_name.toLowerCase() === username.toLowerCase());
        
        if (exactMatch) {
          setMentionedUsers(prev => ({
            ...prev,
            [username]: exactMatch
          }));
        }
      } catch (error) {
        console.error(`Erreur lors de la recherche de l'utilisateur ${username}:`, error);
      }
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const postsData = await fetchPosts(token);
      console.log(" Nombre total de posts récupérés:", postsData.length);
      console.log(" Posts normaux:", postsData.filter(p => !p.is_repost).length);
      console.log(" Reposts:", postsData.filter(p => p.is_repost).length);
            const repostExample = postsData.find(p => p.is_repost);
      if (repostExample) {
        console.log(" Structure d'un repost exemple:", repostExample);
      }
      const userLikedPosts = {};
      const userBookmarkedPosts = {};
      const userRepostedPosts = {};
      
      postsData.forEach(post => {
        if (!post.is_repost) {
          if (post.is_liked) {
            userLikedPosts[post.post_id] = true;
          }
          
          if (post.is_saved) {
            userBookmarkedPosts[post.post_id] = true;
          }
          
          if (post.is_reposted) {
            userRepostedPosts[post.post_id] = true;
          }
        } 
        else if (post.original_post) {
          const originalPostId = post.original_post.post_id;
          
          if (post.is_liked || post.original_post.is_liked) {
            userLikedPosts[originalPostId] = true;
          }
          
          if (post.is_saved || post.original_post.is_saved) {
            userBookmarkedPosts[originalPostId] = true;
          }
          
          if (post.is_reposted || post.original_post.is_reposted) {
            userRepostedPosts[originalPostId] = true;
          }
        }
      });

      setLikedPosts(userLikedPosts);
      setBookmarkedPosts(userBookmarkedPosts);
      setRepostedPosts(userRepostedPosts);
      setPosts(postsData);
      loadPosts();

    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtenir l'ID réel du post (pour les reposts, utiliser l'ID du post original)
  const getActualPostId = (post) => {
    if (post.is_repost && post.original_post) {
      return post.original_post.post_id;
    }
    return post.post_id;
  };

  const toggleLike = async (post) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const postId = getActualPostId(post);
      const response = await likePost(postId, token);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Like failed");
      }

      // Mettre à jour l'état des likes avec la valeur renvoyée par le backend
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: data.liked // True si liké, False si retiré
      }));
      
      // Mettre à jour le compteur de likes dans la liste des posts
      setPosts(posts.map(p => {
        // Pour les posts normaux
        if (!p.is_repost && p.post_id === postId) {
          const newLikeCount = data.liked 
            ? (p.like_count || 0) + 1 
            : (p.like_count || 1) - 1;
          
          return { ...p, like_count: newLikeCount };
        }
        // Pour les reposts
        else if (p.is_repost && p.original_post && p.original_post.post_id === postId) {
          const updatedOriginalPost = { 
            ...p.original_post, 
            like_count: data.liked 
              ? (p.original_post.like_count || 0) + 1 
              : (p.original_post.like_count || 1) - 1 
          };
          
          return { ...p, original_post: updatedOriginalPost };
        }
        return p;
      }));

    } catch (error) {
      console.error(" Error liking post:", error);
    }
  };

  const toggleBookmark = async (post) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const postId = getActualPostId(post);
      const response = await savePost(postId, token);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Save failed");
      }

      // Mettre à jour l'état en fonction de la réponse du serveur
      const isSaved = data.saved;
      setBookmarkedPosts(prev => ({
        ...prev,
        [postId]: isSaved
      }));
      
    } catch (error) {
      console.error(" Error saving post:", error);
    }
  };

  const toggleComment = (postId) => {
    setShowCommentForm(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    setCommentText("");
  };

  const handleSubmitComment = async (post) => {
    try {
      if (!commentText.trim()) return;
      
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const postId = getActualPostId(post);
      const response = await commentPost(postId, commentText, token);
      const data = await response.json();

      console.log(" Réponse API (comment):", response.status, data);

      if (!response.ok) {
        throw new Error(data.message || "Comment failed");
      }

      // Réinitialiser le formulaire
      setCommentText("");
      setShowCommentForm(prev => ({
        ...prev,
        [postId]: false
      }));
      
      // Mettre à jour le compteur de commentaires dans la liste des posts
      setPosts(posts.map(p => {
        // Pour les posts normaux
        if (!p.is_repost && p.post_id === postId) {
          return { ...p, comment_count: (p.comment_count || 0) + 1 };
        }
        // Pour les reposts
        else if (p.is_repost && p.original_post && p.original_post.post_id === postId) {
          const updatedOriginalPost = { 
            ...p.original_post, 
            comment_count: (p.original_post.comment_count || 0) + 1 
          };
          
          return { ...p, original_post: updatedOriginalPost };
        }
        return p;
      }));
      
    } catch (error) {
      console.error(" Error commenting on post:", error);
    }
  };

  const toggleRepost = async (post) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const postId = getActualPostId(post);
      console.log(` Tentative de repost du post ${postId}`);
      
      const response = await repostPost(postId, token);
      const data = await response.json();

      console.log(" Réponse API (repost):", response.status, data);

      if (!response.ok) {
        throw new Error(data.message || "Repost failed");
      }

      // Mettre à jour l'état des reposts
      setRepostedPosts(prev => ({
        ...prev,
        [postId]: data.reposted
      }));
      
      // Mettre à jour le compteur de reposts dans la liste des posts
      setPosts(posts.map(p => {
        // Pour les posts normaux
        if (!p.is_repost && p.post_id === postId) {
          return { ...p, repost_count: data.repost_count };
        }
        // Pour les reposts
        else if (p.is_repost && p.original_post && p.original_post.post_id === postId) {
          const updatedOriginalPost = { 
            ...p.original_post, 
            repost_count: data.repost_count
          };
          
          return { ...p, original_post: updatedOriginalPost };
        }
        return p;
      }));
      
      // Rafraîchir la liste des posts si un repost a été ajouté
      if (data.reposted) {
        await loadPosts();
      }
      
    } catch (error) {
      console.error(" Error reposting:", error);
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

  // Fonction pour gérer le clic sur un utilisateur mentionné
  const handleMentionClick = (userId) => {
    navigate(`/UserProfile/${userId}`);
  };

const mentionRegex = /@([^{]+)\{(\d+)\}/g;

const formatContentWithMentions = (content) => {
  if (!content) return null;
  
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = mentionRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }
    
    const displayName = match[1];
    const userId = match[2];
    
    parts.push(
      <Link 
        key={`mention-${userId}`}
        to={`/UserProfile/${userId}`}
        style={styles.mentionLink}
        className="mention-link"
        onClick={(e) => {
          e.preventDefault();
          handleMentionClick(userId);
        }}
      >
        @{displayName}
      </Link>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }
  
  return <p className="my-3" style={styles.postContent}>{parts}</p>;
};
  
  // Fonction pour rendre un post (contenu commun aux posts originaux et reposts)
  const renderPostContent = (post) => {
    if (!post) return null;
    
    const postId = post.post_id;
    if (!postId) return null;

    return (
      <>
        {/* Affiche le contenu avec des mentions cliquables */}
        {formatContentWithMentions(post.content)}

        {post.media && post.media.length > 0 && (
          <div className="rounded overflow-hidden my-3">
            {post.media.map((mediaItem, mediaIndex) => {
              const mediaUrl = `${API_BASE_URL}/storage/media/${mediaItem.file_name}`;
              return (
                <img
                  key={mediaIndex}
                  src={mediaUrl}
                  className="w-100 rounded mb-2"
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                  alt="Post media"
                  onError={(e) => {
                    console.error(` Image failed to load: ${e.target.src}`);
                    e.target.src = "https://placehold.co/300x200?text=Image+Not+Found";
                  }}
                />
              );
            })}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4 pb-1">
          <div>
            <button 
              className={`btn d-flex align-items-center ${showCommentForm[postId] ? "text-info" : "text-secondary"}`}
              style={{
                ...styles.actionButton,
                ...(hoveredButton === `comment-${postId}` ? styles.actionButtonHover : {})
              }}
              onClick={() => toggleComment(postId)}
              onMouseEnter={() => setHoveredButton(`comment-${postId}`)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <MessageCircle size={18} />
              {post.comment_count > 0 && (
                <span className="ms-2 fw-medium">{post.comment_count}</span>
              )}
            </button>
          </div>

          <div>
            <button
              className={`btn d-flex align-items-center ${repostedPosts[postId] ? "text-success" : "text-secondary"}`}
              style={{
                ...styles.actionButton,
                ...(hoveredButton === `repost-${postId}` ? styles.actionButtonHover : {})
              }}
              onClick={() => toggleRepost(post)}
              onMouseEnter={() => setHoveredButton(`repost-${postId}`)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <RefreshCw size={18} />
              {post.repost_count > 0 && (
                <span className="ms-2 fw-medium">{post.repost_count}</span>
              )}
            </button>
          </div>

          <div>
            <button
              className={`btn d-flex align-items-center ${likedPosts[postId] ? "text-danger" : "text-secondary"}`}
              style={{
                ...styles.actionButton,
                ...(hoveredButton === `like-${postId}` ? styles.actionButtonHover : {})
              }}
              onClick={() => toggleLike(post)}
              onMouseEnter={() => setHoveredButton(`like-${postId}`)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Heart size={18} />
              {post.like_count > 0 && (
                <span className="ms-2 fw-medium">{post.like_count}</span>
              )}
            </button>
          </div>

          <div>
            <button
              className={`btn d-flex align-items-center ${bookmarkedPosts[postId] ? "text-warning" : "text-secondary"}`}
              style={{
                ...styles.actionButton,
                ...(hoveredButton === `bookmark-${postId}` ? styles.actionButtonHover : {})
              }}
              onClick={() => toggleBookmark(post)}
              onMouseEnter={() => setHoveredButton(`bookmark-${postId}`)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Bookmark size={18} />
            </button>
          </div>
        </div>

        {/* Formulaire de commentaire */}
        {showCommentForm[post.post_id] && (
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #333" }}>
            {/* Formulaire de commentaire */}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                style={styles.commentInput}
                placeholder="Ajouter un commentaire..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button 
                className="btn" 
                style={styles.commentButton}
                onClick={() => handleSubmitComment(post)}
                disabled={!commentText.trim()}
              >
                Envoyer
              </button>
            </div>
            
            {/* Affichage des commentaires existants */}
            {post.comments && post.comments.length > 0 && (
              <div className="mb-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="mb-2 p-2 rounded" style={{ backgroundColor: "#222" }}>
                    <strong style={{ color: "#ff9800" }}>{comment.user.username}</strong>
                    {/* Utiliser également formatContentWithMentions pour les commentaires */}
                    {formatContentWithMentions(comment.content)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  // Fonction pour rendre l'en-tête d'un utilisateur
  const renderUserHeader = (user, timestamp) => {
    if (!user) return null;

    const profilePictureUrl = user.profile_picture
      ? user.profile_picture
      : "https://placehold.co/50x50?text=No+Image";

    return (
      <div className="d-flex align-items-center">
        <Link to={`/UserProfile/${user.id}`} className="d-flex align-items-center text-decoration-none">
          <div>
            <img
              src={profilePictureUrl}
              alt={`${user.username} profile`}
              className="rounded-circle"
              width="48"
              height="48"
              style={styles.profilePicture}
              onError={(e) => {
                e.target.src = "https://placehold.co/50x50?text=No+Image";
              }}
            />
          </div>
          <div className="ms-3">
            <h6 className="mb-0" style={styles.username}>{user.username}</h6>
            <small style={styles.timestamp}>{formatDate(timestamp)}</small>
          </div>
        </Link>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" style={{ color: "#ff6b6b" }} role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="post-container">
      {posts.length === 0 ? (
        <div className="text-center my-5 p-5" style={styles.darkCard}>
          <p style={{ color: "#f8f9fa", fontSize: "1.1rem" }}>
            Aucune publication à afficher.
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <div 
            key={`${post.is_repost ? 'repost' : 'post'}-${post.post_id}`} 
            style={post.is_repost ? styles.repostCard : styles.darkCard}
          >
            <div className="p-4">
              {/* Pour les reposts, afficher qui a reposté */}
              {post.is_repost && post.user && (
                <div className="mb-3" style={styles.repostHeader}>
                  <RefreshCw size={14} className="me-1" />
                  <Link to={`/UserProfile/${post.user?.id}`} className="text-decoration-none" style={{ color: "#ff6b6b" }}>
                    <strong>{post.user.username}</strong>
                  </Link>{" "}
                  a partagé
                </div>
              )}

              {/* Afficher l'en-tête de l'utilisateur approprié */}
              {post.is_repost && post.original_post ? (
                renderUserHeader(post.original_post.user, post.original_post.created_at)
              ) : (
                renderUserHeader(post.user, post.created_at)
              )}

              {/* Afficher le contenu du post */}
              {post.is_repost && post.original_post ? (
                renderPostContent(post.original_post)
              ) : (
                renderPostContent(post)
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostCard;