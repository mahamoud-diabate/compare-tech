import react, {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CompareBar from '../components/CompareBar';   

function Homepage(){
    const[searchTerm,setSearchTerm]=useState('');
    const[cpus, setCpus]=useState([]);

    const [compareList, setCompareList] = useState([]);
    const handleCompareToggle = (product) => {
    setCompareList(prevList => {
      const isSelected = prevList.some(item => item._id === product._id);

      if (isSelected) {
        return prevList.filter(item => item._id !== product._id);
      } else {
        return [...prevList, { ...product, productType: 'cpu' }];
      }
    });
  };

    useEffect(()=>{
        fetch(`https://mahamoud-compare-tech-api.onrender.com/api/cpus`)
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
            onCompareToggle={handleCompareToggle}
            productType="cpu"
            compareType="cpu"
        />
    </main>
    {compareList.length > 0 && (
        <CompareBar selectedItems={compareList} productType="cpu" />
    )}
    </>
);
}
export default Homepage;