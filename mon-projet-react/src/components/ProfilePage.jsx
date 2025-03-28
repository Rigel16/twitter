import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { fetchUser, updateUserProfile } from '../utils/api';
import '../Editprofile.css';

function ProfileEditPage() {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
    const [lastname, setLastname] = useState('');
    const [displayName, setDisplayName] = useState('');

    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(null);

    const availableThemes = [
        { id: 1, name: "Technologie", color: "#1DA1F2" },
        { id: 2, name: "Business", color: "#17BF63" },
        { id: 3, name: "Finance", color: "#F45D22" },
        { id: 4, name: "Sports", color: "#794BC4" },
        { id: 5, name: "Divertissement", color: "#FFAD1F" },
        { id: 6, name: "Politique", color: "#E0245E" },
        { id: 7, name: "Science", color: "#1D9BF0" },
        { id: 8, name: "Santé", color: "#71767B" },
        { id: 9, name: "Éducation", color: "#00BA7C" },
        { id: 10, name: "Voyage", color: "#F91880" },
        { id: 11, name: "Art", color: "#7856FF" },
        { id: 12, name: "Musique", color: "#FFD400" }
    ];

    //Charger les infos utilisateur dès l'ouverture
    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const user = await fetchUser(token);

                setLastname(user.lastname || '');
                setDisplayName(user.display_name || ''); // Ajoutez cette ligne
                setBio(user.bio || '');
                setLocation(user.location || '');

                if (user.profile_picture) {
                    setProfilePicturePreview(user.profile_picture);
                }
                if (user.cover_photo) {
                    setCoverPhotoPreview(user.cover_photo);
                }

                // Charger un seul thème sélectionné
                setSelectedTheme(user.theme_id || null);

            } catch (error) {
                console.error("Erreur lors du chargement du profil :", error);
            }
        };

        loadUserProfile();
    }, []);

    //Gestion de l'upload des images
    const onDropProfile = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setProfilePicture(file);
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };
    
    const onDropCover = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setCoverPhoto(file);
            setCoverPhotoPreview(URL.createObjectURL(file));
        }
    };
    
    const { getRootProps: getRootPropsProfile, getInputProps: getInputPropsProfile } = useDropzone({ 
        onDrop: onDropProfile, 
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxFiles: 1
    });

    const { getRootProps: getRootPropsCover, getInputProps: getInputPropsCover } = useDropzone({ 
        onDrop: onDropCover, 
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxFiles: 1
    });

    //Sélection d'un seul thème
    const toggleTheme = (themeId) => {
      setSelectedTheme(themeId);
      console.log("🎯 Nouveau thème sélectionné :", themeId);
  };
  

    //Envoyer les modifications au backend
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      console.log("🚀 Données envoyées :", {
        lastname,
        display_name: displayName, 
          bio,
          location,
          profile_picture: profilePicture,
          cover_photo: coverPhoto,
          theme_id: selectedTheme
      });
  
      try {
          const response = await updateUserProfile({
            lastname,
            display_name: displayName,
              bio,
              location,
              profile_picture: profilePicture,
              cover_photo: coverPhoto,
              theme_id: selectedTheme
          });
  
          console.log(" Réponse du serveur :", response);
          alert("Profil mis à jour avec succès !");
          navigate('/MainContent');
      } catch (error) {
          console.error(" Erreur lors de la mise à jour :", error);
          alert("Erreur lors de la mise à jour du profil.");
      } finally {
          setIsSubmitting(false);
      }
  };
  

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    <FaArrowLeft />
                </button>
                <h1 className="page-title">Éditer le profil</h1>
            </div>

            <form className="edit-profile-form" onSubmit={handleSubmit}>
                {/* Cover Photo */}
                <div className="photo-section">
                    <label className="form-label">Photo de couverture</label>
                    <div {...getRootPropsCover()} className="cover-photo-dropzone">
                        {coverPhotoPreview ? 
                            <img src={coverPhotoPreview} alt="Cover" className="cover-preview" /> :
                            <div className="upload-placeholder"><span>Cliquez ou déposez une photo</span></div>
                        }
                        <input {...getInputPropsCover()} />
                    </div>
                </div>

                {/* Profile Picture */}
                <div className="photo-section">
                    <label className="form-label">Photo de profil</label>
                    <div {...getRootPropsProfile()} className="profile-photo-dropzone">
                        {profilePicturePreview ? 
                            <img src={profilePicturePreview} alt="Profile" className="profile-preview" /> :
                            <div className="upload-placeholder"><span>Cliquez ou déposez une photo</span></div>
                        }
                        <input {...getInputPropsProfile()} />
                    </div>
                </div>

                {/* Ajoutez un nouveau champ pour display_name */}
            <div className="form-field">
                <label className="form-label" htmlFor="display_name">Nom d'affichage</label>
                <input 
                    id="display_name" 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    className="form-input" 
                    maxLength="50" 
                />
            </div>
                
                {/* Bio */}
                <div className="form-field">
                    <label className="form-label" htmlFor="bio">Bio</label>
                    <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="form-textarea" maxLength="160" />
                </div>

                {/* Sélection d'un seul thème */}
                <div className="themes-section">
                    <label className="form-label">Thème d'intérêt</label>
                    <div className="themes-grid">
                        {availableThemes.map((theme) => (
                            <div key={theme.id} className={`theme-card ${selectedTheme === theme.id ? 'selected' : ''}`} onClick={() => toggleTheme(theme.id)} style={{ borderColor: selectedTheme === theme.id ? theme.color : '#333' }}>
                                {selectedTheme === theme.id && <FaCheck />}
                                <span className="theme-name">{theme.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="save-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
            </form>
        </div>
    );
}

export default ProfileEditPage;
