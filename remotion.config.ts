
import {Config} from "@remotion/cli/config";

Config.setStillImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setJpegQuality(100);

Config.setConcurrency(1);
Config.setDelayRenderTimeoutInMilliseconds(1280000);
Config.setMuted(true);
Config.setChromiumHeadlessMode(false);
Config.setCachingEnabled(false);
Config.setBrowserExecutable("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");