import React, { useState, useEffect } from 'react';
import { useStoreList } from '../hooks/use_store_list';
import { Store } from '../types/store'; // 型定義を想定
import { useTranslation } from 'react-i18next'; // 多言語対応

const StoreList: React.FC = () => {
  const { t } = useTranslation(); // 多言語対応フック
  const { stores, loading, error } = useStoreList();
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (stores) {
      const filtered = stores.filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
    }
  }, [stores, searchTerm]);

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  if (error) {
    return <div>{t('common.error')}: {error.message}</div>;
  }

  return (
    <div className="store-list-container">
      <h1>{t('store.list_title')}</h1>
      
      <input 
        type="text" 
        placeholder={t('store.search_placeholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredStores.length === 0 ? (
        <p>{t('store.no_stores_found')}</p>
      ) : (
        <ul className="store-list">
          {filteredStores.map(store => (
            <li key={store.id} className="store-item">
              <div className="store-info">
                <h2>{store.name}</h2>
                <p>{store.address}</p>
                <p>{store.phone}</p>
              </div>
              <a 
                href={`/stores/${store.id}`} 
                className="store-details-link"
              >
                {t('store.view_details')}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoreList;