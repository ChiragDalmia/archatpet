import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline/next"), {
  ssr: false,
});

const Cloud = () => {
  return (
    <div className="h-full w-full absolute flex">
      <Spline scene="https://prod.spline.design/SyoLbFZJkjDcLi-I/scene.splinecode" />
    </div>
  );
};

export default Cloud;
