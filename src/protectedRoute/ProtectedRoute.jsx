import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../lib/appwrite"; // Ensure you have Appwrite client setup correctly
import { Box, Typography } from "@mui/material";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        // Check if the user is authenticated using Appwrite's account API
        await account.get(); // This will throw an error if the user is not logged in
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" align="center" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render children
  return children;
}

export default ProtectedRoute;
