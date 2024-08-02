import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    background-color: #f2f2f2;
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
`;

const Td = styled.td`
    padding: 12px;
    border: 1px solid #ddd;
`;

const FilterInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

const ClearButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

interface OrderData {
    [key: string]: any;
}

interface OrderTableProps {
    data: OrderData[];
}

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    if (data.length === 0) return null;

    const columns = Object.keys(data[0]);

    const handleFilterChange = (column: string, value: string) => {
        setFilters({
            ...filters,
            [column]: value,
        });
    };

    const clearFilters = () => {
        setFilters({});
    };

    const filteredData = data.filter(row =>
        columns.every(column =>
            row[column].toString().toLowerCase().includes(filters[column]?.toLowerCase() || '')
        )
    );

    return (
        <>
            <Table>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <Th key={column}>
                            {column}
                            <FilterInput
                                type="text"
                                value={filters[column] || ''}
                                onChange={(e) => handleFilterChange(column, e.target.value)}
                                placeholder={`Filter ${column}`}
                            />
                        </Th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredData.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <Td key={column}>{row[column]}</Td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
            <ClearButton onClick={clearFilters}>Clear All Filters</ClearButton>
        </>
    );
};

export default OrderTable;