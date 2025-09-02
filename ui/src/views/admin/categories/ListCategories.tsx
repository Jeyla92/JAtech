import React, { useState, useEffect } from "react";
import styles from './NewCategory.module.css';

export const ListCategories: React.FC = () => {
    const [categories, setCategories] = useState<[]>();

    useEffect(() => {
        fetch('http://localhost:3000/api/list-category')
        .then(((response) => response.json()))
        .then((data) => setCategories(data))
    }, []);
    
    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Administration</h1>
            </div>
            <div className="display-flex">
                <div className="admin-sidebar">
                    <a href="/admin/categories/products">Produkter</a>
                    <a href="/admin/categories/list-categories">Kategorier</a>   
                </div>
                <div className={styles.listCategoriesContent}>
                    <div className={styles.listCategoriesHeader}>
                        <h2>Namn</h2>
                        <a href="/admin/categories/new-category" className={styles.btnNew}>Ny kategori</a>
                    </div>
                    <div className={styles.categoriesTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Kategorier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.map((category: any) => (
                                    <tr key={(category.id)}>
                                        <td>{category.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                                
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}