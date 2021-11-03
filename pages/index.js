import Link from "next/link";
import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Event</h3>}

      {events.map(ev => (
        <Eventitem key={ev.id} evt={ev} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
          </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps (){
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: {events: events.slice(0,3)},
    revalidate: 1
  }
}