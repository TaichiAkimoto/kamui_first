// 店舗情報に関するバリデーション関数を提供するユーティリティモジュール

/**
 * 店舗名のバリデーション
 * @param storeName 店舗名
 * @returns バリデーション結果
 */
export const validateStoreName = (storeName: string): boolean => {
  // 店舗名の長さチェック（2〜50文字）
  if (!storeName || storeName.trim().length < 2 || storeName.trim().length > 50) {
    return false;
  }
  
  // 特殊文字や数字のみの入力を防ぐ
  const nameRegex = /^[ぁ-んァ-ン一-龯a-zA-Z0-9\s]+$/;
  return nameRegex.test(storeName.trim());
};

/**
 * 住所のバリデーション
 * @param address 住所
 * @returns バリデーション結果
 */
export const validateAddress = (address: string): boolean => {
  // 住所の長さチェック（5〜100文字）
  if (!address || address.trim().length < 5 || address.trim().length > 100) {
    return false;
  }
  
  // 基本的な住所フォーマットチェック
  const addressRegex = /^[ぁ-んァ-ン一-龯a-zA-Z0-9\s\-\.]+$/;
  return addressRegex.test(address.trim());
};

/**
 * 電話番号のバリデーション
 * @param phoneNumber 電話番号
 * @returns バリデーション結果
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // 電話番号の形式チェック（ハイフンあり/なし両対応）
  const phoneRegex = /^0\d{1,4}-?\d{1,4}-?\d{4}$/;
  return phoneRegex.test(phoneNumber.trim());
};

/**
 * メールアドレスのバリデーション
 * @param email メールアドレス
 * @returns バリデーション結果
 */
export const validateEmail = (email: string): boolean => {
  // 基本的なメールアドレス形式チェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * 店舗情報の総合バリデーション
 * @param storeData 店舗情報オブジェクト
 * @returns バリデーション結果
 */
export const validateStoreData = (storeData: {
  name: string;
  address: string;
  phoneNumber: string;
  email?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!validateStoreName(storeData.name)) {
    errors.push('店舗名が不正です');
  }

  if (!validateAddress(storeData.address)) {
    errors.push('住所が不正です');
  }

  if (!validatePhoneNumber(storeData.phoneNumber)) {
    errors.push('電話番号が不正です');
  }

  if (storeData.email && !validateEmail(storeData.email)) {
    errors.push('メールアドレスが不正です');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};