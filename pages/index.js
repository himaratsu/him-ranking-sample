import Head from "next/head";
import Image from "next/image";
import { apiClient } from "../lib/apiClient";
import styles from "../styles/Home.module.css";

export default function Home({ title, contents, preview }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Demo App</title>
        <meta name="description" content="Demo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {preview && <div className={styles.notice}>プレビュー中です</div>}

      <main className={styles.main}>
        <h1 className={styles.title}>
          Demo App with <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>{title}</p>

        <ul>
          {contents.map((content) => {
            return <li key={content.id}>{content.title}</li>;
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const draftKey = context.previewData?.draftKey;
  console.log(draftKey);

  // そのままゲーム情報を利用
  // const result = await apiClient.getList({
  //   endpoint: "games",
  //   draftKey: draftKey,
  // });
  // const contents = result.contents;
  // console.log(contents);

  // 「ランキングAPI」で束ねて利用
  const result = await apiClient.getObject({
    endpoint: "ranking",
    draftKey: draftKey,
  });
  const contents = result.games;
  const title = result.title;
  console.log(contents);

  return {
    props: {
      title,
      contents,
      preview: context.preview ?? false,
    },
  };
};
