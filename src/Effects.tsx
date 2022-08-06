import { useCallback, useEffect, useRef } from "react";
import { applyEffects } from '@mattreiss/glfx';
import { Video, useCurrentFrame, staticFile, useVideoConfig, getInputProps, AbsoluteFill } from "remotion";


const Effects = () => {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // Process a frame
  const onVideoFrame = useCallback(() => {
    if (!canvas.current || !video.current) {
      return;
    }
    const context = canvas.current.getContext("2d");
  
    if (!context) {
      return;
    }

    const _canvas = applyEffects(video.current, [{
      swirl: {
        center: [ width / 2, height / 2 ],
        radius: width / 2,
        angle: -Math.PI * 2,
      }
    }]);
    _canvas.width = width;
    _canvas.height = height;
    context.drawImage(video.current, 0, 0, width, height);
  }, [height, width]);
  
  // Synchronize the video with the canvas
  useEffect(() => {
    const { current } = video;
    if (!current?.requestVideoFrameCallback) {
      return;
    }
  
    let handle = 0;
    const callback = () => {
      onVideoFrame();
      handle = current.requestVideoFrameCallback(callback);
    };
  
    callback();
  
    return () => {
      current.cancelVideoFrameCallback(handle);
    };
  }, [onVideoFrame]);
  
  return (
    <>
      <AbsoluteFill>
        <Video
          ref={video}
          width={width}
          height={height}
          // Hide the original video tag
          style={{ 
            opacity: 0,
            width,
            height
          }}
          startFrom={300}
          src={staticFile('/video/video.mp4')}
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <canvas
          ref={canvas}
          width={width}
          height={height}
        />
      </AbsoluteFill>
    </>
  )
}

export default Effects;