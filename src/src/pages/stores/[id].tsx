以下に、src/src/pages/stores/[id].tsxの実装を提示します：

```typescript
import React from 'react';
import { useRouter } from 'next/router';
import { useStoreDetail } from '@/hooks/use_store_detail';
import StoreDetail from '@/components/store_detail';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const StoreDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation('common');

  const { 
    store, 
    is