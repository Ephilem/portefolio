
import {useSpring, animated} from "@react-spring/web";
import {Competence} from "../../model/Competence.ts";
import {useRef, useState} from "react";
import {CompetenceLevelDecoration} from "./CompetenceLevelDecoration.tsx";


type CompetenceCardProps = {
    comp: Competence;
};

const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function CompetenceCard({comp} : CompetenceCardProps) {
    const [isFlipped, setFlipped] = useState(false);
    const [yRotation, setYRotation] = useState(0);

    const container = useRef<HTMLDivElement | null>(null);
    const [spring, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 80 },
        onChange: {
            xys: (_) => {
                updateYRotation();
            }
        }
    }));

    const mouseClick = (x: number, y: number) => {
        const newFlippedValue = !isFlipped;
        setFlipped(newFlippedValue)
        updateTransformation(x, y, newFlippedValue);
    }

    const updateTransformation = (x: number, y: number, flipped: boolean) => {
        const c: HTMLSpanElement | null = container.current;

        if (c != null) {
            const rectangle = c.getBoundingClientRect();
            const left = rectangle.left;
            const top = rectangle.top;
            const width = rectangle.width;
            const height = rectangle.height;

            set({ xys: [
                    ((top + height / 2 - y) / (height / 2)) * 12,
                    -((left + width / 2 - x) / (width / 2)) * 12 + (flipped ? 360 : 0),
                    1.1
                ] });
        }
    }

    const updateYRotation = () => {
        setYRotation(spring.xys.get()[1]);
    }

    return (
            <animated.div ref={container} className={`lg:w-[200px] lg:h-[200px] w-[200px] h-[200px] card shadow-xl p-4 bg-[#171212] comp-card select-none cursor-pointer
            ${yRotation > 180 ? 'rotate-45' : ''}`}
                    onMouseMove={(e) => {
                        updateTransformation(e.clientX, e.clientY, isFlipped);
                    }}
                    onMouseLeave={() => set({ xys: [0, 0 + (isFlipped ? 360 : 0), 1] })}
                    onClick={(e) => {
                        mouseClick(e.clientX, e.clientY);
                    }}
                    style={{ transform: spring.xys.interpolate(trans)}}>
                <CompetenceLevelDecoration  level={comp.level}  cardRotation={yRotation} />
                <div className={`flex items-center flex-col flex-grow ${yRotation > 90 ? 'hidden' : ''}`}>
                    <img src={comp.icon_path} alt={`Logo ${comp.name}`} className="self-center h-[100px] max-w-[175px] lg:h-[100px]"/>
                    <div className="flex flex-grow items-center">
                        <span className="font-bold text-xl lg:text-xl flex justify-center items-center text-center font-[Kanit] w-full">{comp.name}</span>
                    </div>
                </div>
                <div className={`${yRotation > 270 ? '' : 'hidden'} ml-8`}>
                    <span className="font-bold text-[1em] font-[Kanit] w-full leading-tight">{comp.name}</span>
                    <p className="lg:text-[0.9em] text-xs">{comp.description}</p>
                </div>
            </animated.div>
    );
}