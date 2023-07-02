import React, { lazy, useEffect, useState } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { selectProductItems } from "../src/Store/Selectors/productSelectors";
import {

    getProductItems,
} from "../src/Store/Thunks/productThunks";
// import { ProductItems } from "../src/Components/home-page/ProductItems";
import styles from "../styles/index.module.scss";
import Info from "../src/Components/home-page/Info";
;
import { ReusableCarousel } from "../src/Components/home-page/ReusableCarousel";
import { ProductItemModel } from "../src/Store/Models/Product/ProductItem";
import { CustomDivider } from "../src/Components/divider/CustomDivider";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
let ProductItems = dynamic(() => import("../src/Components/home-page/ProductItems"));
const Home = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [scrollY, setScrollY] = useState(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [localStorageitems, setLocalStorageItems] = useState<
        ProductItemModel[]
    >([]);

    function logit() {
        setScrollY(window.pageYOffset);
    }

    const dispatch = useAppDispatch();

    const productItems = useAppSelector(selectProductItems);

    useEffect(() => {
        const localStorageItems = JSON.parse(
            localStorage?.getItem("recentlyViewed") || "[]"
        );

        setLocalStorageItems(
            localStorageItems.filter((item: ProductItemModel) => item.productId)
        );
        function watchScroll() {
            window.addEventListener("scroll", logit);
        }
        watchScroll();

        return () => {
            window.removeEventListener("scroll", logit);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsMounted(true);
        if (isMounted && !productItems.length) {
            dispatch(getProductItems(""));
        }

        //eslint-disable-next-line
    }, [isMounted]);

    useEffect(() => {
        observer();
        if (visible) return;
        if (scrollY > 100) {
            setVisible(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollY]);

    const observer = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("styles_fadeIn");
                    entry.target.classList.add("reaveal");
                    return;
                }
                observer.unobserve(entry.target);
            });
        });

        const fadeOut = document.querySelectorAll(".styles_fadeOut");

        fadeOut.forEach((elem) => {
            observer.observe(elem);
        });
    };

    return (
        <>
            <Box className={styles.heroContainer}>
                <div className={styles.container}>
                    <CardMedia
                        component="video"
                        autoPlay
                        loop
                        muted
                        src="/hero_video.mp4"
                    />
                </div>
                <div className={styles.secondContainer}>
                    <Box className={styles.hero_wrapper}>
                        <Typography variant="h1" className={styles.hero}>
                            PURE <span>•</span> RAW <span>•</span> DELICIOUS
                        </Typography>
                        <Typography className={styles.discover}>
                            Descoperă mierea naturală din Transilvania.
                        </Typography>
                    </Box>
                    <Link href="/miere">
                        <Button className={styles.products_btn}>Produse</Button>
                    </Link>
                </div>
            </Box>

            <Image
                // src="/dropplets.webp"
                // src="/dropplets_v2.png"
                src="/dropplets_v3.webp"
                alt=""
                className={
                    !visible
                        ? `${styles.dropplets} ${styles.fadeOut}`
                        : `${styles.dropplets} ${styles.fadeIn}`
                }
                width={100}
                height={100}
                loading="lazy"
            />

            <ProductItems />

            {localStorageitems.length > 0 && (
                <>
                    <CustomDivider />
                    <Typography className={styles.title}>
                        Produse vizualizate recent
                    </Typography>

                    <ReusableCarousel items={localStorageitems} />
                </>
            )}

            <CustomDivider />

            <Typography className={styles.title}>Retete</Typography>


            <CustomDivider />
            <Typography className={styles.title}>Articole</Typography>

            {/* <Info /> */}
        </>
    );
};



export default Home;
