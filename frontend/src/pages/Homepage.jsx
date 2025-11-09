import react, {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

function Homepage(){
    const[searchTerm,setSearchTerm]=useState('');
    const[cpus, setCpus]=useState([]);

    const {compareList,onCompareToggle}=useOutletContext('');

    useEffect(()=>{
        fetch(`https://mahamoud-compare-tech-api.onrender.com`)
        .then(response=>response.json())
        .then(data=>setCpus(data))
        .catch(error=>console.error("Erreur:",error));
    },[]);

    const filteredCpus=cpus.filter(cpu=>{
        const searchLower=searchTerm.toLowerCase();
        const nameMatches=cpu.name.toLowerCase().includes(searchLower);
        const brandMatches=cpu.brand.toLowerCase().includes(searchLower);
        return nameMatches||brandMatches;
    });

    const compareIds= compareList.map(item=>item._id);
    return (
    <>
    <Hero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        />
    <main>
        <ProductList 
            cpus={filteredCpus}
            compareList={compareIds}
            onCompareToggle={onCompareToggle}
            productType="cpu"
        />
    </main>
    </>
);
}
export default Homepage;