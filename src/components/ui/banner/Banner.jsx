import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Banner = (props) => {
  const { title, path1, path2 } = props;

  return (
    <div className="mb-5 flex flex-col gap-3">
      <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl capitalize tracking-wide font-semibold text-primary">
        {title}
      </h3>
      <p className="text-[#c4c0c0] tracking-wide">
        <Link to={"/"}>Home</Link>
        <span> / </span>

        {path1 ? (
          <>
            <span
              to={`/${path1?.toLowerCase()}`}
              // className={path2 ? "" : "text-primary"}
            >
              {path1}
            </span>
            <span> / </span>
          </>
        ) : (
          <span className="text-primary">{title}</span>
        )}

        {path2 ? (
          <>
            <Link to={`/${path1?.toLowerCase()}/${path2?.toLowerCase()}`}>
              {path2}
            </Link>
            <span> / </span>
            <span className="text-primary">{title}</span>
          </>
        ) : (
          path1 && <span className="text-primary">{title}</span>
        )}
      </p>
    </div>
  );
};

export default Banner;

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  path1: PropTypes.string,
  path2: PropTypes.string,
};
