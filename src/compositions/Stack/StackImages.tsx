import { getInputProps } from "remotion";
import Lighten from "./Lighten";
import Slice from "./Slice";
import ReverseLighten from "./ReverseLighten";

const StackImages: React.FC = () => {
  const { stackMode } = getInputProps();
  switch (stackMode) {
    case 'slice':  return <Slice />;
    case 'lighten': return <Lighten />;
    case 'reverse-lighten':
    default: return <ReverseLighten />;
  }
};

export default StackImages;