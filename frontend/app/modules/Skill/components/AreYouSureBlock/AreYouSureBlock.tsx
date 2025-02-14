import { useSkill } from "../..";
import {
  Description,
  Grid,
  Inner,
  QuitButton,
  QuitButtonWrapper,
  StayButton,
  StayButtonWrapper,
  Title,
  Wrapper,
} from "./lib";

export default function AreYouSureBlock() {
  const { resetStatus } = useSkill();
  return (
    <Wrapper>
      <Inner>
        <Grid>
          <Title>Are you sure you want to quit?</Title>
          <Description>All progress in this session will be lost.</Description>
          <QuitButtonWrapper>
            <QuitButton to="/">Quit</QuitButton>
          </QuitButtonWrapper>

          <StayButtonWrapper>
            <StayButton onClick={() => resetStatus()}>Stay</StayButton>
          </StayButtonWrapper>
        </Grid>
      </Inner>
    </Wrapper>
  );
}
