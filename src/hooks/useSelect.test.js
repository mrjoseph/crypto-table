import { useSelect } from "./useSelect";
import { act, renderHook } from "@testing-library/react-hooks";

import { sortBy } from "../utils/utils";
jest.mock("../utils/utils");

describe("useSelect custom hook", () => {
  describe("handleSortByPrice", () => {
    it("should call sortBy", () => {
      const data = [];
      const setData = jest.fn();
      const { result } = renderHook(() => useSelect(data, setData));
      act(() => {
        result.current.handleSortByPrice(true);
      });
      expect(sortBy).toHaveBeenCalled();
    });
  });

  describe("handleSortByOpenDay", () => {
    it("should call sortBy", () => {
      const data = [];
      const setData = jest.fn();
      const { result } = renderHook(() => useSelect(data, setData));
      act(() => {
        result.current.handleSortByOpenDay(true);
      });
      expect(sortBy).toHaveBeenCalled();
    });
  });

  describe("handleSortByChange", () => {
    it("should call sortBy", () => {
      const data = [];
      const setData = jest.fn();
      const { result } = renderHook(() => useSelect(data, setData));
      act(() => {
        result.current.handleSortByChange(true);
      });
      expect(sortBy).toHaveBeenCalled();
    });
  });
});
