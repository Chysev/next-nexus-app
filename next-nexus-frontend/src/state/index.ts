import { useQuery, useQueryClient } from "@tanstack/react-query";

const createGlobalState =
  <T>(queryKey: unknown, initialData: T | null = null) =>
  () => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(initialData),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    const setData = (data: Partial<T>) => {
      queryClient.setQueryData([queryKey], data);
    };

    const resetData = () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      queryClient.refetchQueries({
        queryKey: [queryKey],
      });
    };

    return { data, setData, resetData };
  };

const createBooleanState = (key: string) =>
  createGlobalState<boolean>(key, false);
const createStringState = (key: string) => createGlobalState<string>(key, "");
const createNumberState = (key: string) => createGlobalState<number>(key, 0);

export { createBooleanState, createStringState, createNumberState };

export default createGlobalState;
