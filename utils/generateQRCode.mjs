import { toDataURL } from "qrcode";
import {Jimp} from "jimp";

async function generateQRCode(restaurantId) {
  const url = `http://172.20.10.7:3000/menu/${restaurantId}`;
  const qrCode = await toDataURL(url);

  const qrImage = await Jimp.read(qrCode);

    // // Load a font from Jimp (you can use different fonts)
    // const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);


    // Get image dimensions
    const imageWidth = qrImage.bitmap.width;
    const imageHeight = qrImage.bitmap.height;

    // Add text overlay to the center of the QR code
    qrImage.print(
      font,
      0,
      imageHeight / 2 - 16, // Adjust Y position for centering
      {
        text: restaurantName,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      imageWidth,
      imageHeight
    );

    // Save or convert to Base64
    const qrCodeWithTextPath = `./public/qrCodes/${restaurantName}.png`; 
    await qrImage.writeAsync(qrCodeWithTextPath);

    return qrCodeWithTextPath;
  // return qrCode;
}

export default generateQRCode;
