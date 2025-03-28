import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import { fetchFollowers } from "../utils/api";

const FollowersPage = () => {
    const { userId } = useParams();
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFollowers(userId)
            .then(setFollowers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

    return (
        <div className="following-page">
            <h2>Abonnés</h2>
            <ul>
                {followers.map((follower) => (
                    <li key={follower.id}>
                        <Link to={`/UserProfile/${follower.id}`} className="following-item">
                            <img src={follower.profile_picture} alt={follower.display_name} />
                            <span>{follower.display_name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowersPage;
