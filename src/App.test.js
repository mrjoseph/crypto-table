import * as React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";
import mockReturnValueOnce from "./mockResponse.json";
global.fetch = jest.fn();

describe("App", () => {
  describe("on successful return of response", () => {
    fetch.mockReturnValueOnce({
      ok: true,
      json: jest.fn(() => mockReturnValueOnce),
      headers: {
        get: () => "application/json;",
      },
    });
    it("should render a table", async () => {
      await act(async () => render(<App />));

      expect(screen.getByText("Coin Name")).toBeInTheDocument();
      expect(screen.getByText("BTC")).toBeInTheDocument();
    });
  });

  describe("on unsuccessful return of response", () => {
    fetch.mockReturnValueOnce({
      ok: false,
      error: {
        message: "opps",
      },
    });
    it("should render a table", async () => {
      await act(async () => render(<App />));
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  describe("Currency select", () => {
    it("should update the currency select state", async () => {
      fetch.mockReturnValueOnce({
        ok: true,
        json: jest.fn(() => mockReturnValueOnce),
        headers: {
          get: () => "application/json;",
        },
      });
      await act(async () => render(<App />));
      expect(screen.getByText("USD")).toBeInTheDocument();
      const select = screen.getByTestId("select-currency");
      fireEvent.change(select, {
        target: { value: "GBP" },
      });

      expect(screen.getByText("GBP")).toBeInTheDocument();
    });
  });
});
