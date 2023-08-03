import {Experience} from "../model/Experience.tsx";
import React, {useEffect} from "react";
import {animated, useTrail} from "@react-spring/web";
import cursorImg from "../assets/cursor.svg";

type TimelineNodeProps = {
    data: Experience,
    isActivated: boolean,
}


const TimelineNode = ({data, isActivated}: TimelineNodeProps) => {

    return (
        <div className="relative">
            <div style={
                // @ts-ignore
                {"--before-scale": isActivated ? 1 : 0}}
                 className={`rounded-3xl w-10 h-10 
                            before:rounded-3xl before:block before:w-10 before:h-10 before:bg-accent before:scale-[var(--before-scale)] before:transition-all
                            after:rounded-3xl after:block after:w-5 after:h-5 after:absolute after:bg-white after:left-[10px] after:top-[10px] after:z-20`}>
                <div className="rotate-90">
                    <span className="font-bold absolute left-8 top-[-35px] whitespace-nowrap  " style={{fontVariant: "all-petite-caps"}}>{data.date}</span>
                </div>
            </div>
        </div>
    );
};

type TimelineProps = {
    data: Experience[];
}

function TimelineContent({toShow} : {toShow: Experience | null}) {

    const [animate, setAnimate] = React.useState(false);
    const [lastValue, setLastValue] = React.useState<string | undefined>(undefined);

    const trail = useTrail(1, {
        config: { mass: 5, tension: 2000, friction: 200 },
        opacity: animate ? 1 : 0,
        x: animate ? 0 : 20,
        height: animate ? 80 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    })

    useEffect(() => {
        if (toShow?.title === lastValue) return;

        if (toShow === null) {
            setAnimate(false);
        } else if (!lastValue) {
            setAnimate(true);
        } else {
            setAnimate(false);
            setTimeout(() => {
                setAnimate(true);
            }, 100);
        }

        setLastValue(toShow?.title)

    }, [toShow])

    return (
        <div className="flex flex-col">
            <animated.div style={trail[0]}>
                <animated.span className="block font-bold text-4xl leading-[0.7_!important] lg:text-7xl font-[Kanit] " style={{fontVariant: "all-petite-caps"}}>{toShow?.title}</animated.span>
                <animated.span className="block text-lg lg:text-xl mt-2">{toShow?.description}</animated.span>
            </animated.div>
        </div>
    );
}

export function Timeline({data} : TimelineProps) {

    const refs = React.useRef(data.map(_ => React.createRef<HTMLDivElement>()));

    const cursor = React.useRef<HTMLImageElement>(null);
    const [cursorPosition, setCursorPosition] = React.useState(0);
    const allBreakpoints: number[] = data.map((_, index) => (index === 0 ? 0.01 : ((index) / (data.length - 1)) - 0.09 ));
    //const allState: [boolean, React.Dispatch<boolean>][] = data.map(() => useState(false));
    const [allState, setAllState] = React.useState(new Array(data.length).fill(false));


    useEffect(() => {
        const handleScroll = () => {
            if (cursor.current) {
                const cursorY = cursor.current.getBoundingClientRect().top;
                const cursorParent = cursor.current.parentElement;
                if (cursorParent) {
                    const cursorParentY = cursorParent.getBoundingClientRect().top;
                    setCursorPosition(cursorY - cursorParentY);
                    const percent: number = ((cursorY - cursorParentY)  / (cursorParent.getBoundingClientRect().height-150));
                    const newState = allState.map((_, index) => percent >= allBreakpoints[index]);
                    setAllState(newState);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [allState, allBreakpoints]);

    useEffect(() => {
        if (data) {
            setAllState(new Array(data.length).fill(false));
        }
    }, [data]);

    const isInTimeline = () => allState.some(state => state);

    const getLastActivated = () => allState.lastIndexOf(true);

    const activatedExp: Experience | null = isInTimeline() ? data[getLastActivated()] : null;

    return (
        <div className="grid grid-cols-[8fr_4fr] lg:grid-cols-[9fr_3fr] grid-flow-row mt-[25vh]">
            <div>
                <div className="block ml-10 lg:ml-[20%] lg:mr-[40%] sticky top-1/3">
                    <TimelineContent toShow={activatedExp} />
                </div>
            </div>
            <div className="grid grid-cols-[3fr_9fr] lg:grid-cols-[2fr_10fr]">
                <div>
                    <div ref={cursor}  className="block sticky top-1/2 mt-1 mb-2">
                        <img src={cursorImg} alt="arrow" style={{ transform: `scale(${isInTimeline() ? 1 : 0})`, transition: `transform 0.2s ease-in-out`}}/>
                    </div>
                </div>
                <div className="relative flex justify-between flex-col">
                    <div className="absolute top-0 left-4 mt-[11px] w-2 h-[calc(100%-33px)] bg-white
                                    after:block after:absolute after:w-2 after:h-[var(--after-height)] after:bg-accent"
                         style={
                        // @ts-ignore
                        {'--after-height': `${cursorPosition + 5}px`}}/>
                    {data.map((exp, index) => {
                        return (
                            <div key={index} ref={refs.current[index]} className={`${index !== 0 ? 'pt-[40vh]' : ''}`} >
                                <TimelineNode data={exp} isActivated={allState[index]} />
                            </div>)
                    })}
                    <div className="block w-2 h-32
                                    after:w-2 after:h-20 after:z-20 after:left-4 after:absolute after:bottom-0 after:bg-gradient-to-b
                                    after:from-transparent after:to-[#171212]" />
                </div>
            </div>
        </div>
    )

}