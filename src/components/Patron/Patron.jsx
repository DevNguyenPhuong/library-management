import { Button, Col, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { initialPatron } from "../../data/fakeData";
import PatronInfoCard from "./PatronInfoCard";
import CreateLoanForm from "./CreateLoanForm";
import PatronLoanTable from "./PatronLoanTable";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PatronFineTable from "./PatronFineTable";

const Patron = () => {
  const navigate = useNavigate();
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
        <Col xs={24} lg={24}>
          <Button
            type="primary"
            icon={<HiArrowLeft />}
            onClick={() => navigate("/patrons")}
          >
            Back
          </Button>
        </Col>
        <Col xs={24} lg={10}>
          <PatronInfoCard
            patron={patron}
            calculateAge={calculateAge}
            onUpdatePatron={handleUpdatePatron}
          />
        </Col>
        <Col xs={24} lg={14}>
          <CreateLoanForm />
        </Col>

        <Col xs={24} lg={24}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Loan history
            </h2>
            <PatronLoanTable />
          </div>
        </Col>

        <Col xs={24} lg={24}>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Fine history
            </h2>
            <PatronFineTable />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Patron;
