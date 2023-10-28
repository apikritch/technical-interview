import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  noPY?: boolean;
};

const Container = (props: Props) => {
  const { children, noPY } = props;

  return (
    <div
      className={`container mx-auto px-4 sm:px-6 md:px-8 relative ${
        noPY ? "" : "py-1 sm:py-3 md:py-5 2xl:py-5"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
