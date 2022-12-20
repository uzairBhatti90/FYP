import { showMessage } from "react-native-flash-message";
import React from "react";
import Toast from "react-native-simple-toast";
import { FlashMessage } from "../../components/gerenal/flashMessage";
const showError = (message) => {
    Toast.show(message)
}

const showSuccess = (message) => {
    Toast.show(message)
}

export {
    showError,
    showSuccess
}