import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { fetchUser,  } from '../utils/api';
import { 
    FaMusic, FaFutbol, FaGamepad, FaPalette, FaPlane, 
    FaMicrochip, FaFilm, FaBook, FaNewspaper, FaUtensils, 
    FaRocket, FaBriefcase, FaTshirt, FaHeart 
} from "react-icons/fa";
import "../BubbleCards.css";

const themesList = [
    { id: 1, name: "Musique", icon: <FaMusic /> },
    { id: 2, name: "Sport", icon: <FaFutbol /> },
    { id: 3, name: "Gaming", icon: <FaGamepad /> },
    { id: 4, name: "Art & Culture", icon: <FaPalette /> },
    { id: 5, name: "Travel", icon: <FaPlane /> },
    { id: 6, name: "Technologie", icon: <FaMicrochip /> },
    { id: 7, name: "Cinéma & Séries", icon: <FaFilm /> },
    { id: 8, name: "Livres & Littérature", icon: <FaBook /> },
    { id: 9, name: "Actualités & Politique", icon: <FaNewspaper /> },
    { id: 10, name: "Cuisine & Gastronomie", icon: <FaUtensils /> },
    { id: 11, name: "Science & Espace", icon: <FaRocket /> },
    { id: 12, name: "Business & Finance", icon: <FaBriefcase /> },
    { id: 13, name: "Mode & Lifestyle", icon: <FaTshirt /> },
    { id: 14, name: "Bien-être & Santé", icon: <FaHeart /> },
];

function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("userToken");
                if (!token) {
                    navigate("/");
                    return;
                }
                const user = await fetchUser(token);
                setUserData(user);
                console.log(user);
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Impossible de charger les données utilisateur");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [navigate]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!userData) return <p>Aucune donnée utilisateur disponible</p>;

    return (
        <div className="profile">
            <div className="profile__header">
                <button onClick={() => navigate(-1)} className="back-button"><FaArrowLeft /></button>
                <div className="profile__header-name">
                    <p className="profile__name">{userData.display_name}</p>
                    <p className="profile__post">0 posts</p>
                </div>
            </div>

            <div className="profile__content">
                <div className="profile__content-imgs">
                    <img 
                        src={userData.cover_photo || "https://via.placeholder.com/600x400"} 
                        className="profile__content__back-profile" 
                        alt="back-profile"
                        style={{ width: "100%", height: "250px", objectFit: "cover" }} 
                    />
                    <img 
                        src={userData.profile_picture} 
                        className="profile__content__profile-img" 
                        alt="profile-img"
                        style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }} 
                    />
                </div>

                <Link to="/ProfilePage"><button className="profile__edit">Éditer Profil</button></Link>                <button onClick={() => {
                    localStorage.removeItem("userToken");
                    navigate("/");
                }} className="btn btn-danger ms-2">Se déconnecter</button>

                {userData && (
                    <>
                        <p className="profile__name">{userData.lastname}</p>
                        <p className="profile__joined-date">
                            Inscrit le {new Date(userData.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                    </>
                )}

                {userData && <p className="bio__content">{userData.bio}</p>}

                {/* Bulles de thèmes */}
                <div className="bubble-container">
                    {userData.theme_id ? (
                        themesList
                            .filter(theme => theme.id === userData.theme_id)
                            .map((theme, index) => (
                                <div key={index} className="bubble-card animate-bubble">
                                    <div className="icon">{theme.icon}</div>
                                    <h5 className="card-title">{theme.name}</h5>
                                </div>
                            ))
                    ) : (
                        <p>Aucun thème sélectionné.</p>
                    )}
                </div>

                {/* Suivis (Followers & Following) */}
                <div className="profile__follows">
    <p className="profile__following" onClick={() => navigate(`/user/${userData.id}/following`)}>
        <span>{userData.following_count} Abonnements</span> 
    </p>
    <p className="profile__follower" onClick={() => navigate(`/user/${userData.id}/followers`)}>
        <span>{userData.followers_count} Abonnés</span> 
    </p>
</div>

            </div>
        </div>
    );
}

export default Profile;
