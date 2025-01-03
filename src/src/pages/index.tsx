以下に、指定されたYAMLに基づいたsrc/pages/index.tsxの実装を提示します：

```typescript
import React from 'react';
import { NextPage } from 'next';
import StoreList from '../components/store_list';
import { useStoreList } from '../hooks/use_store_list';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HomePage: NextPage = () => {
  const { t } = useTranslation('common');
  const { stores, isLoading, error } = useStoreList();

  if (is