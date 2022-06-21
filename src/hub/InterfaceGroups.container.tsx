import React from "react";
import InterfaceGroup from "./InterfaceGroup";
import {
  InterfaceGroup as InterfaceGroupGQL,
  useListInterfaceGroupsQuery,
} from "../generated/graphql";

function InterfaceGroupsContainer() {
  // const { data, error, isLoading } = useListInterfaceGroupsQuery();

  const groups: InterfaceGroupGQL[] = [];
  return (
    <InterfaceGroup
      interfaceGroups={groups}
      // error={error as Error}
      isLoading={false}
    />
  );
}

export default InterfaceGroupsContainer;
