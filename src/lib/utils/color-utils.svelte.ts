import { FastAverageColor } from 'fast-average-color';
import chroma, {type Color} from 'chroma-js';

const fac = new FastAverageColor();



const waitForImageToLoad = async (image: HTMLImageElement) => {
  return new Promise((resolve) => {
    image.addEventListener('load', () => {
      resolve(true);
    });
  });
}
export const getAverageImageColor = async (cssBackground: string): Promise<Color> => {
  // Background can be either an image in the format of url() or a linear-gradient
  if (cssBackground.startsWith('url')) {

    // Get the image URL
    const justImage = cssBackground.replace(/url\((.*)\)/, '$1');

    const image = new Image();
    image.src = justImage;
    image.crossOrigin = 'anonymous';

    await waitForImageToLoad(image);
    const color = await fac.getColorAsync(image);
    return chroma(color.hex)
  }

  console.log('not an image, returning white')
  return chroma('white');
};