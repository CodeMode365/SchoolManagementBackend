import sharp from 'sharp';
import { vars } from '@/config';

const s = vars.sharp;

const compression_level = parseInt(s.compression_level);
const height = parseInt(s.image_height);
const width = parseInt(s.image_width);
const fit = s.image_fit;

const compressImage = async (data: any) => {
  const d = await sharp(data)
    .resize({
      height,
      width,
      fit,
    })
    .webp({ quality: compression_level })
    .toBuffer();
  return d;
};

export default { compressImage };
