import { Config } from '@remotion/cli/config';

// Rendu WebGL logiciel (pas de GPU dans un conteneur) : "swangle" = SwiftShader via ANGLE.
Config.setChromiumOpenGlRenderer('swangle');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
