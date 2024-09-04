import { getInputProps } from "remotion";
import Lighten from "./Lighten";
import Slice from "./Slice";

const StackImages: React.FC = () => {
  const { stackMode } = getInputProps();
  switch (stackMode) {
    case 'slice':  return <Slice />;
    case 'lighten': return <Lighten />;
    case 'reverse-lighten':
    default: return <Lighten isReverse />;
  }
};

export default StackImages;