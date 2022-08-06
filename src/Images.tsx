import { Sequence, Img, useCurrentFrame, staticFile, useVideoConfig, getInputProps } from "remotion";


const Images: React.FC = () => {
  let { 
    path,
    prefix,
    start,
    ext,
    stackLength,
    effect
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

  const renderSlicedImages = () => {
    const stack: any = [];
    const firstI = Math.max(0, frame - stackLength);
    let left = 0;
    for (let i = firstI; i <= frame; i++) {
      const file = `${path}/${prefix}${start + i}.${ext}`;
      const size = Math.min(stackLength, frame);
      const sliceWidth = Math.round(width / size);
      const right = left + sliceWidth;
      stack.push(
        <Img 
          key={i}
          src={staticFile(file)}
          style={{
            position: 'fixed',
            width,
            height,
            objectFit: 'contain',
            clipPath: `inset(0px ${width - right - right}px 0px ${left}px)`
          }}
        />
      );
      left = right;
    }
    return stack;
  }

  const renderImages = () => {
    switch (effect) {
      case 'lighten': return renderStackedImages();
      case 'slice':  return renderSlicedImages();
    }
  }

  return (
    <Sequence name='images' from={startFrame} durationInFrames={durationInFrames}>
      <div style={{ 
        backgroundColor: "black",
        display: 'flex',
        flex: 1,
      }}>
        {renderImages()}
      </div>
    </Sequence>
  );
};

export default Images;