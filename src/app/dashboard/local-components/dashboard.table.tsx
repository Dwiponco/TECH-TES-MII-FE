import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { createStringColumn, createActionColumn } from '../../../components/table/createColumn';
import { DashboardDataType } from '../local-type/dashboard.type';

interface DashboardTableProps {
    data: DashboardDataType[];
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

const DashboardTable = (props: DashboardTableProps) => {
    const { data, currentPage, pageSize, setCurrentPage, setPageSize } = props;

    const columns: ColumnsType<DashboardDataType> = [
        {
            ...createStringColumn(
                "No",
                "no",
                "no"
            )
        },
        {
            ...createStringColumn(
                "Ruas",
                "ruas_name",
                "ruas_name"
            )
        },
        {
            ...createStringColumn(
                "Lokasi",
                "lokasi",
                "lokasi"
            )
        },
        {
            ...createActionColumn(
                "Foto",
                "photo_url",
                "photo_url",
                false,
                false,
                false,
                (_: any, record) => {
                    return (
                        <Button onClick={() => window.open(record.photo_url, '_blank')}>
                            Lihat
                        </Button>
                    )
                }
            )
        },
        {
            ...createActionColumn(
                "Dokumen",
                "doc_url",
                "doc_url",
                false,
                false,
                false,
                (_: any, record) => {
                    return (
                        <Button onClick={() => window.open(record.doc_url, '_blank')}>
                            Download
                        </Button>
                    )
                }
            )
        },
        {
            ...createStringColumn(
                "Unit Kerja",
                "unit_kerja_convert",
                "unit_kerja_convert"
            )
        },
        {
            ...createStringColumn(
                "Status",
                "status_convert",
                "status_convert"
            )
        }
    ];

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    return (
        <div>
            <Table
                style={{ whiteSpace: "nowrap" }}
                scroll={{ x: "max-content" }}
                columns={columns}
                dataSource={data}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    pageSizeOptions: ['5', '10', '20'],
                    showSizeChanger: true
                }}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default DashboardTable;