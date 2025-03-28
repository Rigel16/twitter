import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import '../LoginForm.css';

const CreateCompte = ({ closeModal }) => {
    const navigate = useNavigate();
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const handleLastnameChange = (e) => {
        if (e.target.value.length <= 50) {
            setLastname(e.target.value);
        }
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }
    const handleNext = async () => {
        if (!email) {
            alert("Veuillez entrer une adresse email valide.");
            return;
        }
    

        localStorage.setItem("lastname", lastname);
        localStorage.setItem("email", email);
        console.log(" Email enregistré :", localStorage.getItem("email"));

        try {
            const response = await fetch("http://localhost:8000/api/send-verification-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            

            if (!response.ok) {
                throw new Error(data.message || "Erreur inconnue");
            }

            localStorage.setItem("verificationCode", data.code);
            localStorage.setItem("attempts", "3");

            navigate("/EmailVerif");

        } catch (error) {
            console.error(" Erreur lors de l'envoi du code :", error);
            alert(error.message);
        }
    };

    return (
        <div className="connexion-page">
        <button className="closePop" onClick={closeModal}>X</button>
        <div className="Mylogo">
            <img src="./assets/RMAJ.png" alt="Logo X" />
        </div>
        <h3>Créer votre compte</h3>
        <form className='Myform' onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
                    <input
                        type="text"
                        value={lastname}
                        onChange={handleLastnameChange}
                        placeholder="Nom et prénom"
                        className="Myinput"
                    />
                    <span style={{ color: lastname.length === 50 ? "red" : "white" }}>
                        {lastname.length}/50
                    </span>
                </div>

                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Adresse email"
                    className="Myinput"
                />
                <div>
                <label style={{ textAlign: "left", display: "block", marginBottom: "5px" }}>Date de naissance</label>
                <input
                        type="date"
                        className="Myinput"
                    />  
                 </div>            
                <button className="btnSuivant" onClick={handleNext}>
                    Suivant
                </button>
                </form>
        </div>
    );
};

export default CreateCompte;