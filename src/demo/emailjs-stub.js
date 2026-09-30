// Modo demo: sustituye a @emailjs/browser (ver vite.config.ts) para no enviar correos reales.
const ok = () => Promise.resolve({ status: 200, text: "OK" });

export const init = () => undefined;
export const send = ok;
export const sendForm = ok;

export default { init, send, sendForm };
