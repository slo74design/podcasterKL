import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import Loader from "@/components/loader";

export default function Episode() {
    const router = useRouter();
    const { podcastid, episodeid, dataPod, infoPod } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [datosEpisode, setdatosEpisode] = useState([]);
    const [datosPod, setdatosPod] = useState([]);

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const podParsed = JSON.parse(dataPod);
            if (Object.keys(podParsed).length > 0) {
                setdatosEpisode(podParsed);
                setdatosPod(JSON.parse(infoPod));
            }
            setIsLoading(false);
        }
        getData();
    }, [dataPod, infoPod]);

    return (
        <div>
            <Head>
                <title>{datosEpisode.title}</title>
                <meta name="description" content={datosEpisode.description} />
                <meta name="robots" content="index, follow" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                {!isLoading ? (
                    <div className="grid grid-cols-4 gap-4 py-10">
                        {datosPod.map((item, i) => (
                            <div className="col-span-1" key="1">
                                <div className="flex flex-col p-4 border shadow-sm">
                                    <Image
                                        src={item.artworkUrl600}
                                        alt="Picture of the podcast"
                                        width={500}
                                        height={500}
                                        priority
                                        className="w-full h-full object-cover mb-6"
                                    />
                                    <p className="font-semibold uppercase mb-0">
                                        {item.collectionName}
                                    </p>
                                    <span className="font-normal italic text-sm text-slate-500">
                                        by {item.artistName}
                                    </span>
                                    <div className="border-[1px] border-slate-200 my-4 w-full" />
                                    <p className="font-semibold text-sm">
                                        Description:
                                    </p>
                                    <p className="font-light text-xs mb-0 italic">
                                        Tune into {item.collectionName} and his
                                        friends. Follow along the crazy
                                        adventures of these very random friends.
                                    </p>
                                </div>
                            </div>
                        ))}
                        {Object.keys(datosEpisode).length > 0 && (
                            <div className="col-span-3">
                                <div className="w-full flex flex-col items-start justify-center px-8 py-5 border shadow-sm">
                                    <h3 className="font-semibold text-lg text-slate-700">
                                        {datosEpisode.title}
                                    </h3>
                                    <div
                                        className="font-light text-base text-slate-500"
                                        dangerouslySetInnerHTML={{
                                            __html: datosEpisode.description,
                                        }}
                                    />
                                    {datosEpisode.enclosure[0]["$"].url.length >
                                    0 ? (
                                        <div className="flex justify-start w-full">
                                            <audio
                                                src={
                                                    datosEpisode.enclosure[0][
                                                        "$"
                                                    ].url
                                                }
                                                controls
                                            />
                                        </div>
                                    ) : (
                                        <Loader />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Loader />
                )}
            </MainLayout>
        </div>
    );
}
