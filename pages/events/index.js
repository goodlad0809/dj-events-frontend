import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";

export default function EventsPage({events}) {
  return (
    <Layout>
      <h1>My Events</h1>
      {events.length === 0 && <h3>No Event</h3>}

      {events.map(ev => (
        <Eventitem key={ev.id} evt={ev} />
      ))}
    </Layout>
  );
}

export async function getStaticProps (){
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const events = await res.json()

  return {
    props: {events},
    revalidate: 1
  }
}