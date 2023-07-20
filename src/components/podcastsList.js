import Card from "@/ui/card";
import React from "react";

const PodcastsList = ({ data }) => {
    return (
        <div className="grid grid-cols-4 gap-8 my-6">
            {data?.map((item, i) => (
                <Card details={item} key={i} />
            ))}
        </div>
    );
};

export default PodcastsList;
