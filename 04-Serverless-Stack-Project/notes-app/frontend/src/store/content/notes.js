import config from '../../config';

const maxFileSize = config.MAX_ATTACHMENT_SIZE / (1024 * 1024);

const data = {
  en: {
    create: 'Create',
    attachment: 'Attachment',
    largeFileSize: `Please pick a file smaller than ${maxFileSize} MB.`,
  },
  ar: {
    create: 'أنشئ',
    attachment: 'ملف',
    largeFileSize: `فضلًا أرفق ملفًّا لا يجاوز ${maxFileSize.toLocaleString(
      'ar-EG'
    )} مب.`,
  },
};

export default data;
