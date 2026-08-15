import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Loading from "./components/Loading";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Edit = lazy(() => import("./pages/Edit"));
const Week = lazy(() => import("./pages/Week"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));



function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#09090F] text-white relative overflow-x-hidden">

        {/* Ambient background glow accents */}
        <div className="pointer-events-none fixed top-[-100px] left-1/4 w-[600px] h-[600px] bg-[#7C3AED]/12 rounded-full blur-[140px]" />

        <div className="pointer-events-none fixed bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#A855F7]/8 rounded-full blur-[140px]" />

        <Suspense fallback={<Loading />}>
          <Routes>

            <Route
              path="/home"
              element={<Home />}
            />

            <Route
              path="/habit/:id"
              element={<Edit />}
            />

            <Route
              path="/habit/weeklyreport"
              element={<Week />}
            />

            <Route
              path="/user/register"
              element={<Register />}
            />

            <Route
              path="/"
              element={<Login />}
            />

          </Routes>
        </Suspense>

      </div>
    </ErrorBoundary>
  );
}

export default App;