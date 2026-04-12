import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { StrictMode, lazy, Suspense } from "react";
import { BsYoutube } from "react-icons/bs";
import NotFound from "./pages/notFound.jsx";

// lazy loading
const App = lazy(() => import("./App.jsx"));
const VideoPlayer = lazy(() => import("./pages/VideoPlayer.jsx"));
const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const CreateChannel = lazy(() => import("./components/CreateChannel.jsx"));
const Channel = lazy(() => import("./pages/Channel.jsx"));
const Channels = lazy(() => import("./pages/Channels.jsx"));


// ==============================
// 🔐 PROTECTED ROUTE COMPONENT
// ==============================
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // if not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};


// ==============================
// 🎬 LOADING UI
// ==============================
const LoadingFallback = () => (
  <div style={{minHeight: "60vh",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",background: "#fff"}}>
    <div style={{display: "flex",alignItems: "center",marginBottom: 18}}>
      <BsYoutube color="#FF0000" size={"3rem"} />
      <span style={{fontWeight: 700,fontSize: "2rem",color: "#222"}}>
        YouTube
      </span>
    </div>
    <div style={{marginTop: 20}}>Loading...</div>
  </div>
);


// ==============================
// 🌐 ROUTER
// ==============================
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "/video/:videoId",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VideoPlayer />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ),
      },

      // 🔐 PROTECTED ROUTES
      {
        path: "/createChannel",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <CreateChannel />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/channel",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Channel />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "/channels/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Channels />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);


// ==============================
// 🚀 APP RENDER
// ==============================
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);