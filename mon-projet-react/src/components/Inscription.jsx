import React, { useState } from "react";
import Modal from "react-modal";
import Connexion from "./Login"; 
import "../Inscription.css";
import CreateCompte from "./CreateCompte";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 

Modal.setAppElement("#root"); // Nécessaire pour l'accessibilité

const Inscription = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [createAccountModalIsOpen, setCreateAccountModalIsOpen] = useState(false);
  return (
    <div className="bigContainer">
      {/* Conteneur pour l'image */}
      <div className="logo-container d-lg-block d-none">
        <div className="logo d-lg-block d-none">
          <img src="./assets/RMAJ.png" alt="Logo X" />
        </div>
      </div>

      {/* Conteneur pour le contenu principal */}
      <div className="content-container">
        <div className="containertoplogo">
          <img src="./assets/RMAJ.png" className="d-lg-none d-block" alt="Logo X" />
        </div>
        <div className="Mycontainer">
          <h1 className="Myh1">Le monde du savoir<br />et du partage</h1>
         


          
          <button className="create-account-btn" onClick={() => setCreateAccountModalIsOpen(true)}>
            Créer un compte
          </button>
          <p className="terms">En vous inscrivant...</p>

          {/* Bouton pour ouvrir la pop-up */}
          <div className="login">
            <p className="askcount">Vous avez déjà un compte ?</p>
            <button className="login-btn" onClick={() => setModalIsOpen(true)}>
              Se connecter
            </button>
          </div>
        </div>
      </div>

      {/* Modal (pop-up) de connexion */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            border: "none",
          },
        }}
      >
        
        <Connexion closeModal={() => setModalIsOpen(false)} />
      </Modal>

      <Modal
        isOpen={createAccountModalIsOpen}
        onRequestClose={() => setCreateAccountModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            border: "none",
          },
        }}
      >
        <CreateCompte closeModal={() => setCreateAccountModalIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default Inscription;