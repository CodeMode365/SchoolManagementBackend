const pageProvider = (total: number, page: number = 1, limit: number = 20) => {
  const lastPage = Math.ceil(total / limit);
  const currentPage = Math.max(1, Math.min(page, lastPage));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit - 1, total - 1);

  return {
    pagination: {
      total,
      lastPage,
      currentPage,
      startIndex,
      endIndex,
      limit,
    },
  };
};

export default { pageProvider };
