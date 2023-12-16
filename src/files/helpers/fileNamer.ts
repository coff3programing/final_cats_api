import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  // * Obtengo la extension del archivo si es jpg, png, etc
  const kittyExt = file.mimetype.split('/')[1],
    MeowExtensionNamer = `${uuid()}.${kittyExt}`;

  cb(null, MeowExtensionNamer);
};
