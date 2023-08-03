import {ReactNode} from "react";

type TagProps = {
    tag: string;
    color: string;
    icon: ReactNode;
}

export function Tags({tag, color, icon}: TagProps) {

    return (
        <div className="rounded-2xl pl-5 pr-5 h-7 items-baseline" style={{backgroundColor: color}}>
            {icon}
            <span className={'text-sm lg:text-xl font-bold ml-2'} style={{fontVariant: "all-petite-caps"}}>
                {tag}
            </span>
        </div>
    );
}