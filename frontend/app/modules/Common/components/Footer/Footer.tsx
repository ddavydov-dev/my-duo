import { FooterLine, FooterText, LinkWithHover, MainFooter } from "./lib";

export default function Footer() {
  return (
    <MainFooter>
      <FooterLine />
      <div style={{ paddingBottom: 28 }}>
        <FooterText>
          Inspired by{" "}
          <LinkWithHover href="https://www.duolingo.com" target="_blank">
            Duolingo
          </LinkWithHover>
        </FooterText>
      </div>
    </MainFooter>
  );
}
