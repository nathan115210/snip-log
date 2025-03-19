import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import React from "react";

// Enable fetch mocking globally
fetchMock.enableMocks();

// Correctly mock Next.js Image component
const MockImage = (props: { src: string; alt: string }) => {
  return React.createElement("img", props);
};

jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: MockImage,
  };
});