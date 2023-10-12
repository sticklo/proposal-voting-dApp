import { StateCreator } from 'zustand';

export interface AccountSlice {
  account: string;
  addAccount: (newAccount: string) => void;
  removeAccount: () => void;
}

export const createAccountSlice: StateCreator<
  AccountSlice,
  [],
  [],
  AccountSlice
> = (set) => ({
  account: '',
  addAccount: (newAccount: string) => set((state) => ({ account: newAccount })),
  removeAccount: () => set((state) => ({ account: '' })),
});
