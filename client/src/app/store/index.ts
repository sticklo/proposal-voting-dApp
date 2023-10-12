import { create } from 'zustand';
import { createAccountSlice, AccountSlice } from './slices';

export const useBoundStore = create<AccountSlice>((...a) => ({
  ...createAccountSlice(...a),
}));
