import SkillsItem from "./SkillsItem";
import { screen, render } from "@testing-library/react";

const defaultProps = {
  id: "123",
  title: "Test skill",
  currentChapter: 1,
  chapters: 2,
  editLink: "123",
  lineNumber: 1,
};

describe("Lesson item", () => {
  test("It renders correctly", () => {
    render(<SkillsItem {...defaultProps} />);

    expect(screen.getByText(/test skill/i)).toBeInTheDocument();
  });
});
