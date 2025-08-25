import { useMutation } from "@tanstack/react-query";

/**
 * Custom hook wrapper cho React Query useMutation
 * Giúp quản lý state loading, error, data cho các API calls
 * 
 * @param {Function} fnCallback - Function thực hiện API call (async function)
 * @returns {Object} Mutation object chứa các properties:
 *   - mutate: Function để trigger API call
 *   - isPending: Boolean cho biết đang loading
 *   - isError: Boolean cho biết có lỗi
 *   - error: Object chứa thông tin lỗi
 *   - data: Object chứa response data
 *   - reset: Function để reset mutation state
 * 
 * @example
 * const mutation = useMutationHooks((data) => UserService.loginUser(data));
 * 
 * // Sử dụng
 * mutation.mutate({ email: 'test@example.com', password: '123456' });
 * 
 * // Kiểm tra trạng thái
 * if (mutation.isPending) console.log('Đang loading...');
 * if (mutation.isError) console.log('Có lỗi:', mutation.error);
 * if (mutation.data) console.log('Data:', mutation.data);
 */
export const useMutationHooks = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: fnCallback, // Function sẽ được gọi khi mutate()
  });
  return mutation;
};
