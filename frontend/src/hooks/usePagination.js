import { useState, useRef, useCallback } from "react";

const usePagination = (hasMore, isLoading, customPage = 0) => {
  const observer = useRef();
  const [page, setPage] = useState(customPage);
  const [date, setDate] = useState(null);
  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  return { page, setPage, lastPostElementRef, date, setDate }
}

export default usePagination