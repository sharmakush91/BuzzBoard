import React, { useState } from "react";
import styles from "./imageCarousel.module.css";

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <span className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
        &#10094;
      </span>
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className={styles.image}
      />
      <span className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
        &#10095;
      </span>
    </div>
  );
}
