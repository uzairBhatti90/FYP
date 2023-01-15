
import { storage } from "./firebaseConfig";



const uploadImage = async image => {
    if (image == null) {
        return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => { });

    try {
        await task;
        const url = await storageRef.getDownloadURL();
        return url;
    } catch (e) {
        return null;
    }

};


export const FBaps = {
    uploadImage
}