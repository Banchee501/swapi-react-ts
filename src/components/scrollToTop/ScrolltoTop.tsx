import { useState, useEffect } from 'react';
import scrollToUp from '../../resources/img/scrollToTop.svg';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsVisible(scrollTop > 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} 
        onClick={scrollToTop}
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '40px',
            width: '200px',
            height: '200px',
            cursor: 'pointer',
            opacity: '1',
            transition: 'opacity 0.3s ease'
        }}>
            <img src={scrollToUp} alt="Scroll To Top" />
        </div>
    );
};

export default ScrollToTopButton;