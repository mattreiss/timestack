import { Composition, Folder, getInputProps } from 'remotion';
import ImageEffects from './compositions/Effects/ImageEffects';
import VideoEffects from './compositions/Effects/VideoEffects';
import FramesToVideo from './compositions/Convert/FramesToVideo';
import VideoToFrames from './compositions/Convert/VideoToFrames';
import Lighten from './compositions/Stack/Lighten';
import Slice from './compositions/Stack/Slice';
import StackImages from './compositions/Stack/StackImages';

export const RemotionVideo: React.FC = () => {
	const {
		fps,
		width,
		height,
		durationInFrames
	} = getInputProps();
	const props = {
		fps,
		width,
		height,
		durationInFrames
	};
	return (
		<>
			<Folder name="Stack">
				{/** stack images together with lighten blendMode */}
				<Composition
					id="Lighten"
					component={Lighten}
					{...props}
				/>
				{/** stack images together by slices */}
				<Composition
					id="Slice"
					component={Slice}
					{...props}
				/>
				{/** stack images together using input.json */}
				<Composition
					id="StackImages"
					component={StackImages}
					{...props}
				/>
			</Folder>

			<Folder name="Effects">
				{/** apply effects to images */}
				<Composition
					id="ImageEffects"
					component={ImageEffects}
					{...props}
				/>

				{/** apply effects to video */}
				<Composition
					id="VideoEffects"
					component={VideoEffects}
					{...props}
				/>
			</Folder>

			<Folder name="Convert">
				{/** render frames as video */}
				<Composition
					id="FramesToVideo"
					component={FramesToVideo}
					{...props}
				/>

				{/** render video */}
				<Composition
					id="VideoToFrames"
					component={VideoToFrames}
					{...props}
				/>
			</Folder>
		</>
	);
};
