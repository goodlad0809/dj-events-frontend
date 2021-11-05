import Layout from "@/components/Layout";
import Eventitem from "@/components/Eventitem";
import { API_URL } from "@/config/index";
import qs from "qs"
import { useRouter } from "next/router";
import Link from "next/link"

export default function SearchPage({events}) {
    const router = new useRouter();

  return (
    <Layout title="Search Result">
    <Link href="/events"><a>Go Back</a></Link>
      <h1>Search Result for {router.query.term}</h1>
      {events.length === 0 && <h3>No Event</h3>}

      {events.map(ev => (
        <Eventitem key={ev.id} evt={ev} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify({
      _where: {
        _or: [
          { name_contains: term },
          { performers_contains: term },
          { description_contains: term },
          { venue_contains: term },
        ],
      },
    })
  
    const res = await fetch(`${API_URL}/events?${query}`)
    const events = await res.json()
  
    return {
      props: { events },
    }
  }