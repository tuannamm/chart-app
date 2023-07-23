import "./buttonGroup.scss";

const GroupButton = ({ title, setLineStyle }) => {
  return (
    <div className="btn-group" role="group">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autoComplete="off"
        defaultChecked
        onChange={() => setLineStyle("smooth")}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">
        Smooth
      </label>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autoComplete="off"
        onChange={() => setLineStyle("straight")}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">
        Straight
      </label>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio3"
        autoComplete="off"
        onChange={() => setLineStyle("stepline")}
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio3">
        Stepline
      </label>
    </div>
  );
};

export default GroupButton;
