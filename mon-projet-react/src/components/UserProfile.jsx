import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile, toggleFollow, checkMutualFollow } from '../utils/api';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMutualFollow, setIsMutualFollow] = useState(false);

  // Récupérer le token stocké
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!userId) {
      setError("ID utilisateur manquant");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Utilisateur non authentifié.");
      setLoading(false);
      return;
    }

    // Charger les infos du profil et vérifier le suivi mutuel
    fetchUserProfile(userId, token)
      .then((data) => {
        setUserProfile(data);
        setIsFollowing(data.is_following);
        setLoading(false);

        return checkMutualFollow(userId, token);
      })
      .then((mutual) => {
        setIsMutualFollow(mutual);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [userId, token]);

  const handleFollowToggle = async () => {
    try {
      const response = await toggleFollow(userId, token);
      if (response.success) {
        setIsFollowing((prevState) => !prevState);

        // Vérifier si le suivi mutuel est activé après le changement
        const mutual = await checkMutualFollow(userId, token);
        setIsMutualFollow(mutual);
      } else {
        setError("Une erreur est survenue lors du changement de statut de suivi.");
      }
    } catch (error) {
      console.error("Erreur lors du changement de statut de suivi:", error);
      setError("Erreur lors du changement de statut de suivi.");
    }
  };

  const handleStartChat = () => {
    navigate(`/ChatRoom/${userId}`);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>Erreur : {error}</div>;

  return (
    <div className="user-profile" data-following={isFollowing}>
      {userProfile.cover_photo && (
        <img src={userProfile.cover_photo} alt="Cover" />
      )}
      {userProfile.profile_picture && (
        <img src={userProfile.profile_picture} alt="Profile" />
      )}
      <h2>ID utilisateur: {userProfile.id}</h2>
      <h3>Nom d'affichage: {userProfile.display_name}</h3>
      <p><strong>Bio:</strong> {userProfile.bio}</p>
      <p><strong>Location:</strong> {userProfile.location}</p>
      <p><strong>Email:</strong> {userProfile.email}</p>
      <p><strong>Theme ID:</strong> {userProfile.theme_id}</p>
  
      <button onClick={handleFollowToggle}>
        {isFollowing ? "Ne plus suivre" : "Suivre"}
      </button>

      {isMutualFollow && (
        <button onClick={handleStartChat} style={{ marginLeft: "10px" }}>
          Message
        </button>
      )}
    </div>
  );
};

export default UserProfile;
