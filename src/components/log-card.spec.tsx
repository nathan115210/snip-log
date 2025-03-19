import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogCard from "./log-card";
import { ArticleMeta } from "@/lib/md-parser";

const mockMeta: ArticleMeta = {
  title: "Test Title",
  description: "Test Description",
  date: "2023-01-01",
  tags: ["React", "JavaScript"],
};

describe("LogCard", () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mock before each test
  });

  it("renders the title, description, and date", () => {
    render(<LogCard meta={mockMeta} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
  });

  it("renders the tags as badges", () => {
    render(<LogCard meta={mockMeta} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("fetches and displays an image", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ imageUrl: "https://example.com/image.jpg" }),
    );

    render(<LogCard meta={mockMeta} />);

    // Debugging fetchMock response
    console.log("Mocked fetch response:", fetchMock.mock.calls);

    const image = await screen.findByAltText("Random");

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("example.com/image.jpg"), // Handle Next.js image optimization
    );
  });
});
