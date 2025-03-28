import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const RightSidebar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (search.startsWith("@") && search.length > 1) {
      fetch(`http://localhost:8000/api/search-users?q=${search.substring(1)}`)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setShowSuggestions(true);
        })
        .catch((error) => console.error("Erreur API :", error));
    } else {
      setShowSuggestions(false);
    }
  }, [search]);

  const handleUserClick = (userId) => {
    navigate(`/UserProfile/${userId}`);

  };

  return (
    <div className="right-sidebar">
      <div className="right-sidebar__search">
        <input
          type="text"
          placeholder="Search RMAJ Chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {showSuggestions && (
          <ul className="suggestions">
            {users.map((user, index) => (
              <li key={index} onClick={() => handleUserClick(user.id)}>
                {user.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
