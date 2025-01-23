import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  Layout,
  Login,
  ProtectedRoute,

  Users,
} from "./utils/LazyLoadComponent";
import { Suspense } from "react";
import { ROUTES } from "./utils/routes";
import { ErrorBoundary } from "react-error-boundary";
import ListingDashboard from "./pages/Listings";
import Properties_details from "./pages/ListingDetails";
import EditPage from "./components/Post_Listing/EditListing";
import AddPost from "./components/Post_Listing/page1";
import ReviewsPage from "./pages/Review";
function Fallback({ error }) {
  const regex = /\((.*?):\d+:\d+\)/;
  const match = error.stack.match(regex);
  if (match) {
    const filePath = match[1];
    console.log("File path:", filePath); // Output: http://localhost:5173/src/App.jsx?t=1732289155098
    // If you want just the file name
    var fileName = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.indexOf("?")
    );
    // Output: App.jsx
  } else {
    console.log("No file path found in the error message.");
  }
  return (
    <div
      role="alert"
      className="bg-red-800 flex flex-column w-full h-screen justify-content-center align-items-center"
    >
      <p className="text-white text-5xl text-600">Something went wrong:</p>
      <pre
        style={{ color: "yellow", backgroundColor: "green", padding: "5px" }}
      >
        {error.message}
      </pre>
      <pre
        style={{ color: "yellow", backgroundColor: "green", padding: "5px" }}
      >
        File: {fileName}
      </pre>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary FallbackComponent={Fallback}>
          <AppRoutes />
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
}
function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      {/* <Route path={ROUTES.SIGNUP} element={<Signup />} /> */}
      <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.USERS} element={<Users />} />
        <Route path={ROUTES.LISTINGS} element={<ListingDashboard />} />
        <Route path={ROUTES.LISTINGDETAILS} element={<Properties_details />} />
        <Route path={ROUTES.LISTINGEDIT} element={<EditPage />} />
        <Route path={ROUTES.POSTLISTING} element={<AddPost />} />
        <Route path={ROUTES.REVIEWS} element={<ReviewsPage />} />
        
      </Route>
    </Routes>
  );
}

export default App;
