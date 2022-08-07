import { useEffect, useRef, useState } from "react";
import { applyEffects } from '@mattreiss/glfx';
import { useCurrentFrame, staticFile, useVideoConfig, AbsoluteFill, Img, continueRender, delayRender } from "remotion";


const ImageEffects = () => {
  const img = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const {
    durationInFrames, 
    width, 
    height 
  } = useVideoConfig();
  const [handle] = useState(() => delayRender());

  const getFrameString = () => {
    let frameString = `${frame}`;
    const maxLength = `${durationInFrames}`.length;
    while (frameString.length < maxLength) {
      frameString = `0${frameString}`;
    }
    return frameString;
  }
  
  useEffect(() => {
    if (!canvas.current || !img.current) {
      return;
    }
    const context = canvas.current.getContext("2d");
  
    if (!context) {
      return;
    }

    const percent = frame / durationInFrames;
    const effects = [{
      swirl: {
        center: [ width / 2, height / 3.2 ],
        radius: percent * width / 3,
        angle: -Math.PI * 2,
      }
    }];

    const _canvas = applyEffects(img.current, effects);
    _canvas.width = width;
    _canvas.height = height;
    context.drawImage(_canvas, 0, 0, width, height);
    continueRender(handle);
  }, [frame, durationInFrames, width, height, handle]);
  
  return (
    <>
      <AbsoluteFill>
        <Img
          ref={img}
          width={width}
          height={height}
          style={{ 
            opacity: 0,
            width,
            height
          }}
          src={staticFile(`/frames/element-${getFrameString()}.jpeg`)}
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

export default ImageEffects;