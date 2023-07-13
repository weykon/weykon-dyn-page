'use client'

export default function Pagination({ current, count, perPage }: {
  current: number;
  count: number;
  perPage: number;
}) {
  const totalPages = Math.ceil((count ?? 0) / perPage); // 总页数
  const visiblePages = 5; // 可见页码数量
  const pageRange = Math.min(visiblePages, totalPages); // 实际显示的页码数量
  const startPage = Math.max(1, current - Math.floor(pageRange / 2)); // 开始页码
  const endPage = Math.min(startPage + pageRange - 1, totalPages); // 结束页码
  const showEllipsis = totalPages > visiblePages && endPage < totalPages;

  return (
    <ul className="inline-flex -space-x-px mt-5 mb-10">
      {current > 1 && (
        <li>
          <a
            href={`?p=${current - 1}`}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </a>
        </li>
      )}

      {startPage > 1 && (
        <li>
          <a
            href={`?p=${startPage - 1}`}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            ...
          </a>
        </li>
      )}
      
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <li key={page}>
          <a
            href={`?p=${page}`}
            className={`${current === page ? 'bg-neutral-200' : 'bg-white'} px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {page}
          </a>
        </li>
      ))}

      {showEllipsis && (
        <li>
          <a
            href={`?p=${endPage + 1}`}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            ...
          </a>
        </li>
      )}

      {current < totalPages && (
        <li>
          <a
            href={`?p=${current + 1}`}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </li>
      )}
    </ul>
  );
}