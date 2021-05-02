import { Button } from "react-bootstrap";

const PageTitle = ({ title }) => {
  return (
    <div className="d-flex">
      <Button
        variant=""
        className="pt-2"
        onClick={() => {
          window.history.back();
        }}
      >
        <i className="fa fa-chevron-left" />
      </Button>
      <h2 className="d-inline m-0">{title}</h2>
    </div>
  );
};

export default PageTitle;
