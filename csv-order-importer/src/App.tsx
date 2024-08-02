import React, { useState } from 'react';
import styled from 'styled-components';
import CSVImporter from './components/CSVImporter';
import OrderTable from './components/OrderTable';

const AppContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    color: #333;
    text-align: center;
`;

const Message = styled.p`
    color: #666;
    text-align: center;
`;

interface OrderData {
    userID: string;
    orderGUID: string;
    // Add other fields as needed
}

const App: React.FC = () => {
    const [orderData, setOrderData] = useState<OrderData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleImport = async (data: any[]) => {
        setIsLoading(true);
        const ids = data.map(row => row.ID);

        try {
            const response = await fetch('http://localhost:3001/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Received data:', result); // Add this line
            setOrderData(result);
        } catch (error) {
            console.error('Error querying database:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppContainer>
            <Title>Order Data Import</Title>
            <CSVImporter onImport={handleImport} />

            {isLoading ? (
                <Message>Loading data...</Message>
            ) : orderData.length > 0 ? (
                <OrderTable data={orderData} />
            ) : (
                <Message>No data to display. Please import a CSV file.</Message>
            )}
        </AppContainer>
    );
};

export default App;