import type {Client, ClientLocalData} from "~/types/client";

const STORAGE_KEY = 'clients_local_data';

export function useClientLocalData() {
    // Получить все локальные данные по клиентам
    function getAllClientData(): Record<string, ClientLocalData> {
        if (!import.meta.client) return {};
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (err) {
            console.warn('Failed to parse clients_local_data:', err);
            return {};
        }
    }

    // Обновить данные по конкретному клиенту
    function updateClientData(id: Client['id'], newData: Partial<ClientLocalData>): void {
        if (!import.meta.client) return;
        try {
            const allData = getAllClientData();
            const existing = allData[id] || {rating: 0, comment: ''};
            allData[id] = {...existing, ...newData};
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
        } catch (err) {
            console.warn('Failed to read/write clients_local_data:', err);
        }
    }

    return {getAllClientData, updateClientData};
}
