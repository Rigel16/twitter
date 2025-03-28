import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFollowing } from "../utils/api";

const FollowingPage = () => {
    const { userId } = useParams();
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFollowing(userId)
            .then(setFollowing)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;

    return (
        <div className="following-page">
            <h2>Abonnements</h2>
            <ul>
                {following.map((user) => (
                    <li key={user.id}>
                        <Link to={`/UserProfile/${user.id}`} className="following-item">
                            <img src={user.profile_picture} alt={user.display_name} />
                            <span>{user.display_name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowingPage;
