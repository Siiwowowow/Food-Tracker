import React, { useState, useEffect } from 'react';
import './Slider.css'; // Make sure this CSS file is linked for custom styles if needed

// Import your images
import IMG1 from '../../assets/img1.jpg';
import IMG2 from '../../assets/img2.jpg';
import IMG3 from '../../assets/img3.jpg';
import IMG4 from '../../assets/img4.jpg';

const Slider = () => {
    const images = [
        {
            src: IMG1,
            alt: "Image 1",
            title: "Save More, Waste Less",
            description: "Stop throwing money in the bin. Our app helps you track what's in your fridge and pantry, so you can plan meals efficiently and use everything before it spoils."
        },
        {
            src: IMG2,
            alt: "Image 2",
            title: "Eat Smarter, Live Sustainably",
            description: "Transform your kitchen into a waste-free zone. Easily monitor your food inventory and expiry dates to ensure every ingredient contributes to delicious meals, not landfill"
        },
        {
            src: IMG3,
            alt: "Image 3",
            title: "Discover Culinary Delights",
            description: "Unleash your inner chef with our app. Get inspired by recipes tailored to the ingredients you have, reducing waste and making  ."
        },
        {
            src: IMG4,
            alt: "Image 4",
            title: "Fourth Captivating Moment",
            description: "Experience the future of food management. Our app not only helps you save money but also empowers you to make sustainable choices, ensuring a healthier planet for generations to come."
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Autoplay logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [images.length]);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    const handleArrowClick = (direction) => {
        if (direction === 'prev') {
            setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
        } else {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }
    };

    return (
        <div>
            <div className="carousel w-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        id={`slide${index + 1}`}
                        className={`carousel-item relative w-full ${currentSlide === index ? 'block' : 'hidden'}`}
                    >
                        <img
                            src={image.src}
                            className="w-full object-cover h-[450px]"
                            alt={image.alt}
                        />
                        
                        <div
                            className="absolute inset-0 flex flex-col items-center justify-center text-white p-4"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
                                // backdropFilter: 'blur(2px)', // Add this line for blur
                               
                            }}
                        >
                            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-4">{image.title}</h1>
                            <p className="text-xs lg:max-w-5xl lg:text-lg   font-light text-center">{image.description}</p>
                        </div>
                        {/* Navigation Arrows */}
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a
                                href={`#slide${(index === 0 ? images.length : index)}`}
                                className="btn btn-circle"
                                onClick={() => handleArrowClick('prev')}
                            >
                                ❮
                            </a>
                            <a
                                
                                className="btn btn-circle"
                                onClick={() => handleArrowClick('next')}
                            >
                                ❯
                            </a>
                        </div>

                       
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-0">
                            {images.map((_, dotIndex) => (
                                <a
                                    key={`dot-${dotIndex}`}
                                    className={`btn btn-circle btn-xs ${currentSlide === dotIndex ? 'btn-active' : ''}`}
                                    onClick={() => handleDotClick(dotIndex)}
                                >
                                    
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;