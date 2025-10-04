import React, { useEffect } from "react";

const withLogger = (WrappedComponent, name) => {
  return (props) => {
    useEffect(() => {
      console.log(`${name} mounted`);
      return () => console.log(`${name} unmounted`);
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withLogger;