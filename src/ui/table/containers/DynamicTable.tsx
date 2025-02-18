import TableProvider from "../hooks/TableProvider";
import TableProps from "../interfaces/Table";
import Table from "./Table";

export default function DynamicTable({
  config,
  initialData,
  pageSelected,
  setPageSelected,
  pagesNumber,
}: TableProps) {
  return (
    <TableProvider initialData={{ config, data: initialData, pageSelected, setPageSelected, pagesNumber }} >
      <Table />
    </TableProvider>
  )
}