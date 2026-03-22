import { useState, useEffect } from 'react';
import { fetchWorkshopData } from '../utils/dataFetcher';

export const useWorkshopData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const updateData = () => setData(fetchWorkshopData());
        updateData();
        const interval = setInterval(updateData, 1000);
        return () => clearInterval(interval);
    }, []);

    return data;
};
