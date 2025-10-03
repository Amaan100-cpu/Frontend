import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Navbar2.css';

const Navbar2 = () => {
  const [placeholder, setPlaceholder] = useState('');
  const [categories, setCategories] = useState("All");
  const [input, setInput] = useState("");
  const [clickInput, clickSetInput] = useState("");
  const [border, setBorder] = useState(false);
  const buttonRef = useRef(null);

  // ✅ Fix: Use useEffect for window resize
  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 612) {
        setPlaceholder("Search for products...");
      } else {
        setPlaceholder("Search for products, brands and more...");
      }
    };

    updatePlaceholder(); // Set initial placeholder
    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, []);

  // ✅ Fix: Safe window click listener
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.searchContainer')) {
        setBorder(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // ✅ Fix: Safe access to buttonRef
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  // ✅ Still allowed: update on changes
  useEffect(() => {
    localStorage.setItem("transferfilterData", JSON.stringify({ clickInput, categories, inputData: input }));
    window.dispatchEvent(new Event("filterDataChanged"));
  }, [clickInput, categories, input]);

  return (
    <div className='navbar2Container1'>
      <div className='navbar2Container'>
        <div className='searchContainer' style={{ border: "3px solid #d4af37", borderRadius: "13px" }}>
          <input
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => {
              localStorage.setItem("transferfilterData", JSON.stringify({ clickInput: input, categories }));
              window.dispatchEvent(new Event("filterDataChanged"));
              clickSetInput(input); // ✅ Keep state in sync
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
          </button>
        </div>
      </div>

      <div className="categoriesContainer">
        <h4
          onClick={() => setCategories("all")}
          ref={buttonRef}
          className={categories.includes("all") ? "navCategory" : ""}
        >
          All
        </h4>
        <h4 onClick={() => setCategories("men")} className={categories === "men" ? "navCategory" : ""}>Men</h4>
        <h4 onClick={() => setCategories("women")} className={categories === "women" ? "navCategory" : ""}>Women</h4>
        <h4 onClick={() => setCategories("boys")} className={categories === "boys" ? "navCategory" : ""}>Boys</h4>
        <h4 onClick={() => setCategories("Girls")} className={categories === "Girls" ? "navCategory" : ""}>Girls</h4>
        <h4 onClick={() => setCategories("babies")} className={categories === "babies" ? "navCategory" : ""}>Babies</h4>
      </div>
    </div>
  );
};

export default Navbar2;
