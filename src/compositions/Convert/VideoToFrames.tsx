import { Video, staticFile, useVideoConfig, AbsoluteFill } from "remotion";

const VideoToFrames = () => {
  const {
    width, 
    height 
  } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Video
        width={width}
        height={height}
        style={{
          width,
          height
        }}
        startFrom={0}
        src={staticFile('/video.mp4')}
      />
    </AbsoluteFill>
  )
}

export default VideoToFrames;