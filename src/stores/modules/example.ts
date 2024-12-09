// 定义 Store
export const useExampleStore = defineStore(
  'info',
  () => {
    const detail: any = ref({});
    const setDetail = async (val: any) => {
      detail.value = val;
    };

    return {
      detail,
      setDetail,
    };
  },
  {
    persist: true,
  }
);
