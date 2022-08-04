import { Sequence, Img, useCurrentFrame, staticFile, useVideoConfig, getInputProps } from "remotion";

const Images: React.FC = () => {
  let { 
    path,
    prefix,
    start,
    ext,
    stackLength
  } = getInputProps();
  const { 
    fps, 
    durationInFrames, 
    width, 
    height 
  } = useVideoConfig();
  const frame = useCurrentFrame();
  const startTime = 0;
  const startFrame = startTime * fps;

  const renderStackedImages = () => {
    const stack: any = [];
    const firstI = Math.max(0, frame - stackLength);
    for (let i = firstI; i <= frame; i++) {
      const file = `${path}/${prefix}${start + i}.${ext}`;
      const percent = (i - firstI) / stackLength;
      stack.push(
        <Img 
          key={i}
          src={staticFile(file)}
          style={{
            position: 'fixed',
            width,
            height,
            objectFit: 'contain',
            mixBlendMode: 'lighten',
            opacity: percent
          }}
        />
      )
    }
    return stack;
  }

  return (
    <Sequence name='images' from={startFrame} durationInFrames={durationInFrames}>
      <div style={{ 
        backgroundColor: "black",
        display: 'flex',
        flex: 1,
      }}>
        {renderStackedImages()}
      </div>
    </Sequence>
  );
};

export default Images;