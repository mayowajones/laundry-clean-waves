import { useCallback, useReducer, useState } from "react";
import MainLayout from "./components/MainLayout";
import ToastContainer from "./components/ToastContainer";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicesPage";
import UserHome from "./pages/UserHome";
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";
import { AppContext } from "./context/AppContext";
import { EMPLOYEES } from "./data/constants";

const initialCartState = {
  items: [],
  schedule: null,
  delivery: "standard",
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(
        (item) => item.id === action.item.id && item.serviceType === action.item.serviceType,
      );
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.item.id && item.serviceType === action.item.serviceType
              ? { ...item, qty: Math.min(item.qty + 1, 10) }
              : item,
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === action.id && item.serviceType === action.serviceType),
        ),
      };
    case "UPDATE_QTY":
      if (action.qty === 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.id === action.id && item.serviceType === action.serviceType),
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id && item.serviceType === action.serviceType
            ? { ...item, qty: action.qty }
            : item,
        ),
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id && item.serviceType === action.serviceType
            ? { ...item, note: action.note }
            : item,
        ),
      };
    case "SET_SCHEDULE":
      return { ...state, schedule: action.schedule };
    case "SET_DELIVERY":
      return { ...state, delivery: action.delivery };
    case "CLEAR":
      return { items: [], schedule: null, delivery: "standard" };
    default:
      return state;
  }
}

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
    cartDispatch({ type: "CLEAR" });
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) => prev.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)));
    setUser((prev) => (prev?.id === updatedEmployee.id ? updatedEmployee : prev));
  };

  const handleCheckout = (total) => {
    setCheckoutTotal(total);
    setPage("checkout");
  };

  const handleOrderSuccess = () => {
    setPage("orders");
  };

  let content = <AuthPage onLogin={handleLogin} />;

  if (user) {
    let pageContent = <UserHome setPage={setPage} />;

    if (user.role === "admin") {
      if (page === "profile") {
        pageContent = <ProfilePage />;
      } else if (page === "directory") {
        pageContent = <EmployeeDirectory />;
      } else {
        pageContent = <AdminDashboard />;
      }
    } else {
      switch (page) {
        case "services":
          pageContent = <ServicesPage setPage={setPage} />;
          break;
        case "products":
          pageContent = <ProductsPage />;
          break;
        case "cart":
          pageContent = <CartPage onCheckout={handleCheckout} />;
          break;
        case "checkout":
          pageContent = <CheckoutPage total={checkoutTotal} onSuccess={handleOrderSuccess} />;
          break;
        case "orders":
          pageContent = <OrdersPage />;
          break;
        case "profile":
          pageContent = <ProfilePage />;
          break;
        default:
          pageContent = <UserHome setPage={setPage} />;
      }
    }

    content = <MainLayout page={page} setPage={setPage}>{pageContent}</MainLayout>;
  }

  return (
    <AuthContext.Provider value={{ user, logout: handleLogout }}>
      <CartContext.Provider value={{ state: cartState, dispatch: cartDispatch }}>
        <AppContext.Provider
          value={{
            toasts,
            addToast,
            orders,
            addOrder,
            updateOrderStatus,
            employees,
            updateEmployee,
          }}
        >
          {content}
          <ToastContainer toasts={toasts} />
        </AppContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
