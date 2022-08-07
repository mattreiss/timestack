import { useCallback, useEffect, useRef, useState } from "react";
import { applyEffects } from '@mattreiss/glfx';
import { Video, useCurrentFrame, staticFile, useVideoConfig, AbsoluteFill, delayRender, continueRender, spring } from "remotion";

const VideoEffects = () => {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const { 
    durationInFrames, 
    width, 
    height,
    fps
  } = useVideoConfig();
  const [handle] = useState(() => delayRender());

  // Process a frame
  const onVideoFrame = useCallback(() => {
    if (!canvas.current || !video.current) {
      return;
    }
    const context = canvas.current.getContext("2d");
  
    if (!context) {
      return;
    }
    const percent = frame / durationInFrames;

    const angle = spring({
      fps,
      from: 0,
      to:  -Math.PI * 2,
      frame,
      durationInFrames,
    });
    const radius = spring({
      fps,
      from: 0,
      to: width / 3,
      frame,
      durationInFrames,
    });
    const _canvas = applyEffects(video.current, [{
      swirl: {
        center: [ width / 2, height / 3.5 ],
        radius,
        angle,
      },
      brightnessContrast: {
          brightness: -0.1 * percent,
          contrast:  0,
      }
    }]);
    _canvas.width = width;
    _canvas.height = height;
    context.drawImage(_canvas, 0, 0, width, height);
    continueRender(handle);
  }, [height, width, frame, durationInFrames, handle, fps]);
  
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
          style={{ 
            opacity: 0,
            width,
            height
          }}
          startFrom={0}
          src={staticFile('/video.mp4')}
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

export default VideoEffects;