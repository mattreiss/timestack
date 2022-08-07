import { useCurrentFrame, staticFile, useVideoConfig, AbsoluteFill, Img } from "remotion";


const FramesToVideo = () => {
  const frame = useCurrentFrame();
  const {
    durationInFrames, 
    width, 
    height 
  } = useVideoConfig();

  const getFrameString = () => {
    let frameString = `${frame}`;
    const maxLength = `${durationInFrames}`.length;
    while (frameString.length < maxLength) {
      frameString = `0${frameString}`;
    }
    return frameString;
  }
  
  return (
    <AbsoluteFill>
      <Img
        width={width}
        height={height}
        style={{
          width,
          height
        }}
        src={staticFile(`/frames/element-${getFrameString()}.jpeg`)}
      />
    </AbsoluteFill>
  )
}

export default FramesToVideo;