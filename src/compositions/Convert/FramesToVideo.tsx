import { getInputProps, useCurrentFrame, staticFile, useVideoConfig, AbsoluteFill, Img } from "remotion";

const FramesToVideo = () => {
  const frame = useCurrentFrame();
  const {
    durationInFrames, 
    width, 
    height,
  } = useVideoConfig();

  const { animation } = getInputProps();

  const getFrameString = () => {
    let frameString = `${frame}`;
    const maxLength = `${durationInFrames}`.length;
    while (frameString.length < maxLength) {
      frameString = `0${frameString}`;
    }
    return frameString;
  }

  // default position
  let x = 0;
  let y = 0;
  let w = width;
  let h = height;

  const _frame = durationInFrames - frame;

  switch (animation) {
    case "zoom-in":
      x -= frame;
      w = width + frame + frame;
      h = w * height / width;
      y -= frame;
      break;
    case "zoom-out":
      x -= _frame;
      w = width + _frame + _frame;
      h = w * height / width;
      y -= _frame;
      break;
    default:
      break;
  }
  
  return (
    <AbsoluteFill>
      <Img
        style={{
          position: 'absolute',
          top: y || 0,
          left: x || 0,
          width: w,
          height: h,
        }}
        src={staticFile(`/frames/element-${getFrameString()}.png`)}
      />
    </AbsoluteFill>
  )
}

export default FramesToVideo;