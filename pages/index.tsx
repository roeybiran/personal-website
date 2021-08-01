import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import avatar from "../public/avatar.jpg";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .image-container {
    max-width: 128px;
  }

  .image-container img {
    clip-path: circle(50% at 50% 50%);
  }

  .links {
    list-style: none;
    display: flex;
    gap: var(--s0);
  }
`;

const name = "Roey Biran";
const description =
  "Visual Communications Designer & Developer. Into macOS + Web.";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${name}`}</title>
        <meta name="description" content={`${name}’s personal website`} />
      </Head>
      <Wrapper>
        <header className="stack center">
          <div className="image-container">
            <Image src={avatar} alt={`${name}`} />
          </div>
          <h1>{name}</h1>
          <p>{description}</p>
          <p style={{ fontWeight: 700 }}>More stuff – soon.</p>
          <ul className="links">
            <li>
              <a href="https://github.com/roeybiran">GitHub</a>
            </li>
            <li>
              <a href="mailto:roeybiran@icloud.com">Mail</a>
            </li>
            <li>
              <a href="https://twitter.com/roeybiran">Twitter</a>
            </li>
          </ul>
        </header>
      </Wrapper>
    </>
  );
}
