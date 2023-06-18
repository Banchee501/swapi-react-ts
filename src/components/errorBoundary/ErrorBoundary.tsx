import { useState, useEffect, ReactNode, FC } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return <ErrorMessage />;
  }

  return <>{children}</>;
};

export default ErrorBoundary;