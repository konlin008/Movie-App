import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { registerApi, loginApi, fetchMeApi, logoutApi } from "@/api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};

export const useFetchMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMeApi,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
};
