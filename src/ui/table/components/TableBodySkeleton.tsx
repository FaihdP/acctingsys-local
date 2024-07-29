import Spin from "@ui/core/components/Spin";

export default function TableBodySkeleton() {
  return (
    <tbody>
      <tr>
        <td colSpan={8} className="h-[300px]">
          <Spin /> Cargando
        </td>
      </tr>
    </tbody>
  )
}
