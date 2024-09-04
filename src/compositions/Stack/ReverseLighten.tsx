import { Img, useCurrentFrame, staticFile, useVideoConfig, getInputProps } from "remotion";

const ReverseLighten = () => {
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
  const stack = [];
 
  const framesToRender = [frame];
  for (let i = 1; i <= stackLength; i++) {
    if (frame - i < 0) break;
    if (frame + i >= durationInFrames) break;
    framesToRender.unshift(frame - i);
    framesToRender.push(frame + i);
  }

  for (let i = 0; i < framesToRender.length; i++) {
    const frameToRender = framesToRender[i];
    const file = `${path}/${prefix}${start + frameToRender}.${ext}`;
    const percent = (framesToRender.length - i) / framesToRender.length;
    stack.push(
      <Img 
        key={frameToRender}
        src={staticFile(file)}
        style={{
          position: 'fixed',
          width,
          height,
          objectFit: 'contain',
          mixBlendMode: 'lighten',
          opacity: frame === 0 ? 1 : percent
        }}
      />
    )
  }
  return (
    <div style={{ 
      backgroundColor: "black",
      display: 'flex',
      flex: 1,
    }}>
      {stack}
    </div>
  );
}

export default ReverseLighten;