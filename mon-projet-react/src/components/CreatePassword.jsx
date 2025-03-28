import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
    
        const email = localStorage.getItem("email");
        const lastname = localStorage.getItem("lastname");
    
        console.log("Données envoyées :", { lastname, email, password });
    
        try {
            const response = await fetch("http://localhost:8000/api/register-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lastname, email, password }),
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'inscription");
            }
    
            alert("Compte créé avec succès !");
            navigate("/");
        } catch (error) {
            console.error("Erreur :", error);
            setError(error.message);
        }
    };

    
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card bg-dark text-white" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="card-header text-center">
                    <img src="./assets/RMAJ.png" alt="Logo X" style={{ width: "50px", height: "auto" }} />
                </div>
                <div className="card-body text-center">
                    <h3 className="card-title mb-4">Il vous faut un mot de passe</h3>
                    <p className="card-text mb-4">Vérifiez qu'il contient au moins 8 caractères.</p>
                    <div className="form-group mb-3">
                        <input 
                            type="password"
                            className="form-control form-control-lg text-center bg-dark text-white border-secondary w-100"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nouveau mot de passe"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <input 
                            type="password"
                            className="form-control form-control-lg text-center bg-dark text-white border-secondary w-100"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmer le mot de passe"
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button 
                        className="btn btn-primary btn-lg w-100 mb-3 rounded-pill"
                        onClick={handleSubmit}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePassword;