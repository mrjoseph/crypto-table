import { useState } from "react";
import { sortBy } from "../utils/utils";

export const useSelect = (data, setData) => {
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByOpenDay, setSortByOpenDay] = useState(false);
  const [sortByOpenChange, setSortByOpenChange] = useState(false);
  const handleSortByPrice = (sortDataBy) => {
    setSortByPrice(!sortByPrice, sortDataBy);
    setData(sortBy(data, sortByPrice, sortDataBy));
  };
  const handleSortByOpenDay = (sortDataBy) => {
    setSortByOpenDay(!sortByOpenDay);
    setData(sortBy(data, sortByOpenDay, sortDataBy));
  };
  const handleSortByChange = (sortDataBy) => {
    setSortByOpenChange(!sortByOpenChange, sortDataBy);
    setData(sortBy(data, sortByOpenChange, sortDataBy));
  };
  return {
    handleSortByPrice,
    handleSortByOpenDay,
    handleSortByChange,
    sortByPrice,
    sortByOpenDay,
    sortByOpenChange,
  };
};
