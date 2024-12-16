import PropTypes from "prop-types";

const MediaTable = ({ photos }) => {
  return (
    <div>
      <div>{photos?.length}</div>
    </div>
  );
};

export default MediaTable;

MediaTable.propTypes = {
  photos: PropTypes.array.isRequired,
};
