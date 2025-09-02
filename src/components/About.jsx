import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, faHeart, faLightbulb, faHandHoldingHeart, 
  faCheckCircle, faArrowUp 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedinIn, faTwitter, faInstagram, 
  faBehance, faDribbble, faGithub
} from '@fortawesome/free-brands-svg-icons';
import './AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show back-to-top button when scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      const backToTop = document.querySelector('.back-to-top');
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Our Story</h1>
        <p>Discover the journey of Amacloth - where premium fashion meets cutting-edge electronics</p>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Amacloth founders" 
          />
        </div>
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>Founded in 2015, Amacloth began as a small boutique with a vision to revolutionize online shopping. What started as a passion project between two college friends has now grown into one of the most trusted e-commerce platforms for premium fashion and electronics.</p>
          <p>Our mission is simple: to provide our customers with high-quality products, exceptional service, and a seamless shopping experience that combines the best of fashion and technology.</p>
          <p>Today, we serve millions of customers worldwide, offering carefully curated collections that blend style, quality, and innovation.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section reverse">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Amacloth warehouse" 
          />
        </div>
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>At Amacloth, we believe that everyone deserves access to premium products without compromising on quality or breaking the bank. We're committed to:</p>
          <ul className="mission-list">
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="mission-icon" />
              <span>Providing authentic, high-quality products at competitive prices</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="mission-icon" />
              <span>Delivering exceptional customer service with a personal touch</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="mission-icon" />
              <span>Creating a seamless shopping experience across all devices</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="mission-icon" />
              <span>Supporting ethical and sustainable business practices</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="mission-values">
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <h3>Quality First</h3>
            <p>We meticulously select every product in our collection to ensure it meets our high standards of quality and craftsmanship.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3>Customer Love</h3>
            <p>Our customers are at the heart of everything we do. We go above and beyond to create delightful shopping experiences.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <h3>Innovation</h3>
            <p>We constantly evolve to bring you the latest trends and technologies in fashion and electronics.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
            </div>
            <h3>Integrity</h3>
            <p>We believe in transparent, honest business practices that build trust with our customers and partners.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Leadership</h2>
        <div className="team-grid">
          <div className="team-member">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Sarah Johnson" 
              className="team-photo" 
            />
            <div className="team-info">
              <h3>Sarah Johnson</h3>
              <p className="position">CEO & Co-Founder</p>
              <p className="bio">With over 15 years in the fashion industry, Sarah brings unparalleled expertise in curating our premium collections.</p>
              <div className="team-social">
                <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              </div>
            </div>
          </div>
          <div className="team-member">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Michael Chen" 
              className="team-photo" 
            />
            <div className="team-info">
              <h3>Michael Chen</h3>
              <p className="position">CTO & Co-Founder</p>
              <p className="bio">A tech visionary, Michael ensures our platform delivers cutting-edge features and a seamless user experience.</p>
              <div className="team-social">
                <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </div>
          </div>
          <div className="team-member">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Emily Rodriguez" 
              className="team-photo" 
            />
            <div className="team-info">
              <h3>Emily Rodriguez</h3>
              <p className="position">Head of Design</p>
              <p className="bio">Emily's creative direction shapes the visual identity of Amacloth and ensures our products meet the highest aesthetic standards.</p>
              <div className="team-social">
                <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                <a href="#"><FontAwesomeIcon icon={faBehance} /></a>
                <a href="#"><FontAwesomeIcon icon={faDribbble} /></a>
              </div>
            </div>
          </div>
          <div className="team-member">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="David Kim" 
              className="team-photo" 
            />
            <div className="team-info">
              <h3>David Kim</h3>
              <p className="position">Head of Operations</p>
              <p className="bio">David's logistical expertise ensures our products reach customers quickly and our operations run smoothly.</p>
              <div className="team-social">
                <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Experience Amacloth?</h2>
        <p>Join millions of satisfied customers who trust us for their fashion and electronics needs.</p>
        <a href="/" className="cta-btn">Shop Now</a>
      </section>

      {/* Back to Top Button */}
      <button className="back-to-top" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </main>
  );
};

export default AboutUs;