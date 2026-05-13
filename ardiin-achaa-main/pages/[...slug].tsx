// @ts-nocheck
import dynamic from "next/dynamic";

const NextClientApp = dynamic(() => import("../src/NextClientApp"), {
  ssr: false,
});

export default function CatchAllPage() {
  return <NextClientApp />;
}
