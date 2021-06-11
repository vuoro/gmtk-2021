import create from "zustand";

export const useTest = create((set) => {
  return {
    count: 0,
    increment: () =>
      set((state) => ({
        count: state.count + 1,
      })),
  };
});
