import PropTypes from "prop-types";

const RenderKeypadRow = ({ values, onClick }) => (
  <div className="flex border-y border-dim">
    {values.map((value, index) => (
      <div
        key={index}
        onClick={() => onClick(value)}
        className={`w-[25%] hover:bg-light cursor-pointer border-r-2 border-dim text-white py-5 font-medium text-center select-none ${
          index === values.length - 1 ? "border-r-0" : ""
        }`}
      >
        {value}
      </div>
    ))}
  </div>
);

RenderKeypadRow.propTypes = {
  values: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RenderKeypadRow;
