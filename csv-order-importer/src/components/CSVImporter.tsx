import React from 'react';
import { useCSVReader } from 'react-papaparse';
import styled from 'styled-components';

const ImportSection = styled.div`
    margin-bottom: 20px;
`;

interface CSVImporterProps {
    onImport: (data: any[]) => void;
}

const CSVImporter: React.FC<CSVImporterProps> = ({ onImport }) => {
    const { CSVReader } = useCSVReader();

    return (
        <ImportSection>
            <CSVReader
                onUploadAccepted={(results: any) => {
                    onImport(results.data);
                }}
                config={{
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                }}
            >
                {({ getRootProps }: any) => (
                    <div {...getRootProps()}>
                        <button type="button">Upload CSV</button>
                    </div>
                )}
            </CSVReader>
        </ImportSection>
    );
};

export default CSVImporter;