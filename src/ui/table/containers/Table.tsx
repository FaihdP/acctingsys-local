'use client'

import TableHeader from "../components/TableHeader"
import TableBody from "../components/TableBody"
import TableBodySkeleton from "../components/TableBodySkeleton"
import TableFooter from "../components/TableFooter"
import { useTable } from "../hooks/useTable"
import TableBodyNoData from "../components/TableBodyNoData"

export default function Table() {
  const { data  } = useTable()

  return (
    <div 
      className="
        flex
        flex-col
        h-[90%]
        shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
        rounded-lg
        bg-[#F4F4F4]
        overflow-auto
      "
    >
      <div className="overflow-y-auto">
        <table 
          className="w-full" 
          style={{ fontSize: "12px" }}
        >
          <TableHeader />

          {/* Loading */}
          { !data.map && <TableBodySkeleton /> }

          {/* Data loaded */}
          { (data.map && data.map.size > 0) && <TableBody /> }

          {/* No data */}
          { (data.map && data.map.size === 0) && <TableBodyNoData /> }

        </table>
      </div>
      <TableFooter />
    </div>
  )
}