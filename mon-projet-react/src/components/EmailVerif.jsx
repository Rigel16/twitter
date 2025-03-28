import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function EmailVerif() {
    const navigate = useNavigate();
    const [userCode, setUserCode] = useState("");
    const [attempts, setAttempts] = useState(parseInt(localStorage.getItem("attempts") || "3"));

    const storedCode = localStorage.getItem("verificationCode");
    const email = localStorage.getItem("email");

    useEffect(() => {
        if (!storedCode || !email) {
            alert("Aucune vérification en attente.");
            navigate("/"); 
        }
    }, [navigate, storedCode, email]);

    const handleVerify = () => {
        if (attempts <= 0) {
            alert("Trop de tentatives échouées. Veuillez recommencer l'inscription.");
            localStorage.removeItem("verificationCode");
            localStorage.removeItem("email");
            localStorage.removeItem("attempts");
            navigate("/");
            return;
        }

        if (userCode === storedCode) {
            alert("Vérification réussie !");
            
            const userEmail = localStorage.getItem("email"); 

            localStorage.removeItem("verificationCode");
            localStorage.removeItem("attempts");

            if (userEmail) {
                localStorage.setItem("email", userEmail);
                console.log("📧 Email conservé après vérification :", userEmail);
            }

            navigate("/CreatePassword");
        } else {
            const newAttempts = attempts - 1;
            setAttempts(newAttempts);
            localStorage.setItem("attempts", newAttempts.toString());
            alert(`Code incorrect. Il vous reste ${newAttempts} tentative(s).`);

            if (newAttempts <= 0) {
                alert("Trop de tentatives échouées. Veuillez recommencer l'inscription.");
                localStorage.removeItem("verificationCode");
                localStorage.removeItem("email");
                localStorage.removeItem("attempts");
                navigate("/");
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card bg-dark text-white" style={{ maxWidth: "450px", width: "100%" }}>
            <div className="card-header text-center">
                <img src="./assets/RMAJ.png" alt="Logo X" style={{ width: "50px", height: "auto" }} />
            </div>
            <div className="card-body text-center">
                <h3 className="card-title mb-4">Nous vous avons envoyé un code</h3>
                <p className="card-text mb-4">
                    Saisissez-le ci-dessous pour vérifier votre adresse email<br />
                    <span className="fw-bold">{email}</span>
                </p>
                <div className="form-group mb-4">
                <div className="d-flex justify-content-center">
                    <input 
                        type="text" 
                        className="form-control form-control-lg text-center bg-dark text-white border-secondary"
                        value={userCode} 
                        onChange={(e) => setUserCode(e.target.value)} 
                        placeholder="Entrez le code"
                        style={{ maxWidth: "300px" }}
                    />
                </div>
                </div>
                <button 
                    className="btn btn-primary btn-lg w-100 mb-3 rounded-pill"
                    onClick={handleVerify}
                >
                    Valider
                </button>
                <p className="card-text text-secondary">
                    Tentatives restantes : <span className="badge bg-secondary">{attempts}</span>
                </p>
            </div>
        </div>
    </div>
    );
}

export default EmailVerif;