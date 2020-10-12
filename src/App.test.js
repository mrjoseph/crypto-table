import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";
import mockReturnValueOnce from "./mockResponse.json";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: jest.fn(() => mockReturnValueOnce),
    headers: {
      get: () => "application/json;",
    },
  })
);
describe("App", () => {
  it("should render a table", async () => {
    await act(async () => render(<App />));

    expect(screen.getByText("Coin Name")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });
});
