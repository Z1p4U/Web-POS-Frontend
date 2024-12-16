import { tailChase } from "ldrs";
tailChase.register();

const Loader = () => {
  return (
    <div className=" h-1/2 flex justify-center items-center">
      <l-tail-chase size="40" speed="1.75" color="#002d5d"></l-tail-chase>
    </div>
  );
};

export default Loader;
