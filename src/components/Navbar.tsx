import './Narbar.scss';
import logo from '../assets/big_logo.svg';
import {useEffect, useRef, useState} from "react";
import {useSpring, animated} from "@react-spring/web";

interface NavbarProps {
    activeButtonIndex?: number;

}

export function Navbar({ activeButtonIndex = 0 }: NavbarProps) {
    const cursorRef = useRef<HTMLSpanElement | null>(null);
    const buttonsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const [localActiveIndex, setLocalActiveIndex] = useState(activeButtonIndex);
    const [hideCursor, setHideCursor] = useState(true);

    // Ressort pour la valeur gauche du curseur de la navbar
    const [spring, set] = useSpring(() => ({
        left: 0,
        config: { mass: 5, tension: 350, friction: 65 }
    }));

    const moveToButtonByIndex = (index: number) => {
        const button = buttonsRef.current[index];
        if (!button) {
            setHideCursor(true);
            return;
        }
        else setHideCursor(false);

        const cursor : HTMLSpanElement | null = cursorRef.current;
        const rect = button.getBoundingClientRect();

        if (!button.parentElement || !button.parentElement.parentElement) return;
        const parentRect = button.parentElement.parentElement.getBoundingClientRect();

        if (cursor) {
            set({left: (rect.left - parentRect.left) + (rect.width / 2) - (cursor.offsetWidth / 2)});
        }
    }

    useEffect(() => {
        moveToButtonByIndex(localActiveIndex);
    }, [localActiveIndex]);

    useEffect(() => {
        setLocalActiveIndex(activeButtonIndex);
    }, [activeButtonIndex]);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        setLocalActiveIndex(index);
        event.preventDefault();
        if (!event.target || !(event.target instanceof HTMLAnchorElement)) return;
        const anchorTarget = document.getElementById(event.target.href.split('#')[1]);
        if (anchorTarget) {
            anchorTarget.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
    }


    return (
        <div className="">
            <nav className="navbar w-[calc(100%-28px)]  m-4 fixed top-0 bg-[#00000052]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 w-52">
                            <li><a href="#competence" onClick={(event) => handleClick(event, 0)}>Compétences</a></li>
                            <li><a href="#projects" onClick={(event) => handleClick(event, 0)}>Projets</a></li>
                            <li><a href="#exp" onClick={(event) => handleClick(event, 0)}>Expériences</a></li>
                            <li><a href="#contact" onClick={(event) => handleClick(event, 0)}>Me Contacter</a></li>
                        </ul>
                    </div>
                    <img className="fill-white h-12" src={logo} alt="logo" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold navbar__item-wrapper">
                        <li><a href="#competence" ref={(el) => buttonsRef.current[0] = el} onClick={(event) => handleClick(event, 0)} className="btn btn-sm btn-ghost">Compétences</a></li>
                        <li><a href="#projects" ref={(el) => buttonsRef.current[1] = el} onClick={(event) => handleClick(event, 1)} className="btn btn-sm btn-ghost">Projets</a></li>
                        <li><a href="#exp" ref={(el) => buttonsRef.current[2] = el} onClick={(event) => handleClick(event, 2)} className="btn btn-sm btn-ghost">Expériences</a></li>
                        <li><a href="#contact" ref={(el) => buttonsRef.current[3] = el} onClick={(event) => handleClick(event, 3)} className="btn btn-sm btn-ghost">Me Contacter</a></li>
                        <animated.span className="navbar__cursor bg-secondary" ref={cursorRef} style={{left: spring.left, transform: `scale(${hideCursor ? 0 : 1})`, transition: `transform 0.3s ease-in-out`}}/>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn bg-primary uppercase" >CV</button>
                </div>
            </nav>
        </div>
    );
}