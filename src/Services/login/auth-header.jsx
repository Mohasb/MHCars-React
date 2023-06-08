import CryptoJS from "crypto-js";

export default function authHeader() {
  const secretKeyCripto = "Muhammad";
  const encrypt = localStorage.getItem("_ughVjkKj");
  const decrypt = CryptoJS.AES.decrypt(
    encrypt.toString(),
    secretKeyCripto
  ).toString(CryptoJS.enc.Utf8);

  const user = JSON.parse(JSON.parse(decrypt));
  if (user && user.token) {
    return "Bearer " + user.token;
  } else {
    return {};
  }
}
