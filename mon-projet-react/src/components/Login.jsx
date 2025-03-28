import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api'; 
import '../LoginForm.css';
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min";

const ConnexionPage = ({ closeModal }) => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const data = await loginUser(email, password);
            console.log("les data".data);
            
            if (data.error) throw new Error(data.message || "Erreur lors de la connexion");

            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userId", data.user.id);
            alert("Connexion réussie !");
            navigate("/MainContent");
        } catch (error) {
            setError(error.message);
        }
    };

    
    return (
        <div className="connexion-page">
            <button className="closePop" onClick={closeModal}>X</button>
            <div className="Mylogo">
                <img src="./assets/RMAJ.png" alt="Logo X" />
            </div>
            <h1>Connectez-vous</h1>

            <form className='Myform' onSubmit={handleSubmit}>
                <input type="email" placeholder="Adresse email" className='Myinput' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Mot de passe" className='Myinput' value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" className="btnSuivant">Suivant</button>
            </form>
            <div className="links">
                <span className="Myinscription">
                    <p>Vous n'avez pas de compte ?</p>
                    <Link to="/Inscription"> Inscrivez-vous</Link>
                </span>
            </div>
        </div>
    );
};

export default ConnexionPage;