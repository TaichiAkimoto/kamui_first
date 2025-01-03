import axios from 'axios';

// 店舗情報の型定義
export interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  rating: number;
  images: string[];
}

// ストアサービスクラス
export class StoreService {
  // API エンドポイント（環境変数から取得）
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  // 店舗一覧を取得
  static async getStores(
    page: number = 1, 
    limit: number = 10, 
    filters?: { 
      category?: string, 
      minRating?: number 
    }
  ): Promise<{
    stores: Store[], 
    total: number, 
    totalPages: number
  }> {
    try {
      const response = await axios.get(`${this.BASE_URL}/stores`, {
        params: {
          page,
          limit,
          ...filters
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch stores:', error);
      throw error;
    }
  }

  // 特定の店舗詳細を取得
  static async getStoreById(id: number): Promise<Store> {
    try {
      const response = await axios.get(`${this.BASE_URL}/stores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch store with id ${id}:`, error);
      throw error;
    }
  }

  // 新規店舗を作成
  static async createStore(storeData: Omit<Store, 'id'>): Promise<Store> {
    try {
      const response = await axios.post(`${this.BASE_URL}/stores`, storeData);
      return response.data;
    } catch (error) {
      console.error('Failed to create store:', error);
      throw error;
    }
  }

  // 店舗情報を更新
  static async updateStore(id: number, storeData: Partial<Store>): Promise<Store> {
    try {
      const response = await axios.patch(`${this.BASE_URL}/stores/${id}`, storeData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update store with id ${id}:`, error);
      throw error;
    }
  }

  // 店舗を削除
  static async deleteStore(id: number): Promise<void> {
    try {
      await axios.delete(`${this.BASE_URL}/stores/${id}`);
    } catch (error) {
      console.error(`Failed to delete store with id ${id}:`, error);
      throw error;
    }
  }

  // 検索機能
  static async searchStores(query: string): Promise<Store[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/stores/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to search stores:', error);
      throw error;
    }
  }
}

// デフォルトエクスポート
export default StoreService;