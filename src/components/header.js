import Link from "next/link";
import React from "react";

export const Header = () => {
    return (
        <header className="bg-slate-50 sticky top-0 left-0 z-10 px-10 pt-10 pb-3 border-b">
            <Link href="/" className="text-lg font-semibold">
                Podcaster XL
            </Link>
        </header>
    );
};
