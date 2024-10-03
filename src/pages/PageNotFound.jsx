import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { theme } from "antd";

function PageNotFound() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Result
      style={{
        height: "100vh",
        background: colorBgContainer,
      }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate(-1)} type="primary">
          Go back
        </Button>
      }
    />
  );
}

export default PageNotFound;
