export const API_URL = "http://127.0.0.1:8000/api";

export const loginUser = async (email, password) => {
    try {
        console.log('Tentative de connexion avec:', { email });

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        console.log('Statut de la réponse:', response.status);

        const data = await response.json();
        console.log('Données reçues:', data);

        if (!response.ok) {
            console.error('Erreur serveur détaillée:', data);
            throw new Error(data.message || data.error || "Erreur technique de connexion");
        }

        return data;
    } catch (error) {
        console.error("Erreur de connexion détaillée:", error);
        throw error;
    }
};

export const fetchUser = async (token) => {
    if (!token) throw new Error("Aucun token trouvé");
    const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
    return response.json();
};



export const updateUserProfile = async (profileData) => {
    const token = localStorage.getItem("userToken");
    if (!token) throw new Error("Utilisateur non authentifié");

    const formData = new FormData();
    if (profileData.name) formData.append("lastname", profileData.lastname);
    if (profileData.display_name) formData.append("display_name", profileData.display_name);
    if (profileData.bio) formData.append("bio", profileData.bio);
    if (profileData.location) formData.append("location", profileData.location);
    // Gestion des uploads de fichiers
    if (profileData.profile_picture instanceof File) {
        formData.append("profile_picture", profileData.profile_picture);
    }
    if (profileData.cover_photo instanceof File) {
        formData.append("cover_photo", profileData.cover_photo);
    }
    if (profileData.theme_id) {
        formData.append("theme_id", profileData.theme_id);
    }
    

    console.log("🚀 FormData envoyé :", Object.fromEntries(formData));

    const response = await fetch(`${API_URL}/user/update`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur serveur:", errorData);
        throw new Error(errorData.message || "Erreur lors de la mise à jour du profil");
    }

    return response.json();
};

export const fetchUserProfile = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Utilisateur non authentifié");
        }

        console.log("Token utilisé:", token);

        const response = await fetch(`${API_URL}/user-profile/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"  // Indique que nous attendons une réponse en JSON
            },
            credentials: "include", // Assure la gestion des cookies si nécessaire
        });

        console.log("Headers envoyés:", {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur serveur:", errorData);
            throw new Error(errorData.message || "Impossible de récupérer le profil.");
        }
        const data = await response.json();
        console.log("Données reçues:", data);

        return data; 
    } catch (error) {
        console.error("Erreur API:", error);
        throw error; 
    }
};

export const fetchUserByUsername = async (username) => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Utilisateur non authentifié");
        }

        const response = await fetch(`${API_URL}/user/by-username/${username}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Impossible de trouver l'utilisateur.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
};



export const toggleFollow = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");
        console.log('Token utilisé:', token);
        if (!token) throw new Error("Utilisateur non authentifié");
        const response = await fetch(`${API_URL}/follow/${userId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json" 
            }
        });

        console.log('Statut de la réponse:', response.status);

        const data = await response.json();
        console.log('Données reçues:', data);
        if (!response.ok) {
            console.error('Erreur serveur détaillée:', data);
            throw new Error(data.message || "Erreur lors de l'abonnement ou du désabonnement");
        }
        return data;

    } catch (error) {
        console.error("Erreur API:", error);
        throw error;
    }
};

export const fetchFollowers = async (userId) => {
    if (!userId) return [];

    try {
        const response = await fetch(`${API_URL}/user/${userId}/followers`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des abonnés");

        return await response.json();
    } catch (error) {
        console.error("Erreur API (followers):", error);
        throw error;
    }
};

export const fetchFollowing = async (userId) => {
    if (!userId) return [];

    try {
        const response = await fetch(`${API_URL}/user/${userId}/following`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des abonnements");

        return await response.json();
    } catch (error) {
        console.error("Erreur API (following):", error);
        throw error;
    }

    
};
export const fetchMessages = async (senderId, receiverId) => {
    try {
        console.log(`Récupération des messages entre ${senderId} et ${receiverId}`);

        const response = await fetch(`${API_URL}/messages/${senderId}/${receiverId}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        console.log('Statut de la réponse:', response.status);

        const data = await response.json();
        console.log('Messages reçus:', data);

        if (!response.ok) {
            console.error('Erreur serveur détaillée:', data);
            throw new Error(data.message || "Erreur lors de la récupération des messages");
        }

        return data;
    } catch (error) {
        console.error("Erreur fetchMessages:", error);
        return [];
    }
};

export const sendMessage = async (formData, token) => {
    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        console.log("Statut de la réponse :", response.status);

        const data = await response.json();
        console.log("Message envoyé :", data);

        if (!response.ok) {
            console.error("Erreur serveur détaillée :", data);
            throw new Error(data.message || "Erreur lors de l'envoi du message");
        }

        return data;
    } catch (error) {
        console.error("Erreur sendMessage:", error);
        throw error; 
    }
};

export const fetchMessagesList = async () => {
    try {
        const token = localStorage.getItem("userToken");
        
        const response = await fetch(`${API_URL}/messages/conversations`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch conversations');
        }

        const data = await response.json();
        console.log("Conversations récupérées:", data);
        return data;
    } catch (error) {
        console.error("Error fetching messages list:", error);
        return [];  // Retourner un tableau vide en cas d'erreur
    }
};



