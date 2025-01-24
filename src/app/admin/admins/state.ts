import { create } from "zustand";

// Define reusable types
export type AdminState = {
  image: File | null;
  name: string | null;
  email: string | null;
  permissions:
    | {
        value: string;
        text: string;
      }[]
    | null;
  password: string | null;
  confirmPassword: string | null;
};

export type ManageAdminsState = {
  state: AdminState;
  loading: boolean;
  error: string | null;
  setState: (state: Partial<AdminState>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearState: () => void;
};

export const useManageAdminsState = create<ManageAdminsState>((set, get) => ({
  state: {
    image: null,
    name: null,
    email: null,
    permissions: null,
    password: null,
    confirmPassword: null,
  },
  loading: false,
  error: null,
  setState(data) {
    set((state) => ({
      ...state,
      state: {
        ...state.state,
        ...data,
      },
    }));
  },
  setLoading(loading) {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setError(error) {
    set((state) => ({
      ...state,
      error,
    }));
  },
  clearState() {
    set((state) => ({
      ...state,
      state: {
        image: null,
        name: null,
        email: null,
        permissions: null,
        password: null,
        confirmPassword: null,
      },
      loading: false,
      error: null,
    }));
  },
}));
