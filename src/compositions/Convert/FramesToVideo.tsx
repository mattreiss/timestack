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

  const pct = 0.5;
  const deltaFromEnd = (durationInFrames - frame) * pct;
  const deltaFromStart = frame * pct;

  switch (animation) {
    case "zoom-in":
      x -= deltaFromStart;
      w = width + deltaFromStart + deltaFromStart;
      h = w * height / width;
      y -= deltaFromStart;
      break;
    case "zoom-out":
      x -= deltaFromEnd;
      w = width + deltaFromEnd + deltaFromEnd;
      h = w * height / width;
      y -= deltaFromEnd;
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
        src={staticFile(`/frames/element-${getFrameString()}.jpeg`)}
      />
    </AbsoluteFill>
  )
}

export default FramesToVideo;