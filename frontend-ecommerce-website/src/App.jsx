import axios from "axios";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useQuery } from "@tanstack/react-query";

function App() {
  // Sử dụng useQuery hook để fetch dữ liệu sản phẩm
  // Destructuring để lấy ra 3 giá trị: data (dữ liệu), isLoading (trạng thái loading), error (lỗi nếu có)
  const { data, isLoading, error } = useQuery({
    // queryKey: Định danh duy nhất cho query này, giúp React Query cache và quản lý
    queryKey: ["products"],
    
    // queryFn: Hàm thực hiện việc gọi API
    queryFn: async () => {
      // Gọi API để lấy danh sách sản phẩm
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKEND}/product/get-all`
      );
      // Trả về dữ liệu từ response (res.data chứa dữ liệu thực tế)
      return res.data;
    },
  });

  // Log ra console để debug và xem dữ liệu
  console.log("Products data:", data);        // Dữ liệu sản phẩm nhận được
  console.log("Loading:", isLoading);         // true khi đang loading, false khi xong
  console.log("Error:", error);               // null nếu không có lỗi, object lỗi nếu có
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
