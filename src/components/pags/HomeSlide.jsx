import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function HomeSlide({ title, produtos, addCart }) {

    const [numSlide, setNumSlide] = useState(5);

    useEffect(() => {
        const updateItensSlide = () => {
            const width = window.innerWidth;
            
            if (width <= 650) {
                setNumSlide(1);
            } else if (width <= 900) {
                setNumSlide(2);
            } else if (width <= 1315) {
                setNumSlide(3);
            } else {
                setNumSlide(4);
            }
        };

        updateItensSlide();
        window.addEventListener("resize", updateItensSlide);
        return () => window.removeEventListener("resize", updateItensSlide);
    }, []);

    return (
        <div className="categoria">
            <h2>{title}</h2>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={40}
                slidesPerView={numSlide}
            >
                {produtos.map((produto) => (
                    <SwiperSlide className="slide-item" key={produto.id}>
                        <ProductCard produto={produto} addCart={addCart} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Link className="ver-todos" to="/produtos">Ver Todos os Produtos</Link>
        </div>
    );
};

export default HomeSlide;