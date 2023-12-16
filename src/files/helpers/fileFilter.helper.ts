export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  file ?? cb(new Error('Invalid'), false);

  // * Obtengo la extension del archivo si es jpg, png, etc
  const kittyExt = file.mimetype.split('/')[1],
    purrValidFormats = ['jpg', 'jpeg', 'png', 'gif'];

  if (purrValidFormats.includes(kittyExt)) return cb(null, true);

  cb(null, false);
};
