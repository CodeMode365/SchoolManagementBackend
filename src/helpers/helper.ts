const pageProvider = (total: number, page: number = 1, limit: number = 20) => {
  const lastPage = Math.ceil(total / limit);
  // const currentPage = Math.max(1, Math.min(page, lastPage));
  const currentPage = page;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit - 1, total - 1);

  return {
    pagination: {
      prevPage: currentPage === 1 ? null : currentPage - 1,
      nextPage: currentPage === lastPage ? null : currentPage + 1,
      total,
      lastPage,
      currentPage,
      startIndex,
      endIndex,
      limit,
    },
  };
};

export function generateFilter(criteria: Record<string, any>) {
  const filter: Record<string, any> = {};
  Object.keys(criteria).forEach((key) => {
    const value = criteria[key];
    if (typeof value === 'object' && !Array.isArray(value)) {
      filter[key] = {};
      Object.keys(value).forEach((subKey) => {
        filter[key][`$${subKey}`] = value[subKey];
      });
    } else {
      filter[key] = value;
    }
  });

  return filter;
}

export default { pageProvider, generateFilter };
