import React from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import Page from "../layout/Page";
import WizardContainer from "../wizard/Wizard.container";
import InterfacesList from "../hub/InterfacesList";
import { InterfaceRevisionWithKey } from "../hub/Interfaces.container";
import ExecutorDetails from "../hub/ExecutorDetails";

function NewExecutorDetails() {
  const { name, revision } = useParams();

  const breadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/executors">Executors</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{name}</Breadcrumb.Item>
    </Breadcrumb>
  );
  return (
    <Page
      breadcrumb={breadcrumb}
      title={"Executors"}
      onBack={() => window.history.back()}
    >
      <ExecutorDetails name={name} />
    </Page>
  );
}

export default NewExecutorDetails;
