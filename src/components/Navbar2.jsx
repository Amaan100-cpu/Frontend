import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Navbar2.css"

const Navbar2 = () => {
  const [placeholder, setPlaceholder] = useState('');
  const [categories, setCategories] = useState("All");
  const [input, setInput] = useState("")
  const [clickInput, clickSetInput] = useState("")
  const [border, setBorder] = useState(false);
  const buttonRef = useRef(null);
 
  useEffect(() => {
    localStorage.setItem("transferfilterData", JSON.stringify({ clickInput, categories,inputData:input }))
    window.dispatchEvent(new Event("filterDataChanged"))
  }, [clickInput, categories,input])

  useEffect(() => {
    buttonRef.current.click()
  }, [])


  const updatePlaceholder = () => {
    if (window.innerWidth < 612) {
      setPlaceholder("Search for products...");
    } else {
      setPlaceholder("Search for products, brands and more...");
    }
  };

  window.addEventListener("click", (e) => {
    setBorder(false)
  })

  useEffect(() => {
    updatePlaceholder(); // Set initial placeholder
    window.addEventListener('resize', updatePlaceholder); // Add listener

    return () => {
      window.removeEventListener('resize', updatePlaceholder); // Clean up
    };
  }, []);

  return (
    <div className='navbar2Container1'>
      <div className='navbar2Container'>
        <div className='searchContainer' style={{ border: "3px solid #d4af37", borderRadius: "13px" }}>
          <input placeholder={placeholder} onChange={(e) => setInput(e.target.value)} />
          <button onClick={() => {
            localStorage.setItem("transferfilterData", JSON.stringify({ clickInput: input, categories }));
            window.dispatchEvent(new Event("filterDataChanged"));
          }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
          </button>

        </div>
      </div>
      <div className="categoriesContainer">
        <h4 onClick={() => setCategories("all")} ref={buttonRef} className={categories.includes("all")?"navCategory":""}>All</h4>
        <h4 onClick={() => setCategories("men")} className={categories=="men"?"navCategory":""}>Men</h4>
        <h4 onClick={() => setCategories("women")} className={categories=="women"?"navCategory":""}>Women</h4>
        <h4 onClick={() => setCategories("boys")} className={categories.includes("boys")?"navCategory":""}>Boys</h4>
        <h4 onClick={() => setCategories("Girls")} className={categories.includes("Girls")?"navCategory":""}>Girls</h4>
        <h4 onClick={() => setCategories("babies")} className={categories.includes("babies")?"navCategory":""}>Babies</h4>
      </div>
    </div>
  );
}

export default Navbar2;
