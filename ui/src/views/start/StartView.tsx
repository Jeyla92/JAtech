import React from "react";
import styles from "@/views/start/StartView.module.css";
import { Heart, ShoppingBasket } from "lucide-react";   

export const StartView: React.FC = () => {
    const kategorier = ["Laptop", "Skärmar", "Stationära Datorer"];
    return (
        <div className={styles.startViewContainer}>
            <div>
                <div>
                        <img className={styles.logo} src="public/logopicture.jpg" alt="Logopicture" />
                </div>
                <div className={styles.searchAndIcons}>
                    
                    <input type="text" placeholder="Sök produkt här..."></input>
                    <div><Heart /></div>
                    <div><ShoppingBasket /></div>
                </div>
                
            </div>
            <div className={styles.categories}>
                <ul>
                    {kategorier.map((kategori, index) => (
                        <li key={index}>{kategori}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
