import { useState, useEffect } from 'react';
import { StoreService } from '../services/store_service';
import { Store } from '../types/store'; // 型定義が必要な場合

export const useStoreList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoading(true);
        const storeService = new StoreService();
        const fetchedStores = await storeService.getAllStores();
        setStores(fetchedStores);
        setIsLoading(false);
      } catch (err) {
        setError('店舗情報の取得に失敗しました');
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  const refetchStores = async () => {
    try {
      setIsLoading(true);
      const storeService = new StoreService();
      const fetchedStores = await storeService.getAllStores();
      setStores(fetchedStores);
      setIsLoading(false);
    } catch (err) {
      setError('店舗情報の再取得に失敗しました');
      setIsLoading(false);
    }
  };

  return {
    stores,
    isLoading,
    error,
    refetchStores
  };
};