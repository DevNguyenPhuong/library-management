import { Col, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { initialPatron } from "../../data/fakeData";
import PatronInfoCard from "./PatronInfoCard";

const Patron = () => {
  const [patron, setPatron] = useState(initialPatron);
  const calculateAge = (dob) => {
    return moment().diff(moment(dob), "years");
  };

  const handleUpdatePatron = (updatedPatron) => {
    setPatron(updatedPatron);
    toast.success("Patron information updated successfully");
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <PatronInfoCard
            patron={patron}
            calculateAge={calculateAge}
            onUpdatePatron={handleUpdatePatron}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Patron;
