import { Card, Col, Descriptions, Row, Table, Typography } from "antd";
import "./InterfacesList.css";
import React from "react";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ActionStatusPhase } from "../generated/graphql";
import { Link } from "react-router-dom";
import ActionStatus from "../actions/ActionStatus";

const { Meta } = Card;
const { Text } = Typography;

function ExecutorDetails({ name }: { name?: string }) {
  const extraContentBound = (
    <Link to={`/actions/new/cap.interface.database.redis.install/0.1.0`}>
      <PlusCircleOutlined /> Add binding
    </Link>
  );
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={16}>
            <Card
              title="General information"
              style={{ height: 200, borderRadius: "6px" }}
            >
              <Descriptions column={2}>
                <Descriptions.Item label="Name">{name}</Descriptions.Item>
                <Descriptions.Item label="Created at">
                  <Text>{new Date().toLocaleString()}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Others">
                  <Text code>documentation, links, icons, maintainer etc.</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Editor">
                  <Text code>
                    Option to edit the configuration in YAML format
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Status"
              bordered={true}
              style={{
                height: 200,
                borderRadius: "6px",
                borderLeftColor: "green",
                borderLeftWidth: "6px",
              }}
              extra={<CheckCircleOutlined style={{ color: "green" }} />}
            >
              <h3>
                <code>
                  <strong>SERVING</strong>
                </code>
              </h3>
              The instance is configured properly
            </Card>
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <Card
        title="Bound Communications"
        // headStyle={{ borderBottom: "none" }}
        bordered={false}
        className="test"
        style={{ borderRadius: "6px" }}
        extra={extraContentBound}
      >
        <Table
          className="content-bg-rounded2"
          style={{ borderBottom: "none", borderRadius: "6px" }}
          loading={false}
          dataSource={data}
          columns={bindColumns}
          pagination={false}
        />
      </Card>
      <br />
      <br />
      <Card
        title="Events"
        // headStyle={{ borderBottom: "none" }}
        bordered={false}
        style={{ borderRadius: "6px" }}
        className="test"
      >
        <Table
          className="content-bg-rounded2"
          style={{ borderBottom: "none", borderRadius: "6px" }}
          loading={false}
          // dataSource={{}}
          columns={bindColumns}
          pagination={false}
        />
      </Card>
    </>
  );
}

const data: dataItem[] = [
  {
    name: "Gopher Slack Workspace",
    type: "ClusterSlack",
    channel: "team-b, team-a",
    createdAt: new Date(),
    status: "SERVING",
  },
  {
    name: "Admin Discord",
    type: "ClusterDiscord",
    channel: "botkube, admins",
    createdAt: new Date(),
    status: "FAILED",
  },
];

interface dataItem {
  name: string;
  type: string;
  channel: string;
  createdAt: Date;
  status: string;
}

const bindColumns = [
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
    title: "Template",
    dataIndex: "type",
    key: "type",
    render: (type: string) => {
      return <Text code>{type}</Text>;
    },
    sorter: (a: dataItem, b: dataItem) => a.type.localeCompare(b.type),
  },
  {
    title: "Channels",
    dataIndex: "channel",
    key: "channel",
    render: (ns: string) => {
      const out = ns.split(",").map((val) => {
        return <Text code>{val}</Text>;
      });
      return out;
    },
    sorter: (a: dataItem, b: dataItem) => a.channel.localeCompare(b.channel),
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

export default ExecutorDetails;
