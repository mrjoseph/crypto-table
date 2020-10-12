import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TableHeader from ".";

describe("App", () => {
  it("should render a tabl headere", async () => {
    const props = {
      sortByPrice: jest.fn(),
      tsyms: ["USD"],
      sortByOpenDay: jest.fn(),
      handleSortByOpenDay: jest.fn(),
      sortByOpenChange: jest.fn(),
      handleSortByChange: jest.fn(),
      handleSortByPrice: jest.fn(),
    };
    const { getByText, getByTestId } = render(<TableHeader {...props} />);
    expect(getByText("Coin Name")).toBeInTheDocument();
    fireEvent.click(getByTestId("sort-by-price"));
    expect(props.handleSortByPrice).toHaveBeenCalledWith("PRICE");

    fireEvent.click(getByTestId("sort-by-openday"));
    expect(props.handleSortByOpenDay).toHaveBeenCalledWith("OPENDAY");

    fireEvent.click(getByTestId("sort-by-percentage-change"));
    expect(props.handleSortByChange).toHaveBeenCalledWith("PERCENTAGECHANGE");
  });
});
