import { Table, Button } from 'antd';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Item } from '../master-data.view';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

interface MasterDatatableProps {
    data: Item[];
    onOpenModal: (record: Item) => void;
    onDelete: (no: number) => void;
}

const MasterDatatable = (props: MasterDatatableProps) => {
    const { data, onOpenModal, onDelete } = props
    const navigate = useNavigate();

    const columns: ColumnsType<Item> = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
        },
        {
            title: 'Ruas',
            dataIndex: 'ruas',
            key: 'ruas',
            align: 'center',
        },
        {
            title: 'Unit Kerja',
            dataIndex: 'unit_kerja',
            key: 'unit_kerja',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status: boolean) => <p>{status ? 'Aktif' : 'Tidak Aktif'}</p>,
        },
        {
            title: 'Aksi',
            key: 'aksi',
            align: 'center',
            render: (_: any, record: Item) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => onOpenModal(record)}>
                        <Pencil />
                    </Button>
                    <Button onClick={() => { navigate("/dashboard/master-data/" + record.no) }}>
                        <Eye />
                    </Button>
                    <Button disabled={!record.status} onClick={() => onDelete(record.no)}>
                        <Trash2 />
                    </Button>
                </div >
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default MasterDatatable;
