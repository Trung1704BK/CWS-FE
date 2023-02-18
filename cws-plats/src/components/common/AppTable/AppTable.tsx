import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import {
  Table,
  Td,
  Tr,
  TableContainer,
  Thead,
  Tbody,
  Th,
  Card,
} from "@chakra-ui/react";

export default function AppTable<T>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T>[];
}) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
    state: {
      pagination: {
        pageSize: data.length,
        pageIndex: 0,
      },
    },
  });

  const renderCell = (cell: any) => {
    return (
      <Td
        key={cell.id}
        className={classNames(
          "z-10 px-4 py-2 first:sticky first:left-0",
          getRowColor(cell.row.index)
        )}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Td>
    );
  };

  const getRowColor = (index: number) =>
    index % 2 !== 0 ? "bg-gray-50" : "bg-white";

  return (
    <Card
      variant="outline"
      bg="white"
      className="overflow-x-auto whitespace-nowrap"
      borderBottomRadius={0}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={"left-0 bg-gray-50 first:sticky"}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="px-4 py-2 text-left">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr
                  key={row.id}
                  className={classNames(
                    "border-b hover:bg-gray-100",
                    getRowColor(row.index)
                  )}
                >
                  {row.getVisibleCells().map((cell) => renderCell(cell))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}
