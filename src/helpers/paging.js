module.exports = {
  paging: async (data, page, pagUser) => {
    let prevPage = (nextPage = null);
    let countPages = (currentPage = 1);
    let { countItems, items } = data;

    if (countItems > 10) {
      Number.isInteger(countItems / 10)
        ? (countPages = countItems / 10)
        : (countPages = Math.trunc(countItems / 10) + 1);

      if (page > 0) {
        if (page <= countPages) {
          currentPage = page;
          currentPage > 1 ? (prevPage = currentPage - 1) : null;

          currentPage > 1 ? (prevPage = 'api/v1/' + pagUser + '/?page=' + (currentPage - 1)) : null;

          currentPage < countPages ? (nextPage = 'api/v1/' + pagUser + '/?page=' + (currentPage + 1)) : null;
        } else {
          return { error: { message: 'There is nothing here.' } };
        }
      } else {
        nextPage = 'api/v1/' + pagUser + '/?page=2';
      }
    }

    if (items.length > 10) {
      items = items.slice((currentPage - 1) * 10, currentPage * 10);
    }

    return Object({
      info: {
        count: countItems,
        pages: countPages,
        prev: prevPage,
        next: nextPage,
      },
      data: items,
    });
  },
};
