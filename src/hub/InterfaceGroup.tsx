import { Avatar, Badge, Card, Col, Row, Skeleton, Typography } from "antd";
import React from "react";
import { InterfaceGroup as InterfaceGroupGQL } from "../generated/graphql";
import ErrorAlert from "../layout/ErrorAlert";
import { useNavigate } from "react-router-dom";
import "./InterfaceGroup.css";
import { executorGroups } from "./data";

const { Paragraph } = Typography;

// defines number of skeletons Cards to display while loading
const skeletonsTabsNumber = 15;

interface InterfaceGroupProps {
  interfaceGroups: InterfaceGroupGQL[];
  error?: Error;
  isLoading: boolean;
}

function InterfaceGroup({
  interfaceGroups,
  error,
  isLoading,
}: InterfaceGroupProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return loadingCards();
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const cards = executorGroups.map(({ name, description, items, iconURL }) => {
    return (
      <Col span={6} key={name}>
        <Card
          className="content-bg-rounded"
          hoverable={items > 0}
          onClick={() => {
            items && navigate(`/hub/executors/${name}`);
          }}
          bordered={false}
        >
          <Card.Meta
            avatar={<Avatar shape="square" size="large" src={iconURL} />}
            title={name}
            description={
              <Paragraph ellipsis={{ rows: 1 }}>{description}</Paragraph>
            }
          />
          <div className="interface-group-count-wrapper">
            <Badge className="interface-group-count" count={items} />
          </div>
        </Card>
      </Col>
    );
  });

  return <Row gutter={[24, 24]}> {cards} </Row>;
}

function loadingCards() {
  const skeletons = Array(skeletonsTabsNumber)
    .fill(null)
    .map((item, idx) => (
      <Col span={6} key={idx}>
        <Card bordered={false}>
          <Skeleton
            active
            loading
            avatar={{ shape: "square" }}
            title
            paragraph={{ rows: 1 }}
          />
        </Card>
      </Col>
    ));
  return <Row gutter={[24, 24]}>{skeletons}</Row>;
}

export default InterfaceGroup;
