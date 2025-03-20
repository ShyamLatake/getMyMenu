import { toDataURL } from "qrcode";
import {Jimp} from "jimp";

async function generateQRCode(restaurantId) {
  const menuUrl = `http://172.20.10.7:3000/menu/${restaurantId}`;
  const qrCodeUrl = await toDataURL(menuUrl);  // QR Code in base64 format
  return { qrCodeUrl, menuUrl };
}

export default generateQRCode;
