import Head from "next/head";
import Container from "@material-ui/core/Container";
import CreateContact from "../components/CreateContact";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>CMO Contacts</title>
        <meta name="description" content="CMO Contacts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateContact />
    </Container>
  );
}
