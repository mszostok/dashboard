import { Card, Col, Row, Table, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./InterfacesList.css";
import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ActionStatusPhase } from "../generated/graphql";
import { Link } from "react-router-dom";
import ActionStatus from "../actions/ActionStatus";
import { executorGroups } from "./data";

const { Meta } = Card;
const { Text } = Typography;

interface InterfacesListProps {
  path?: string;
  error?: Error;
  isLoading: boolean;
}

interface dataItem {
  name: string;
  namespace: string;
  createdAt: Date;
  status: string;
}

function InterfacesList({ path, isLoading }: InterfacesListProps) {
  const data: dataItem[] = [
    {
      name: "read-only",
      namespace: "default, kube-system, istio-system, botkube",
      createdAt: new Date(),
      status: "SERVING",
    },
    {
      name: "admin-access",
      namespace: "@all",
      createdAt: new Date(),
      status: "INITIALIZATION",
    },
    {
      name: "full-team-a-access",
      namespace: "team-a",
      createdAt: new Date(),
      status: "FAILED",
    },
  ];
  const extraContent = (
    <Link to={`/actions/new/cap.interface.database.redis.install/0.1.0`}>
      <PlusCircleOutlined /> Configure
    </Link>
  );

  const gridStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    textAlign: "center",
    background: "none",
  };
  const executor = executorGroups.find((val) => {
    return val.name === path;
  });

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={4}>
            <Card
              style={{ height: 200, background: "none", borderRadius: "6px" }}
              cover={
                <img
                  alt="example"
                  style={{
                    marginTop: 30,
                    display: "block",
                    marginLeft: 80,
                    marginRight: "auto",
                    width: "30%",
                    height: "30%",
                  }}
                  src={executor?.iconURL}
                />
              }
            >
              <Meta title={executor?.name} style={{ marginLeft: 80 }} />
            </Card>
          </Col>
          <Col span={20}>
            <Card
              title="General information"
              bordered={false}
              style={{ height: 190, borderRadius: "6px" }}
            >
              <Card.Grid style={gridStyle}>
                Version, documentation url, support url, etc.
              </Card.Grid>
              <Card.Grid style={gridStyle}>statistics etc.</Card.Grid>
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <Card
        title="Manage Instances"
        bordered={false}
        className="test"
        style={{ borderRadius: "6px" }}
        extra={extraContent}
      >
        <Table
          className="content-bg-rounded2"
          style={{ borderBottom: "none", borderRadius: "6px !important" }}
          loading={isLoading}
          dataSource={data.slice(0, executor?.items)}
          columns={columns}
          pagination={false}
        />
      </Card>
    </>
  );
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <Link to={`/executors/${name}`}>
        <strong>{name}</strong>
      </Link>
    ),
    sorter: (a: dataItem, b: dataItem) => a.name.localeCompare(b.name),
  },
  {
    title: "Namespace",
    dataIndex: "namespace",
    key: "namespace",
    render: (ns: string) => {
      const out = ns.split(",").map((val) => {
        return <Text code>{val}</Text>;
      });
      return out;
    },
    sorter: (a: dataItem, b: dataItem) =>
      a.namespace.localeCompare(b.namespace),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => <Text>{new Date(date).toUTCString()}</Text>,
    sorter: (a: dataItem, b: dataItem) =>
      a.createdAt.getTime() - b.createdAt.getTime(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (phase: ActionStatusPhase | undefined) => (
      <ActionStatus phase={phase} />
    ),
    sorter: (a: dataItem, b: dataItem) => {
      const { status: aStatus = "" } = a;
      const { status: bStatus = "" } = b;

      return aStatus.localeCompare(bStatus);
    },
  },
  {
    title: "Action",
    dataIndex: "name",
    align: "center" as const,
    key: "action",
    render: (name: string) => (
      <Link to={`/executors/${name}`}>
        <DeleteOutlined />
      </Link>
    ),
  },
];

export default InterfacesList;
