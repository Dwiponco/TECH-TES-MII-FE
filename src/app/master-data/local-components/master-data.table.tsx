import { Table, Button, Popconfirm } from 'antd';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Item } from '../master-data.view';
import { ColumnsType } from 'antd/es/table';
import { createStringColumn, createActionColumn } from '../../../components/table/createColumn';

interface MasterDatatableProps {
    data: Item[];
    totalItems: number;
    onOpenModal: (record: Item) => void;
    onOpenModalDetail: (record: Item) => void;
    onDelete: (record: Item) => void;
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

const MasterDatatable = (props: MasterDatatableProps) => {
    const { data, totalItems, onOpenModal, onDelete, currentPage, pageSize, setCurrentPage, setPageSize, onOpenModalDetail } = props;

    const columns: ColumnsType<Item> = [
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
        },
        {
            ...createActionColumn(
                "Aksi",
                "aksi",
                "aksi",
                false,
                false,
                false,
                (_: any, record: Item) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => onOpenModal(record)}>
                            <Pencil />
                        </Button>
                        <Button onClick={() => onOpenModalDetail(record)}>
                            <Eye />
                        </Button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => onDelete(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button>
                                <Trash2 />
                            </Button>
                        </Popconfirm>
                    </div>
                )
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
                    total: totalItems,
                    pageSizeOptions: ['5', '10', '20'],
                    showSizeChanger: true
                }}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default MasterDatatable;