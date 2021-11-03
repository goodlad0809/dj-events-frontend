import Head from "next/head";
import Header from "./Header";
import { useRouter } from "next/router";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css"
import Showcase from "./Showcase";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
      </Head>
      <Header></Header>
      {router.pathname === "/" && <Showcase></Showcase>}
      <div className={styles.container}>
      {children}
      </div>
      <Footer></Footer>
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | my app",
  description: "Find DJ events",
  keywords: "music, dj, event",
};
