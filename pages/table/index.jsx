import { jsonData } from "@/data";
import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpNarrowWide,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

const UserRecentTransactions = ({ isAdmin }) => {
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "sno",
      },
      {
        Header: "Transaction ID",
        accessor: "TransId",
      },
      {
        Header: "Views",
        accessor: "Views",
      },
      {
        Header: "Amount",
        accessor: "Amount",
      },
      {
        Header: "Time",
        accessor: "Timestamp",
      },
    ],
    []
  );

  useEffect(() => {
    // Update data when jsonData changes
    setData(jsonData);
  }, [jsonData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 9,    
      },
    },
    useSortBy,
    usePagination
  );

  return (
        <div className="flex justify-center items-center h-screen w-full overflow-x-auto sm:text-normal truncate text-sm">
          {data.length > 0 ? (
            <div className="flex flex-col gap-[2rem]">
              <div className="min-h-[25rem] overflow-y-auto">
              <table
                className=" w-full  table-auto px-5 overflow-x-scroll"
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="px-2 py-2 sm:w-[12rem] gap-5"
                        >
                          {column.render("Header")}
                          <span className="flex items-center flex-col">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ArrowUpNarrowWide
                                  size={15}
                                  className=" text-green-600"
                                />
                              ) : (
                                <ArrowDownNarrowWide
                                  size={15}
                                  className=" text-red-600"
                                />
                              )
                            ) : (
                              <ArrowUpDown size={15} className="text-gray-400" />
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={``}
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="px-4 py-2 truncate w-[5rem] justify-center"
                          >
                            <h1 className="flex justify-center">
                              {cell.render("Cell")}
                            </h1>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
              <div className="pagination flex flex-col w-full justify-center">
                <div className="flex justify-between px-4 items-center text-gray-400">
                  <div className="flex gap-2">
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                      className="hover:bg-[#3b3939] hover:text-white transform-all duration-500 p-2 rounded-md cursor-pointer"
                    >
                      First Page
                    </button>{" "}
                    <div className="flex gap-2">
                      <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="hover:bg-[#3b3939] hover:text-white transform-all duration-500 p-2 rounded-md cursor-pointer"
                      >
                        Prev
                      </button>{" "}
                      <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="hover:bg-[#3b3939] hover:text-white transform-all duration-500 p-2 rounded-md cursor-pointer"
                      >
                        Next
                      </button>
                    </div>{" "}
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                      className="hover:bg-[#3b3939] hover:text-white transform-all duration-500 p-2 rounded-md cursor-pointer"
                    >
                      Last Page
                    </button>{" "}
                  </div>
                  <span className="flex justify-center ">
                    Current Page &nbsp;
                    <span className="text-[#f5f5f5]">
                      {pageIndex + 1} of {pageOptions.length}
                    </span>{" "}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <h1>There are no transactions to show</h1>
          )}
        </div>
  );
};
export default UserRecentTransactions;
