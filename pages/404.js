import Link from "next/link"
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css"

export default function NotFoundPage() {
    return (
        <Layout title="Page Not Found">
        <div className={styles.error}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link href="/">Go Back</Link>
            </div>
        </Layout>

    )
}
