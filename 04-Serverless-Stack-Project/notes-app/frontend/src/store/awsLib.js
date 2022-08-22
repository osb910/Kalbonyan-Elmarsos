import {Storage} from 'aws-amplify';
import {nanoid} from 'nanoid';

export const s3Upload = async file => {
  const filename = `${nanoid()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
};
