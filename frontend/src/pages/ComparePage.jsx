import React, {useState,useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import CompareTable from '../components/CompareTable';
function ComparePage(){
    const{compareList}=useOutletContext();
    if (!compareList || compareList.length === 0) {
    return (
      <main style={{ padding: '40px' }}>
        <h1>Comparaison des Produits</h1>
        <p>Aucun produit sélectionné. Retournez à la page d'accueil pour en ajouter.</p>
      </main>
    );
  }

    return(
        <main style={{ padding: '40px' }}>
      <h1>Comparaison des Produits</h1>
      <CompareTable products={compareList} />
    </main>
  );
}

export default ComparePage;