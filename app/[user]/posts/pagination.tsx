'use client'

export default function Pagination({ current, count, perPage }: {
  current: number;
  count: number;
  perPage: number;
}) {
  return (
    <ul className="inline-flex -space-x-px mt-5 mb-10">
      <li>
        <a href={`?p=${current == 1 ? 1 : current - 1}`} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
      </li>
      {
        new Array(Math.ceil((count ?? 0) / perPage)).fill(0).map((_, i) => (
          <li key={i}>
            <a href={`?p=${i + 1}`}
              className={`${current == i + 1 ? 'bg-neutral-200' : 'bg-white'} px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {i + 1}
            </a>
          </li>
        ))
      }
      <li>
        <a href={`?p=${count == current ? count : current + 1}`} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
      </li>
    </ul>
  );
}