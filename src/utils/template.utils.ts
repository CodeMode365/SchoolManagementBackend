import fs from 'fs';
import handlebars from 'handlebars';
import { EnumVar } from '@/config';

const { Email_Type } = EnumVar;

const Templates = {
  [Email_Type.ACCOUNT_REGISTRATION]: {
    subject: 'User Registered',
    html: `${__dirname}/../assets/mail_templates/confirm_email.html`,
  },
  [Email_Type.RESET_PASSWORD]: {
    subject: 'Reset Password',
    html: `${__dirname}/../assets/mail_templates/reset_password.html`,
  },
};

const TemplateMapper = (templateType: EnumVar.Email_Type) => {
  const template = Templates[templateType];
  return template;
};

const getTemplateComponents = (templateName: EnumVar.Email_Type, data: any) => {
  const template = TemplateMapper(templateName);
  if (!template) return null;
  const text = fs.readFileSync(template.html, { encoding: 'utf-8' });
  const hTemplate = handlebars.compile(text);
  return {
    subject: template.subject,
    html: hTemplate(data),
  };
};

export default getTemplateComponents;
