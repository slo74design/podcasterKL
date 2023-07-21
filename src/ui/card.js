import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ details }) => {
    return (
        <Link
            href={`/podcast/${details.id.attributes["im:id"]}`}
            className="relative flex flex-col items-center place-content-between w-full shadow-lg mt-10 bg-white"
        >
            <Image
                src={details?.["im:image"][0].label}
                alt="Picture of the podcast"
                width={100}
                height={100}
                priority
                className="w-24 h-24 object-cover rounded-full absolute -top-8"
            />
            <div className="px-2 pt-20 pb-4">
                <h3 className="text-center text-sm font-semibold uppercase text-slate-700 mb-2">
                    {details?.title.label}
                </h3>
                <p className="text-center text-xs font-normal text-slate-500">
                    Author: {details?.["im:artist"].label}
                </p>
            </div>
        </Link>
    );
};

export default Card;
