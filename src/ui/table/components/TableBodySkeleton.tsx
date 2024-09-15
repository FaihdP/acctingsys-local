import Spin from "@ui/core/components/Spin";

export default function TableBodySkeleton({ columnsNumber }: { columnsNumber: number }) {
  return (
    <tbody>
      <tr>
        <td colSpan={columnsNumber} className="h-[300px] text-center text-xl">
          <Spin size={30}/> Cargando ...
        </td>
      </tr>
    </tbody>
  )
}
