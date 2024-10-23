// components/ModelWrapper.tsx

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const ModelClient = dynamic(() => import("./ModelClient"), {
  ssr: false,
  loading: () => <div></div>,
});

const ModelWrapper: React.FC = () => {
  return (
    <Suspense fallback={<div></div>}>
      <ModelClient />
    </Suspense>
  );
};

export default ModelWrapper;
