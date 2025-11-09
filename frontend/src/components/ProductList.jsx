import React from 'react';
import {Link} from 'react-router-dom';
import './ProductList.css';
function ProductList({cpus,compareList=[],onCompareToggle=()=>{}, productType="cpu"}) {
    const getTitle=()=>{
        if(productType==='gpu') return 'Cartes Graphiques(GPUs';
        if(productType==='laptop') return 'Ordinateurs Portables';
        if(productType=='telephone') return 'Téléphones';
        return 'processeurs(Cpus)';
    };
    return(
    <section className="product-list">
        <h2>Liste des {getTitle()}</h2>
        
        <div className="grid-container">
            {cpus.map(product=>(
                <article key={product._id} className="product-card">
                    <h3>{product.name}</h3>
                    <div className="compare-checkbox">
                        <input
                        type="checkbox"
                        id={`compare-${product._id}`}
                        checked={compareList.includes(product._id)}
                        onChange={()=>onCompareToggle(product,productType)}
                        />
                        <label htmlFor={`compare=${product._id}`}>Comparer</label>
                        </div>      
                    <div className="spec-list">
                        <p><strong>Marque:</strong>{product.brand}</p>
                        {productType==='cpu'&&(
                        <>
                            {product.cores && (<p><strong>Cœurs:</strong> {product.cores}</p>)}
                            {product.threads && (<p><strong>Threads:</strong> {product.threads}</p>)}
                            {product.max_freq_ghz && (<p><strong>Fréq. Max:</strong> {product.max_freq_ghz}</p>)}
                        </>
                        )}
                        {productType==='gpu' &&(
                        <>
                            {product.cores && (<p><strong>Cœurs CUDA/Stream:</strong> {product.cores}</p>)}
                            {product.memory_gb && (<p><strong>Mémoire:</strong> {product.memory_gb} GB</p>)}
                            {product.memory_type && (<p><strong>Type:</strong> {product.memory_type}</p>)}
                        </>
                        )}
                        {productType==='laptop' &&(
                            <>
                            {product.cpu_name &&(<p><strong>CPU:</strong>{product.cpu_name}</p>)}
                            {product.gpu_name &&(<p><strong>GPU:</strong>{product.gpu_name}</p>)}
                            {product.ram_gb &&(<p><strong>RAM:</strong>{product.ram_gb} GB</p>)}
                             {product.storage_gb &&(<p><strong>Stockage:</strong>{product.storage_gb} GB</p>)}
                            </>
                        )}
                        {productType==='telephone'&&(
                            <>
                            {product.display_size &&(<p><strong>Écran:</strong>{product.display_size}</p>)}
                            {product.cpu_name &&(<p><strong>CPU:</strong>{product.cpu_name}</p>)}
                            {product.ram_gb &&(<p><strong>RAM:</strong>{product.ram_gb}</p>)}
                            {product.battery_mah &&(<p><strong>Batterie:</strong>{product.battery_mah}mAh</p>)}
                            </>
                        )}
                    </div>
                    <Link to={`/${productType}/${product._id}`} className="cta-link">
              Voir les détails
            </Link>
          </article>
        ))}
      </div>
    </section>
);
}
export default ProductList;