以下に、`src/tests/components/store_list.test.tsx`の実装例を示します：

```tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreList from '../../src/components/store_list';
import { useStoreList } from '../../src/hooks/use_store_list';

// モック化
jest.mock('../../src/hooks/use_store_list');

describe('StoreList Component', () => {
  const mockStores = [
    {
      id: '1',
      name: 'テスト店舗1',
      address: '東京都渋谷区1-1-1',
      description: 'テスト店舗1の説明',
    },
    {
      id: '2', 
      name: 'テスト店舗2',
      address: '東京都新宿区2-2-2',
      description: 'テスト店舗2の説明',
    }
  ];

  beforeEach(() => {
    // useStoreListのモック実装
    (useStoreList as jest.Mock).mockReturnValue({
      stores: mockStores,
      isLoading: false,
      error: null
    });
  });

  it('店舗リストを正常にレンダリングする', async () => {
    render(<StoreList />);

    // 各店舗の名前が表示されていることを確認
    await waitFor(() => {
      expect(screen.getByText('テスト店舗1')).toBeInTheDocument();
      expect(screen.getByText('テスト店舗2')).toBeInTheDocument();
    });
  });

  it('ローディング中の状態を正しく表示する', () => {
    // ローディング状態のモック
    (useStoreList as jest.Mock).mockReturnValue({
      stores: [],
      isLoading: true,
      error: null
    });

    render(<StoreList />);

    // ローディングメッセージの確認
    expect(screen.getByText(/読み込み中.../i)).toBeInTheDocument();
  });

  it('エラー発生時のエラーメッセージを表示する', () => {
    // エラー状態のモック
    (useStoreList as jest.Mock).mockReturnValue({
      stores: [],
      isLoading: false,
      error: new Error('データ取得エラー')
    });

    render(<StoreList />);

    // エラーメッセージの確認
    expect(screen.getByText(/エラーが発生しました/i)).toBeInTheDocument();
  });

  it('店舗が0件の場合の表示を確認', () => {
    // 空の店舗リストのモック
    (useStoreList as jest.Mock).mockReturnValue({
      stores: [],
      isLoading: false,
      error: null
    });

    render(<StoreList />);

    // 店舗が見つからないメ