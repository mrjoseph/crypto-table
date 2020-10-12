import { useState } from "react";
import { sortBy } from "../utils/utils";

export const useSelect = (data, setData) => {
  const [sortByPrice, setSortByPrice] = useState(true);
  const [sortByOpenDay, setSortByOpenDay] = useState(true);
  const [sortByOpenChange, setSortByOpenChange] = useState(true);
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
