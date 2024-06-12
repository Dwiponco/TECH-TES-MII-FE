import { useState, useEffect } from 'react';
import MasterDataEditModal from './local-component/master-data.edit.modal';
import MasterDatatable from './local-component/master-data.table';
import { Button, Input, Space } from 'antd';
import { Plus } from 'lucide-react';
import { SearchOutlined } from '@ant-design/icons';
import { geojson } from '@/constants/gejson';

export interface Item {
    key: string;
    no: number;
    ruas: string;
    unit_kerja: string;
    status: boolean;
}

const defaultItem: Item = {
    key: '',
    no: 0,
    ruas: '',
    unit_kerja: '',
    status: false,
};

const MasterDataPage = () => {

    const [data, setData] = useState<Item[]>([]);
    const [isModal, setIsModal] = useState(false);
    const [detailData, setDetailData] = useState<Item>(defaultItem);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleToggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleOpenModal = (record: Item | null) => {
        setDetailData(record ?? defaultItem);
        setIsModal(true);
    };

    const handleModalAction = () => {
        setIsModal(false);
    };

    const handleSave = (updatedData: Item) => {
        if (updatedData.key) {
            // Edit mode
            setData(prevData =>
                prevData.map(item => (item.key === updatedData.key ? updatedData : item))
            );
        } else {
            // Add mode
            const newData = {
                ...updatedData,
                key: (data.length + 1).toString(),
                no: data.length + 1,
            };
            setData(prevData => [...prevData, newData]);
        }
        handleModalAction();
    };

    const handleDelete = (key: string) => {
        setData(prevData =>
            prevData.map(item =>
                item.key === key ? { ...item, status: false } : item
            )
        );
    };

    useEffect(() => {
        if (geojson && geojson.features && geojson.features.length > 0) {
            // @ts-ignore
            setData(
                geojson.features.map((feature) => {
                    return {
                        key: feature.properties.objectid.toString(),
                        no: feature.properties.no,
                        ruas: feature.properties.ruas,
                        unit_kerja: feature.properties.region,
                        status: feature.properties.status === "Operasi",
                    }
                }));
        }
    }, []);

    return (
        <div className="md:container px-4 m-auto py-8 max-w-full">
            <div className='flex justify-end mb-3'>
                <Space className={`mr-3 px-3 ${isSearchVisible ? '' : 'border rounded'}`}>
                    {isSearchVisible ? (
                        <Input.Search
                            placeholder="Search..."
                            onSearch={(e) => console.log(e)}
                            allowClear
                            style={{ width: 200 }}
                        />
                    ) : (
                        <SearchOutlined onClick={handleToggleSearch} style={{ cursor: 'pointer' }} />
                    )}
                </Space>
                <Button type="primary" onClick={() => handleOpenModal(null)}>
                    <Plus />
                    <span>Tambah Data</span>
                </Button>
            </div>

            <MasterDatatable
                data={data}
                onOpenModal={handleOpenModal}
                onDelete={handleDelete}
            />

            <MasterDataEditModal
                isModal={isModal}
                isModalAction={handleModalAction}
                detailData={detailData}
                onSave={handleSave}
            />
        </div>
    );
};

export { MasterDataPage };