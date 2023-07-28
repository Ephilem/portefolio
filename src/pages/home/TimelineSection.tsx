import React, {useEffect} from "react";
import {useScroll} from "@react-spring/web";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";

export function TimelineSection() {

    const { scrollYProgress } = useScroll();

    useEffect(() => {

    }, [scrollYProgress]);

    return (
        <div className="h-screen w-full">
            <h3 className="home__title md:text-7xl text-6xl sticky mt-10">Expériences</h3>
            <div className="flex items-center w-fit">
                <Parallax pages={2} horizontal className="flex">
                    <ParallaxLayer offset={0} speed={0.5} className="">
                        <div className="w-screen h-32 bg-error" />
                    </ParallaxLayer>
                    <ParallaxLayer offset={1} speed={0.5} className="">
                        <div className="w-screen h-32 bg-info" />
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    );
}