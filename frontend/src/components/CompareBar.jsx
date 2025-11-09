import React from 'react';
import {useNavigate} from 'react-router-dom';
import './CompareBar.css';

function CompareBar({selectedItems}){
    const navigate=useNavigate();
    const handleCompareClick=()=>{
        navigate('/compare');
    };
    return(
        <div className="compare-bar">
            <div className="selected-items">
                <strong>Produits à comparer</strong>
                {selectedItems.map(item=>(
                    <span key={item._id} className="item-bag">
                        {item.name}
                    </span>
                ))}
            </div>
            <button className="compare-button"
            onClick={handleCompareClick}
            >
                Comparer({selectedItems.length})
            </button>
        </div>
    );
}
export default CompareBar;