import './ContactSection.scss';
import React, {ForwardRefRenderFunction, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {useSpring, animated} from "@react-spring/web";
const ContactSection: ForwardRefRenderFunction<HTMLDivElement> = (_, section) => {
    const background = useRef<HTMLDivElement>(null);

    const createTile = () => {
        const tile = document.createElement("div");
        tile.classList.add("contact-tile");
        return tile;
    }

    const createTiles = (qtt:number) => {
        if (!background.current) return;
        Array.from(Array(qtt)).forEach(() => {
            background.current?.appendChild(createTile());
        })
    }

    const createGrid = () => {
        if (background.current == null) return;
        background.current.innerHTML = "";

        const size = document.body.clientWidth > 800 ? 100 : 50;
        const height = background.current.getBoundingClientRect().height;

        const columns = Math.floor(document.body.clientWidth / size);
        const rows = Math.floor(height / size);

        background.current.style.setProperty("--columns", columns.toString());
        background.current.style.setProperty("--rows", rows.toString());

        createTiles(columns * rows);
    }

    const [spring, setSpring] = useSpring(() => ({
        "--mouse-x": 0,
        "--mouse-y": 0,
        config: { mass: 5, tension: 350, friction: 65 }
    }));

    React.useEffect(() => {
        createGrid();
        window.addEventListener("resize", createGrid);
        return () => {
            window.removeEventListener("resize", createGrid);
        }
    }, []);

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // @ts-ignore
        if (!section.current) return;
        // @ts-ignore
        const rect = section.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setSpring({"--mouse-x": x, "--mouse-y": y});
    }


    return (
        <animated.div ref={section} id="contact" onMouseMove={onMouseMove} className="mt-[20rem] md:h-[12rem] h-[20rem] shadow-xl overflow-hidden relative bg-[rgb(15,15,15)] hover-effect transform-none"
                 style={
                     // @ts-ignore
            {"--mouse-x": spring["--mouse-x"], "--mouse-y": spring["--mouse-y"]}}>
            <div ref={background} className="grid-background"></div>
            <div className="absolute top-0 w-full z-10">
                <h3 className="home__title md:text-7xl text-6xl md:mb-5 mb-5">Contact</h3>
                <div className="grid md:grid-cols-3 grid-cols-[9fr_3fr] gap-5 grid-flow-row w-full md:mt-[unset] mt-10 ">
                    <div className="flex flex-col items-center">
                        <h3 className="text-3xl font-[Kanit] font-black">Mail</h3>
                        <a href="mailto:raphael@aime-rivard.fr" className="text-2xl">raphael@aime-rivard.fr</a>
                    </div>
                    <div className="flex flex-col items-center row-span-2">
                        <h3 className="text-3xl font-[Kanit] font-black">Liens</h3>
                        <div className="flex md:flex-row flex-col gap-4">
                            <a href="https://www.linkedin.com/in/raphael-aime/" className="md:text-2xl text-5xl"><FontAwesomeIcon icon={faLinkedin} /></a>
                            {/*<a href="https://twitter.com/raphaelaime_" className="text-2xl"><FontAwesomeIcon icon={faTwitter} /></a>*/}
                            <a href="https://github.com/ephilem" className="md:text-2xl text-5xl"><FontAwesomeIcon icon={faGithub} /></a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-3xl font-[Kanit] font-black">Téléphone</h3>
                        <a href="tel:+330751617312" className="text-2xl">07 51 61 73 12</a>
                    </div>
                </div>
            </div>
        </animated.div>
    );
};

export default React.forwardRef(ContactSection);