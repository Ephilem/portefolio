import {useEffect, useRef, useState} from "react";

type FakeImageProps = {
    text: string;
}

export function FakeImage({text}: FakeImageProps) {
    const container = useRef<HTMLDivElement | null>(null)
    const [cb, setCb] = useState(1)

    useEffect(() => {
        if (!container.current) return;
        const rect = container.current.getBoundingClientRect();

        const newCb = Math.floor(rect.height / 38);
        setCb(newCb > 0 ? newCb : 0);  // ensure cb is not negative
    }, []);

    return (
        <div ref={container} className="block overflow-hidden whitespace-nowrap p-0 w-full h-full leading-[34px] select-none
                    text-[#171212] font-bold uppercase text-7xl " style={{fontVariant: "all-petite-caps", fontFamily: "Noto Sans Mono"}}>
            {[...Array(cb)].map((_, index) => (
                <div key={index}><span className={`tracking-[-5px]`} style={{marginLeft: `-${49 * (index%3)}px`}}>{text}{text}{text}</span><br /></div>
            ))}
        </div>
    );
}