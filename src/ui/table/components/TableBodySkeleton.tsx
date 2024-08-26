import Spin from "@ui/core/components/Spin";

export default function TableBodySkeleton() {
  return (
    <tbody>
      <tr>
        <td colSpan={8} className="h-[300px] text-center text-xl">
          <Spin size={30}/> Cargando ...
        </td>
      </tr>
    </tbody>
  )
}
