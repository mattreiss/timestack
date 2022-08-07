import { getInputProps } from "remotion";
import Lighten from "./Lighten";
import Slice from "./Slice";

const StackImages: React.FC = () => {
  const { stackMode } = getInputProps();
  switch (stackMode) {
    case 'slice':  return <Slice />;
    case 'lighten':
    default: return <Lighten />;
  }
};

export default StackImages;