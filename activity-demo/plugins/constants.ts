export enum IMG_FORMATS_ENUM {
    png = 'png',
    jpg = 'jpg',
    jpeg = 'jpeg',
    webp = 'webp',
    avif = 'avif',
    gif = 'gif',
}

const imgFormats: string[] = []

for (const key in IMG_FORMATS_ENUM) {
    if (Object.prototype.hasOwnProperty.call(IMG_FORMATS_ENUM, key)) {
        imgFormats.push('.' + IMG_FORMATS_ENUM[key])
    }
}

export const IMG_FORMATS = imgFormats
