const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");

module.exports = {
    fileUpload: async (file, folder = "Musics") => {
        try {
            if (!file || !file.name) return null;

            const fileExtension = file.name.split(".").pop().toLowerCase();
            const allowedExtensions = {
                Musics: ["mp3", "wav"],
            };

            if (!allowedExtensions[folder]?.includes(fileExtension)) {
                throw new Error(`Invalid file type. Allowed types: ${allowedExtensions[folder].join(", ")}`);
            }

            // Generate a unique file name
            const name = `${uuid()}.${fileExtension}`;
            const filePath = path.join(__dirname, "..", "public", folder, name);

            // Ensure the folder exists
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // Move the file to the destination
            await file.mv(filePath);

            // Return the relative path to the uploaded file
            return `/${folder}/${name}`;
        } catch (error) {
            console.error("Error during file upload:", error);
            return null;
        }
    },

    bannerImageUpload: async (file, folder = "Banners ") => {
        try {
            if (!file || !file.name) return null;

            const fileExtension = file.name.split(".").pop().toLowerCase();

            // Generate a unique file name
            const name = `${uuid()}.${fileExtension}`;
            const filePath = path.join(__dirname, "..", "public", folder, name);

            // Ensure the folder exists
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // Move the file to the destination
            await file.mv(filePath);

            // Return the relative path to the uploaded file
            return `/${folder}/${name}`;
        } catch (error) {
            console.error("Error during file upload:", error);
            return null;
        }
    },

    userImageUpload: async (file, folder = "Users") => {
        try {
            if (!file || !file.name) return null;

            const fileExtension = file.name.split(".").pop().toLowerCase();

            // Generate a unique file name
            const name = `${uuid()}.${fileExtension}`;
            const filePath = path.join(__dirname, "..", "public", folder, name);

            // Ensure the folder exists
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // Move the file to the destination
            await file.mv(filePath);

            // Return the relative path to the uploaded file
            return `/${folder}/${name}`;
        } catch (error) {
            console.error("Error during file upload:", error);
            return null;
        }
    },
};
