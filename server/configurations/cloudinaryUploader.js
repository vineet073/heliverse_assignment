const cloudinary=require('cloudinary').v2;

require('dotenv').config();
exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
	} catch (error) {
		throw new Error(error.message);
	}
};
exports.cloudinaryUploader=async(file,folder,quality)=>{
    const options={folder};

    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";

    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
