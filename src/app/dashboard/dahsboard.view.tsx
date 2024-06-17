import { useEffect, useState } from "react"
import { getAllUnitKerja } from "./local-service/service"
import BarChartComponent from "./local-components/dashboard.barchart"
import PieChartComponent from "./local-components/dashboard.piechart"
import { Col, Row } from "antd"
import DashboardTable from "./local-components/dashboard.table"
import { DashboardDataRuasType, DashboardDataType } from "./local-type/dashboard.type"
import { useLoadingContext } from "@/store/loading"
import Loading from "@/components/layout/loading"

const DashboardPage = () => {
  const { loading, startLoading, stopLoading } = useLoadingContext();

  const [data, setData] = useState<DashboardDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [ruasData, setRuasData] = useState<any[]>([]);

  const handlingGetAllUnitKerja = () => {
    startLoading()
    getAllUnitKerja()
      .then(response => {
        const { data, status } = response.data
        if (status) {
          setData(data)
          let no = 1
          const allRuas: DashboardDataRuasType[] = data.flatMap((unit: DashboardDataType) =>
            unit.ruas.map((ruas: DashboardDataRuasType) => ({
              no: no++,
              status_convert: ruas.status === "1" ? "Aktif" : "Tidak Aktif",
              lokasi: `${ruas.km_awal} - ${ruas.km_akhir}`,
              unit_kerja_convert: `Unit kerja ${ruas.unit_id}`,
              ...ruas
            }))
          );

          setRuasData(allRuas);
        }
      })
      .catch((error)=>{
        console.log(error)
      })
      .finally(()=>{
        stopLoading()
      })
  }

  useEffect(() => {
    handlingGetAllUnitKerja()
  }, [])

  return (
    <div>
      {
        loading && (<Loading/>)
      }
      <Row gutter={32}>
        <Col lg={14} md={24} xs={24}>
          <BarChartComponent
            data={data}
          />
        </Col>
        <Col lg={8} md={24} xs={24}>
          <PieChartComponent
            data={data}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DashboardTable
            data={ruasData}
            currentPage={currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
          />
        </Col>
      </Row>
    </div>
  )
}

export { DashboardPage }