const getAuthHeaders = () => {
    const token = localStorage.getItem("userToken");
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    };
};
//   // Fonction pour récupérer les posts
// export const fetchPosts = async (token) => {
//     try {
//       const response = await fetch(`${API_URL}/posts`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Error fetching posts');
//       }
  
//       const data = await response.json();
//       return data;  // Retourne les posts
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       throw error;  // Lance l'erreur pour pouvoir la gérer dans le composant
//     }
//   };
  


  export const checkMutualFollow = async (userId, token) => {
    try {
        console.log(`Vérification du suivi mutuel avec l'utilisateur ${userId}`);

        const response = await fetch(`${API_URL}/mutual-follow/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        console.log('Statut de la réponse:', response.status);

        const data = await response.json();
        console.log('Données reçues:', data);

        if (!response.ok) {
            console.error('Erreur serveur détaillée:', data);
            throw new Error(data.message || data.error || "Erreur lors de la vérification du suivi mutuel");
        }

        return data.mutual; 
    } catch (error) {
        console.error("Erreur de vérification du suivi mutuel:", error);
        return false;
    }
};

export const fetchPosts = async (token) => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la récupération des posts");
        }

        const data = await response.json();
                return data.map(post => ({
            ...post,
            is_repost: !!post.is_repost,
            repost_user_id: post.repost_user_id || null,
            original_post: post.original_post || null
        }));
    } catch (error) {
        console.error(" Erreur API fetchPosts:", error);
        throw error;
    }
};

export const sendPost = async (formData, token) => {
    try {
        console.log("📤 Envoi d'un nouveau post...");

        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        });

        console.log("🔍 Statut de la réponse:", response.status);

        const data = await response.json();
        console.log("✅ Réponse du serveur:", data);

        if (!response.ok) {
            console.error(" Erreur serveur détaillée:", data);
            throw new Error(data.message || "Erreur lors de l'envoi du post");
        }

        return data;
    } catch (error) {
        console.error(" Erreur API sendPost:", error);
        throw error;
    }
};

export const likePost = async (postId, token) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/like`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        return response;
    } catch (error) {
        console.error(" Error in likePost API call:", error);
        throw error;
    }
};

export const savePost = async (postId, token) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/save`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        return response;
    } catch (error) {
        console.error(" Error in savePost API call:", error);
        throw error;
    }
};

export const commentPost = async (postId, content, token) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comment`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ content })
        });

        return response;
    } catch (error) {
        console.error(" Error in commentPost API call:", error);
        throw error;
    }
};

export const repostPost = async (postId, token) => {
    try {
        console.log(`🔄 Tentative de repost du post ${postId}`);
        
        const response = await fetch(`${API_URL}/posts/${postId}/repost`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Repost failed");
        }

        return response;
    } catch (error) {
        console.error(" Error in repostPost API call:", error);
        throw error;
    }
};


export const fetchComments = async (postId, token) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Erreur lors du chargement des commentaires");

        return await response.json();
    } catch (error) {
        console.error(" Erreur API (comments):", error);
        throw error;
    }
};

export const addComment = async (postId, content, token) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content })
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout du commentaire");

        return await response.json();
    } catch (error) {
        console.error(" Erreur API (add comment):", error);
        throw error;
    }
};

export const replyToComment = async (commentId, postId, content, token) => {
    try {
        const response = await fetch(`${API_URL}/comments/${commentId}/reply`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ post_id: postId, content })
        });

        if (!response.ok) throw new Error("Erreur lors de la réponse au commentaire");

        return await response.json();
    } catch (error) {
        console.error(" Erreur API (reply comment):", error);
        throw error;
    }
};





// // Fonction pour récupérer les reposts d'un utilisateur
// export const fetchUserReposts = async (userId) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       if (!token) throw new Error("Aucun token trouvé");
      
//       const response = await fetch(`${API_URL}/user/${userId}/reposts`, {
//         method: "GET",
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Erreur lors de la récupération des reposts");
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error("Erreur API (reposts):", error);
//       return [];
//     }
//   };
  
//   // Fonction pour récupérer le nombre de reposts d'un post
//   export const getRepostCount = async (postId) => {
//     try {
//       const token = localStorage.getItem("userToken");
      
//       const response = await fetch(`${API_URL}/posts/${postId}/repost-count`, {
//         method: "GET",
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         return 0;
//       }
      
//       const data = await response.json();
//       return data.count || 0;
//     } catch (error) {
//       console.error(`Erreur lors de la récupération du nombre de reposts:`, error);
//       return 0;
//     }
//   };
  
//   // Fonction pour repost/unrepost un post
//   export const toggleRepost = async (postId) => {
//     try {
//       const token = localStorage.getItem("userToken");
//       if (!token) throw new Error("Utilisateur non authentifié");
      
//       // Vérifier d'abord si l'utilisateur a déjà reposté ce post
//       const userReposts = await fetchUserReposts();
//       const isReposted = userReposts.some(repost => repost.post_id === postId);
      
//       // Déterminer l'action à effectuer
//       const url = `${API_URL}/posts/${postId}/repost`;
//       const method = isReposted ? "DELETE" : "POST";
      
//       const response = await fetch(url, {
//         method: method,
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Erreur lors de l'action de repost");
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error("Erreur API (toggle repost):", error);
//       throw error;
//     }
//   };