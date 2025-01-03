import React from 'react';
import { useStoreDetail } from '../hooks/use_store_detail';
import { useTranslation } from 'next-i18next';

interface StoreDetailProps {
  storeId: string;
}

const StoreDetail: React.FC<StoreDetailProps> = ({ storeId }) => {
  const { t } = useTranslation('common');
  const { store, loading, error } = useStoreDetail(storeId);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('error.store_not_found')}</div>;
  }

  if (!store) {
    return null;
  }

  return (
    <div className="store-detail">
      <h1>{store.name}</h1>
      <div className="store-info">
        <p>{t('address')}: {store.address}</p>
        <p>{t('phone')}: {store.phone}</p>
        <p>{t('business_hours')}: {store.businessHours}</p>
        
        {store.description && (
          <div className="store-description">
            <h2>{t('description')}</h2>
            <p>{store.description}</p>
          </div>
        )}

        {store.amenities && store.amenities.length > 0 && (
          <div className="store-amenities">
            <h2>{t('amenities')}</h2>
            <ul>
              {store.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreDetail;