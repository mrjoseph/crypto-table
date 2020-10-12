import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { SimpleSelect } from ".";

describe("SimpleSelect", () => {
  it("should render a tabl headere", async () => {
    const props = {
      handleChange: jest.fn(),
      currency: "USD",
    };
    const { getByText } = render(<SimpleSelect {...props} />);

    expect(getByText("Currency")).toBeInTheDocument();
    expect(getByText("USD")).toBeInTheDocument();
    const select = screen.getByTestId("select-currency");
    fireEvent.change(select, {
      target: { value: "GBP" },
    });
    expect(props.handleChange).toHaveBeenCalled();
    expect(getByText("GBP")).toBeInTheDocument();
  });
});
