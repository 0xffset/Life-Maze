import "./KatexEquation.scss";

import * as React from "react";

import katex from "katex";

interface KatexEqProps {
  children: string;
}

const KatexEq: React.FC<KatexEqProps> = ({ children }) => {
  const eq = katex.renderToString(children?.toString() || "", {
    throwOnError: false,
  });

  return <span className="eq" dangerouslySetInnerHTML={{ __html: eq }} />;
};

export default React.memo(KatexEq);
