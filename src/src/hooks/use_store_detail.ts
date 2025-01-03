以下に、`src/src/hooks/use_store_detail.ts`の実装を提示します：

```typescript
import { useState, useEffect } from 'react';
import { StoreService } from '../services/store_service';
import { Store } from '../types/store'; // 型定義が必要な場合

export const useStoreDetail = (storeId: string) => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error