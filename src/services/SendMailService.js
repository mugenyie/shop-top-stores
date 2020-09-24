import { sendGridEmail } from 'react-native-sendgrid';

const SENDGRIDAPIKEY = "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";
const FROMEMAIL = "app@shoptopstores.com";
const TOMEMAIL = "shoptopstores@gmail.com";

export const SendMail = async (ProductDetailBody, userEmail) => {
    let SUBJECT = `NEW ORDER: [${userEmail}]`;
    sendGridEmail(SENDGRIDAPIKEY, TOMEMAIL, FROMEMAIL, SUBJECT, ProductDetailBody);
}