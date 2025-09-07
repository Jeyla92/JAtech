import React from "react";
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer" aria-label="Sidfot">
      <div className="footer__features">
        <div className="feature">
          <span role="img" aria-label="Globe">🌍</span>
          <p>Gratis frakt och returer</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="Plane">✈️</span>
          <p>Expressfrakt</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="Shield">🛡️</span>
          <p>Säkra betalningar</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="Smile">😊</span>
          <p>Nyheter varje dag</p>
        </div>
      </div>

      {/* 👇 Svart linje mellan sektionerna */}
      <hr className="footer__divider" />

      {/* 👇 Grå bakgrund bakom länkar */}
      <div className="footer__content-area">
        <div className="footer__content">
          <div className="footer__section">
            <h4>Shopping</h4>
            <ul>
              <li>Vinterjackor</li>
              <li>Pufferjackor</li>
              <li>Kappa</li>
              <li>Trenchcoats</li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Mina Sidor</h4>
            <ul>
              <li>Mina Ordrar</li>
              <li>Mitt Konto</li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Kundtjänst</h4>
            <ul>
              <li>Returnpolicy</li>
              <li>Integritetspolicy</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© JAtech</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
