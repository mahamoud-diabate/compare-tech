import React, {useState,useEffect} from 'react';
import{useParams} from 'react-router-dom';

function GpuDetailPage(){
    const {id}=useParams();
    const[gpu,setGpu]=useState(null);
    useEffect(()=>{
        fetch(`http://localhost:3001/api/gpus/${id}`)
        .then(response=>response.json())
        .then(data=>{
            setGpu(data);
        })
        .catch(error=>console.error("Erreur:",error));
    },[id]); 
    if(!gpu){
        return<div>Chargement...</div>;
    }
    return(
        <main style={{padding:'40px',fontFamily:'Arial, sans-serif'}}>
            <h1>{gpu.name}</h1>
            <div style={{maxWidth:'400px'}}>
                <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #eee',padding:'8px 0'}}>
                    <strong>Marque:</strong>
                    <span>{gpu.brand}</span>
                </div>
                {gpu.cores &&(
                    <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #eee',padding:'8px 0'}}>
                        <strong>Cœurs CUDA/Stream:</strong>
                        <span>{gpu.cores}</span>
                    </div>
                )}
                {gpu.memory_gb &&(
                    <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid #eee',padding:'8px 0'}}>
                        <strong>Mémoire :</strong>
                        <span>{gpu.memory_type}</span>
                    </div>
                )}
                {gpu.mermory_type &&(
                    <div Style={{display:'flex', justifyContent:'space-between',borderBottom:'1px solid #eee',padding:'8px 0'}}>
                        <strong>Type Mémoire :</strong>
                        <span>{gpu.memory_type}</span>
                    </div>
                )}
            </div>
        </main>
    );

    }
    export default GpuDetailPage;