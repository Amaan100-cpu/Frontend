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

  // ✅ Debounced localStorage update to reduce frequent writes
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        "transferfilterData",
        JSON.stringify({ clickInput, categories, inputData: input })
      );
      window.dispatchEvent(new Event("filterDataChanged"));
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [clickInput, categories, input]);

  // ✅ Delay the ref click to ensure DOM is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }, 100); // small delay after mount

    return () => clearTimeout(timer);
  }, []);

  // ✅ Set placeholder based on screen size
  const updatePlaceholder = () => {
    if (window.innerWidth < 612) {
      setPlaceholder("Search for products...");
    } else {
      setPlaceholder("Search for products, brands and more...");
    }
  };

  // ✅ Handle clicks outside for border control (with proper cleanup)
  useEffect(() => {
    const handleClick = () => setBorder(false);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // ✅ Responsive placeholder logic with cleanup
  useEffect(() => {
    updatePlaceholder(); // Set on first render
    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, []);

  return (
    <div className='navbar2Container1'>
      <div className='navbar2Container'>
        <div
          className='searchContainer'
          style={{
            border: border ? "3px solid #d4af37" : "none",
            borderRadius: "13px",
          }}
        >
          <input
            placeholder={placeholder}
            onFocus={() => setBorder(true)}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => {
              clickSetInput(input);
              localStorage.setItem(
                "transferfilterData",
                JSON.stringify({ clickInput: input, categories })
              );
              window.dispatchEvent(new Event("filterDataChanged"));
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
        <h4
          onClick={() => setCategories("men")}
          className={categories === "men" ? "navCategory" : ""}
        >
          Men
        </h4>
        <h4
          onClick={() => setCategories("women")}
          className={categories === "women" ? "navCategory" : ""}
        >
          Women
        </h4>
        <h4
          onClick={() => setCategories("boys")}
          className={categories.includes("boys") ? "navCategory" : ""}
        >
          Boys
        </h4>
        <h4
          onClick={() => setCategories("Girls")}
          className={categories.includes("Girls") ? "navCategory" : ""}
        >
          Girls
        </h4>
        <h4
          onClick={() => setCategories("babies")}
          className={categories.includes("babies") ? "navCategory" : ""}
        >
          Babies
        </h4>
      </div>
    </div>
  );
};

export default Navbar2;
