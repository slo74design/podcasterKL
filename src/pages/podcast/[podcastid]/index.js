import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import MainLayout from "@/layouts/MainLayout";
import { getPodcast } from "@/lib/getPodcast";
import { loadPodcasts } from "@/lib/loadPodcasts";

import xml2js from "xml2js";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
const parser = new xml2js.Parser();

export default function Podcast({ detailPod }) {
    const [isLoading, setIsLoading] = useState(true);
    const [dataFeed, setDataFeed] = useState([]);
    const [infoPod, setInfoPod] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            if (detailPod.length > 0) {
                const response = await fetch(detailPod[0].feedUrl);
                const content = await response.text();
                const data = await parser.parseStringPromise(content);
                setDataFeed(data.rss.channel[0].item);
                setInfoPod(detailPod);
                setIsLoading(false);
            }
        }
        getData();
    }, [detailPod]);

    return (
        <div>
            <Head>
                <title>{detailPod.artistName}</title>
                <meta name="description" content={detailPod.collectionName} />
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
                    detailPod.map((item, i) => (
                        <div className="grid grid-cols-4 gap-4 py-10" key={i}>
                            <div className="col-span-1">
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
                            <div className="col-span-3">
                                <div className="w-full flex items-center justify-start px-6 py-2 font-semibold text-slate-600 text-lg border border-slate-100 shadow-sm rounded-xl">
                                    Episodes: {item.trackCount}
                                </div>
                                <div className="mt-8 flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                            >
                                                                Title
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                            >
                                                                Date
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                            >
                                                                Duration
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {dataFeed.length > 0 &&
                                                            dataFeed.map(
                                                                (datos) => (
                                                                    <tr
                                                                        key={
                                                                            datos.title
                                                                        }
                                                                    >
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            <Link
                                                                                href={{
                                                                                    pathname:
                                                                                        "[podcastid]/episode/[episodeid]",
                                                                                    query: {
                                                                                        dataPod:
                                                                                            JSON.stringify(
                                                                                                datos
                                                                                            ),
                                                                                        infoPod:
                                                                                            JSON.stringify(
                                                                                                infoPod
                                                                                            ),
                                                                                    },
                                                                                }}
                                                                                as={`${
                                                                                    router
                                                                                        .query
                                                                                        .podcastid
                                                                                }/episode/${encodeURIComponent(
                                                                                    datos.title
                                                                                )}`}
                                                                            >
                                                                                {
                                                                                    datos.title
                                                                                }
                                                                            </Link>
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            {new Date(
                                                                                datos.pubDate[0]
                                                                            ).toDateString()}
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            {
                                                                                datos[
                                                                                    "itunes:duration"
                                                                                ]
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Loader />
                )}
            </MainLayout>
        </div>
    );
}

export async function getStaticPaths() {
    const results = await loadPodcasts();

    const paths = results.map((item) => ({
        params: {
            podcastid: item.id.attributes["im:id"],
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
}

export async function getStaticProps(ctx) {
    let idPod = ctx.params.podcastid;

    const singlePod = await getPodcast({ id: idPod });

    return {
        props: {
            detailPod: singlePod.results,
        },
        revalidate: 86400,
    };
}
