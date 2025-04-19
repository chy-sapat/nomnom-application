import { Cloudinary } from "@cloudinary/url-gen";

export const cid = new Cloudinary({
    cloud: {
        cloudName: 'dlisangy4'
    },
    url: {
        secure: true
    }
})