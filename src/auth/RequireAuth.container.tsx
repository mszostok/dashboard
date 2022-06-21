import React from "react";

import {
  loadDefaultLoginDetails,
  LoginDetails,
  requestConfigLoader,
} from "../http/connection";

import { useTestConnectionQuery } from "../generated/graphql";

import { useQueryClient } from "react-query";
import ErrorAlert from "../layout/ErrorAlert";
import LoginForm from "./LoginForm";
import { AuthContext } from "./AuthContext";

interface RequireAuthContainerProps {
  children?: React.ReactNode;
}

export function RequireAuthContainer({ children }: RequireAuthContainerProps) {
  const [authenticated, setAuthenticated] = React.useState(false);

  if (!authenticated && requestConfigLoader.existsAndValid()) {
    setAuthenticated(true);
  }

  const logout = () => {
    requestConfigLoader.reset();
    setAuthenticated(false);
  };

  const onLoginFormSubmit = (values: LoginDetails) => {
    requestConfigLoader.save(values);
  };

  if (!authenticated) {
    try {
      requestConfigLoader.setValid();
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(true);
      // return <ErrorAlert error={err as Error | undefined} />;
    }
  }

  if (!authenticated) {
    const defaultLoginDetails = loadDefaultLoginDetails();
    return (
      <LoginForm
        loading={false}
        onLoginFormSubmit={onLoginFormSubmit}
        defaultLoginDetails={defaultLoginDetails}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
}
