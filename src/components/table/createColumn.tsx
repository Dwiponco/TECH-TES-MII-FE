import { useState, useRef } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

interface ColumnFilterProps {
    setSelectedKeys: (keys: React.Key[]) => void;
    selectedKeys: React.Key[];
    confirm: () => void;
    clearFilters: () => void;
}

export function getColumnSearchProps(dataIndex: string) {
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string | null>(null);
    // @ts-ignore
    const searchInput = useRef<Input>(null);

    const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
        confirm();
        setSearchText(selectedKeys[0] as string);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const optionFilter = {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: ColumnFilterProps) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex.replace(/_/g, " ")}`}
                    value={selectedKeys[0] as string}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value: string, record: any) => {
            const data = record[dataIndex];
            return data ? data.toString().toLowerCase().includes(value.toLowerCase()) : false;
        },
        render: (text: string) =>
            searchedColumn === dataIndex ? (
                <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''} />
            ) : (
                text
            ),
    };

    return { optionFilter, handleSearch, handleReset, searchText, searchedColumn, setSearchText, setSearchedColumn, searchInput };
}

export function createStringColumn(title: string, dataIndex: string, key: string, fixed?: boolean, sortable: boolean = true, searchable: boolean = true) {
    const column: any = {
        title,
        dataIndex,
        key,
        fixed: fixed,
        ...(sortable && {
            sorter: (a: any, b: any) => {
                const valueA = a[dataIndex] || "";
                const valueB = b[dataIndex] || "";
                return valueA.toString().localeCompare(valueB.toString());
            },
        }),
        ...(searchable && getColumnSearchProps(dataIndex).optionFilter),
    };
    return column;
}

export function createActionColumn(
    title: string,
    dataIndex: string,
    key: string,
    fixed?: boolean,
    sortable: boolean = true,
    searchable: boolean = true,
    customRender?: (text: any, record: any) => JSX.Element
) {
    const column: any = {
        title,
        dataIndex,
        key,
        fixed: fixed,
        ...(sortable && {
            sorter: (a: any, b: any) => {
                const valueA = a[dataIndex] || "";
                const valueB = b[dataIndex] || "";
                return valueA.toString().localeCompare(valueB.toString());
            },
        }),
        ...(searchable && getColumnSearchProps(dataIndex).optionFilter),
        render: (text: any, record: any) => (
            <div>
                {customRender ? customRender(text, record) : <span>{text}</span>}
            </div>
        ),
    };
    return column;
}
