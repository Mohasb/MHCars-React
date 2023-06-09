import CryptoJS from "crypto-js";

export default function authHeader() {
  const secretKeyCripto = "Muhammad";
  if (localStorage.getItem("_ughVjkKj")) {
    const encrypt = localStorage.getItem("_ughVjkKj");
    const decrypt = CryptoJS.AES.decrypt(
      encrypt.toString(),
      secretKeyCripto
    ).toString(CryptoJS.enc.Utf8);

    const getUser = () => {
      //firefox and chrome don´t work the same with cryptojs(chrome remove \ automatic and firefox no)
      if (typeof JSON.parse(decrypt) === "string") {
        //Firefox
        return JSON.parse(JSON.parse(decrypt));
      } else {
        //Chrome
        return JSON.parse(decrypt);
      }
    };
    const user = getUser();
    console.log(user);

    if (user && user.token) {
      return "Bearer " + user.token;
    } else {
      return {};
    }
  }
}
