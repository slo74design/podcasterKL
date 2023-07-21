export async function getPodcast({ id }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ITUNES_URL}/lookup?id=${id}`
    );
    const data = await res.json();

    return data;
}
