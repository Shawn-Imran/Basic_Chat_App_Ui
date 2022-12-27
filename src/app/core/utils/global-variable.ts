import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  loginToken: 'FELNATECH_TOKEN_' + environment.VERSION,
  loggInSession: 'FELNATECH_SESSION_' + environment.VERSION,
  loginTokenAdmin: 'FELNATECH_ADMIN_TOKEN_' + environment.VERSION,
  loggInSessionAdmin: 'FELNATECH_ADMIN_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'FELNATECH_USER_0_' + environment.VERSION,
  encryptUserLogin: 'FELNATECH_USER_1_' + environment.VERSION,
  loginAdminRole: 'FELNATECH_ADMIN_ROLE_' + environment.VERSION,
  cartsProduct: 'FELNATECH_USER_CART_' + environment.VERSION,
  otpCheck: 'FELNATECH_USER_OTPCHECK_' + environment.VERSION,
  productFormData: 'FELNATECH_PRODUCT_FORM_' + environment.VERSION,
  userCart: 'FELNATECH_USER_CART_' + environment.VERSION,
  recommendedProduct: 'FELNATECH_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'FELNATECH_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'FELNATECH_COOKIE_TERM' + environment.VERSION,
});
