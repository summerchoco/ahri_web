import { useEffect } from "react";
import "slick-carousel";

export  function useGlobalParallax() {
    useEffect(() => {
        const bg = document.getElementById("parallax-bg");
            const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const offset = scrollY * 0.3; // 속도 조절
            bg.style.transform = `translateY(${offset}px)`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
}

