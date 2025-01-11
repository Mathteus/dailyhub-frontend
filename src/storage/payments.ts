import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Transaction {
  id: string;
  name: string;
  description: string;
  value: number;
  type: 'payment' | 'receipt';
  date: string | Date;
}

interface ITransactions {
  date: string;
  toUpdate: () => void;
  transactionsUser: Transaction[];
  getByMonth: () => void;
  setMonth: (newMonth: string) => void;
  create: (itemPay: Transaction) => void;
  remove: (itemPay: Transaction) => void;
  find: (itemPay: Transaction) => void;
  update: (itemPay: Transaction) => void;
  setCallback: (callback: () => void) => void;
  clear: () => void;
}

export const usePaymentsStorage = create<ITransactions>()(
  persist(
    (set, get) => ({
      date: '',
      toUpdate: () => {},
      transactionsUser: [],
      clear: () => {
        set({ transactionsUser: [] });
      },
      setMonth: (month: string) => {
        set({ date: month });
      },
      setCallback: (callback: () => void) => {
        set({ toUpdate: callback });
      },
      getByMonth: () => {
        return get().transactionsUser.filter(e => e.date === get().date);
      },
      create: (itemPay: Transaction) => {
        set({
          transactionsUser: [...get().transactionsUser, itemPay]
        });
      },
      update: (itemPay: Transaction) => {
        set({
          transactionsUser: get().transactionsUser.map(e => {
            if (e.id === itemPay.id) {
              return itemPay;
            }
            return e;
          }),
        });
      },
      remove: (itemPay: Transaction) => {
        set({
          transactionsUser: get().transactionsUser.filter(e => e.id !== itemPay.id),
        })
      },
      find: (itemPay: Transaction) => {
        return get().transactionsUser.filter(e => e.id === itemPay.id)
      }
    }),
    {
      name: 'taks', 
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
