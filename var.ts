export const base_url: any = process.env.NEXT_PUBLIC_BASE_URL;


// auth urls [done]
export const authRegister: any = `${base_url}/auth/register`;
export const authLogin: any = `${base_url}/auth/login`;
export const authSendResetPasswordMail: any = `${base_url}/auth/sendResetPasswordMail`;
export const authResetPassword: any = `${base_url}/auth/resetPassword`;
export const authLogout: any = `${base_url}/auth/logout`;