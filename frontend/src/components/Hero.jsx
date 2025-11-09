import React from 'react';
import './Hero.css';
function Hero({searchTerm, onSearchChange}){
    return(
        <section className="hero">
            <h2>Trouvez le meilleur materiel</h2>
            <p>Comparez des milliers de produits en 1 clic.</p>

            <form>
                <input
                    type="search" 
                    placeholder="Rechercher un produit(ex:RTX 5080)..."
                    value={searchTerm}
                    onChange={(e)=> onSearchChange(e.target.value)}
                />
                <button type="submit">Rechercher</button>
            </form>
        </section>
    );
}
export default Hero;