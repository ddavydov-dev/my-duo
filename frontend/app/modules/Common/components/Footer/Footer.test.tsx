import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer", () => {
  test("Footer renders correctly", () => {
    render(<Footer />);
    expect(screen.getByText("Duolingo")).toBeInTheDocument();
  });
});
