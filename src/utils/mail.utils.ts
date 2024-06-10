import nodemailer from 'nodemailer';
import ApiError from '@/utils/error.utils';
import getTemplateComponents from './template.utils';
import type { EnumVar } from '@/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = async (
  email: string,
  templateName: EnumVar.Email_Type,
  payload: any
) => {
  try {
    const temp = getTemplateComponents(templateName, payload);
    if (!temp) throw new Error('Email template not found');
    const { subject, html } = temp;
    await transporter.sendMail({
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error: any) {
    throw ApiError.internalError(error.message);
  }
};

export default sendEmail;
