export const base_url: any = process.env.NEXT_PUBLIC_BASE_URL;

// auth urls [done]
export const authRegister: any = `${base_url}/auth/register`;
export const authLogin: any = `${base_url}/auth/login`;
export const authSendResetPasswordMail: any = `${base_url}/auth/sendResetPasswordMail`;
export const authResetPassword: any = `${base_url}/auth/resetPassword`;
export const authLogout: any = `${base_url}/auth/logout`;

// iamge urls [done]
export const logo = `/logo.png`;
export const rate = `/fees.svg`;
export const question = `/question.svg`;
export const about = `/about-us.svg`;

// country and state json files [done]
export const countryJson = `./publicdata/countries+states.json`;