```typescript
import { StoreService } from '../../src/services/store_service';
import axios from 'axios';

// モック化
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StoreService', () => {
  let storeService: StoreService;

  beforeEach(() => {
    storeService = new StoreService();
    jest.clearAllMocks();
  });

  describe('getStoreList', () => {
    it('店舗一覧を正常に取得できること', async () => {
      const mockStores = [
        { id: 1, name: '店舗A',