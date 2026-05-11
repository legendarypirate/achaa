// @ts-nocheck
import dynamic from "next/dynamic";

const NextClientApp = dynamic(() => import("../src/NextClientApp"), {
  ssr: false,
});

const CatchAllPage = () => {
  return <NextClientApp />;
};

export default CatchAllPage;
