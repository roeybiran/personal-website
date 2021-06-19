import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import tokens from "../styles/tokens";

const StyledHeader = styled.header`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.gray[800]};
  gap: ${tokens.spacing[4]};
  margin: 0 auto;
  padding: ${tokens.spacing[4]};

  > p {
    text-align: center;
  }

  a {
    color: ${tokens.colors.blue[600]};
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${tokens.colors.gray[800]};
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
