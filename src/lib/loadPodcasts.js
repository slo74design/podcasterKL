export async function loadPodcasts() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_ITUNES_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`
    );
    const data = await res.json();

    return data.feed.entry;
}
