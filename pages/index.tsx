import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import tokens from "../styles/tokens";

const StyledHeader = styled.header`
  --bg-color: #fdf6e3;
  --text-color: #657b83;
  --link-color: #268bd2;

  @media (prefers-color-scheme: dark) {
    --bg-color: #002b36;
    --text-color: #839496;
  }

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing[4]};
  padding: ${tokens.spacing[4]};
  margin: 0 auto;

  background-color: var(--bg-color);
  color: var(--text-color);

  > p {
    text-align: center;
  }

  a {
    color: var(--link-color);
    text-decoration: underline;

    :hover {
      text-decoration-style: double;
    }
  }

  .image-wrapper {
    max-width: 128px;
    img {
      clip-path: circle(50% at 50% 50%);
    }
  }

  .links {
    display: flex;
    gap: ${tokens.spacing[4]};
    flex-wrap: wrap;
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
      <StyledHeader>
        <div className="image-wrapper">
          <Image
            src={"/roey-biran.jpg"}
            alt={`${name}`}
            width={573}
            height={573}
          />
        </div>
        <h1 className="text-4xl">{`${name}`}</h1>
        <p className="text-base">{description}</p>
        <p className="text-base" style={{ fontWeight: 700 }}>
          More stuff – soon.
        </p>
        <div className="links">
          <a href="https://github.com/roeybiran">GitHub</a>
          <a href="mailto:roeybiran@icloud.com">Mail</a>
          <a href="https://twitter.com/roeybiran">Twitter</a>
        </div>
      </StyledHeader>
    </>
  );
}
