import Layout from "@/components/Layout";
import Link from "next/link";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";
import Pagination from "@/components/Pagination";
import { PER_PAGE } from '@/config/index'

export default function EventsPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <h1>My Events</h1>
      {events.length === 0 && <h3>No Event</h3>}

      {events.map((ev) => (
        <Eventitem key={ev.id} evt={ev} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await res.json();

  return {
    props: { events, page: +page, total },
  };
}
