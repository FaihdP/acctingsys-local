import Spin from "@ui/core/components/Spin";
import { useTable } from "../hooks/useTable";

export default function TableBodySkeleton() {
  const { getColumnsNumber } = useTable()

  return (
    <tbody>
      <tr>
        <td colSpan={getColumnsNumber()} className="h-[300px] text-center text-xl">
          <Spin size={30}/> Cargando ...
        </td>
      </tr>
    </tbody>
  )
}
