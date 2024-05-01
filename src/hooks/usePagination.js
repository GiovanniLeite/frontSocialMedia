import { useEffect, useState } from 'react';

const usePagination = ({ items, maxItemsAllowed }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const pagination = (data) => {
      const currentList = data.slice(0, maxItemsAllowed);

      setAllItems(data);
      setCurrentItems(currentList);
    };

    pagination(items);
  }, [items]);

  const handleLoadMore = (itemsToLoad) => {
    setCurrentItems(allItems.slice(0, currentItems.length + itemsToLoad));
  };

  return { allItemsLength: allItems.length, currentItems, handleLoadMore };
};

export default usePagination;
