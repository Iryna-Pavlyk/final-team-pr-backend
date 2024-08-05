import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, PUBLIC_DIR } from '../constants/index.js';
import { env } from '../env.js';

const domain = env('CORS_APPROVED_DOMAINS');

const saveFileToPublicDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(PUBLIC_DIR, file.filename),
  );
  return `${domain}/public/${file.filename}`;
};

export default saveFileToPublicDir;
