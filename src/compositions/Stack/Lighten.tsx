import { useRef, useState } from "react";
import { Img, useCurrentFrame, staticFile, useVideoConfig, getInputProps, delayRender, continueRender, AbsoluteFill } from "remotion";

type LightenProps = {
  isReverse?: boolean;
};

const Lighten = ({ isReverse }: LightenProps) => {
  const { 
    path,
    prefix,
    start,
    ext,
    stackLength
  } = getInputProps<{
    path: string;
    prefix: string;
    start: number;
    ext: string;
    stackLength: number;
  }>();
  const { 
    durationInFrames, 
    width, 
    height 
  } = useVideoConfig();
  const frame = useCurrentFrame();

  const [handle] = useState(() => delayRender());
  const stack = [];
 
  const framesToRender = [frame];
  for (let i = 1; i <= stackLength / 2; i++) {
    if (frame - i < 0) break;
    if (frame + i >= durationInFrames) break;
    framesToRender.unshift(frame - i);
    framesToRender.push(frame + i);
  }
  framesToRender.sort((a, b) => a - b);
  console.log("frame", frame, "framesToRender", framesToRender);

  const framesLoaded = useRef(0);

  const files = [];
  for (let i = 0; i < framesToRender.length; i++) {
    const frameToRender = framesToRender[i];
    const file = `${path}/${prefix}${start + frameToRender}.${ext}`;
    files.push(file);
    const progress = isReverse ? (framesToRender.length - i) : (i + 1);
    const percent = progress / framesToRender.length;
    stack.push(
      <Img 
        key={frameToRender}
        src={staticFile(file)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width,
          height,
          objectFit: 'contain',
          mixBlendMode: 'lighten',
          opacity: frame === 0 ? 1 : percent
        }}
        onLoad={() => {
          framesLoaded.current++;
          if (framesLoaded.current >= framesToRender.length) {
            setTimeout(() => {
              continueRender(handle);
            }, 3000);
          }
        }}
      />
    )
  }
  console.log("files", files);
  return (
    <AbsoluteFill style={{ 
      backgroundColor: "black",
    }}>
      {stack}
    </AbsoluteFill>
  );
}

export default Lighten;