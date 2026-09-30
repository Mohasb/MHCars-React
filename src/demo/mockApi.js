// Modo demo: sustituye al backend (GestorAlquilerApi) interceptando window.fetch.
// Solo se carga en modo demo (vite --mode demo) (ver main.jsx). Las respuestas imitan
// el formato real de la API .NET. Los datos viven en memoria y se pierden al recargar.
import { baseUrl } from "../Services/baseUrl";
import branchesSeed from "./data/branches.json";
import carsSeed from "./data/cars.json";

import CryptoJS from "crypto-js";
import { DEMO_USER } from "./users";

const PRICES = { A: 55, B: 45, C: 35, D: 35 };
const FAKE_HASH = "$2a$11$demo.demo.demo.demo.demo.demo.demo.demo.demo.demo";

const clone = (o) => JSON.parse(JSON.stringify(o));
const pad = (n) => String(n).padStart(2, "0");
// Formatos de fecha que devuelve .NET: "2024-01-01T15:00:00" y "dd/MM/yyyy HH:mm"
const toNet = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
const toEs = (d) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
const daysFromNow = (days, hour) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
};
const mask = (acc = "") => "*".repeat(Math.max(acc.length - 4, 0)) + acc.slice(-4);

// ---------- Datos de ejemplo (usuarios ficticios) ----------
const db = {
  branches: clone(branchesSeed),
  cars: clone(carsSeed),
  clients: [
    // Sin usuarios Admin: la zona de administración no está disponible en la demo
    { id: 1, registration: "00000000T", name: "Ana", lastName: "Ejemplo", email: "ana@example.com", pwd: "Demo1234", phoneNumber: 600000001, bankAccount: "ES0000000000000000001111", rol: "User", image: "" },
    { id: 2, registration: "00000001R", name: "Usuario", lastName: "Demo", email: DEMO_USER.email, pwd: DEMO_USER.password, phoneNumber: 600000002, bankAccount: "ES0000000000000000002222", rol: "User", image: "" },
    { id: 3, registration: "00000002W", name: "Pablo", lastName: "Ejemplo", email: "pablo@example.com", pwd: "Demo1234", phoneNumber: 600000003, bankAccount: "ES0000000000000000003333", rol: "User", image: "" },
    { id: 4, registration: "00000003A", name: "Marta", lastName: "Prueba", email: "marta@example.com", pwd: "Demo1234", phoneNumber: 600000004, bankAccount: "ES0000000000000000004444", rol: "User", image: "" },
  ],
  reservations: [
    { id: 1, startDate: toNet(daysFromNow(7, 10)), endDate: toNet(daysFromNow(12, 10)), carCategory: "A", branchId: 1, returnBranchId: 1, clientId: 2, carId: 8 },
    { id: 2, startDate: toNet(daysFromNow(20, 12)), endDate: toNet(daysFromNow(23, 18)), carCategory: "B", branchId: 2, returnBranchId: 1, clientId: 2, carId: carsSeed.find((c) => c.branchId === 2 && c.category === "B").id },
    { id: 3, startDate: toNet(daysFromNow(3, 9)), endDate: toNet(daysFromNow(6, 9)), carCategory: "A", branchId: 3, returnBranchId: 3, clientId: 3, carId: carsSeed.find((c) => c.branchId === 3 && c.category === "A").id },
  ],
};
const nextId = (list) => Math.max(0, ...list.map((x) => x.id)) + 1;

// Formato de ClientDTO / Client tal y como lo serializa la API
const clientDto = (c, { masked = false } = {}) => ({
  id: c.id,
  registration: c.registration,
  name: c.name,
  lastName: c.lastName,
  email: c.email,
  password: FAKE_HASH,
  phoneNumber: c.phoneNumber,
  bankAccount: masked ? mask(c.bankAccount) : c.bankAccount,
  rol: c.rol,
  image: c.image,
});

// ---------- Utilidades de respuesta ----------
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });
const text = (body, status) => new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });
const noContent = () => new Response(null, { status: 204 });
const problem = (detail, status = 500) => json({ title: detail, status }, status);

// ---------- Rutas ----------
const routes = [
  // Autenticación
  ["POST", /^custom\/login$/, (_, body) => {
    const user = db.clients.find((c) => c.email?.toLowerCase() === body.email?.toLowerCase());
    if (!user) return json({ statusCode: 404, isOk: false, responseText: "Usuario no encontrado" });
    if (user.pwd !== body.password) return json({ statusCode: 404, isOk: false, responseText: "El password no es correcto" });
    const { password, ...rest } = clientDto(user, { masked: true });
    return json({ statusCode: 200, isOk: true, userWithToken: { ...rest, token: "demo-token" } });
  }],

  // Endpoints propios
  ["GET", /^custom\/getcarsavailables\/(\d+)\/([^/]+)\/([^/]+)\/(\d+)$/, ([branchId, start, end]) => {
    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);
    const busy = new Set(
      db.reservations
        .filter((r) => new Date(r.startDate) <= endDate && new Date(r.endDate) >= startDate)
        .map((r) => r.carId)
    );
    const seen = new Set();
    const cars = db.cars
      .filter((c) => c.branchId === +branchId && !busy.has(c.id))
      .filter((c) => (seen.has(c.model) ? false : seen.add(c.model)))
      .map((c) => ({ ...c, branch: null }));
    return json(cars);
  }],
  ["GET", /^custom\/getreservationbyclient\/(\d+)$/, ([id]) => {
    const now = new Date();
    const branchName = (bid) => db.branches.find((b) => b.id === bid)?.name;
    const reservations = db.reservations
      .filter((r) => r.clientId === +id && new Date(r.startDate) >= now)
      .map((r) => ({
        id: r.id,
        pickUpBranch: branchName(r.branchId),
        startDate: toEs(new Date(r.startDate)),
        returnBranch: branchName(r.returnBranchId),
        endDate: toEs(new Date(r.endDate)),
      }));
    if (!reservations.length)
      return json({ statusCode: 404, isOk: false, responseText: `There are no reservations for user with id:${id}` });
    return json({ statusCode: 200, isOk: true, reservations });
  }],
  ["GET", /^custom\/carsbybranch\/(\d+)$/, ([id]) => json(db.cars.filter((c) => c.branchId === +id).map(({ price, ...c }) => c))],
  ["PUT", /^custom\/updatepwd\/(\d+)$/, ([id], body) => {
    const c = db.clients.find((x) => x.id === +id);
    if (!c || body.id !== +id) return json({ statusCode: 400, isOk: false });
    c.pwd = body.password;
    return json({ statusCode: 200, isOk: true, client: { ...clientDto(c), reservations: null } });
  }],

  // Sucursales
  ["GET", /^branches$/, () => json(db.branches)],
  ["GET", /^branches\/(\d+)$/, ([id]) => {
    const b = db.branches.find((x) => x.id === +id);
    return b ? json(b) : problem(`There is no Branch with id:${id}`);
  }],
  ["POST", /^branches$/, (_, body) => {
    if (db.branches.some((b) => b.cif === body.cif))
      return text(`Problem adding Branch. There is already an Branch with Cif = '${body.cif}'.`, 400);
    const branch = { ...body, id: nextId(db.branches) };
    db.branches.push(branch);
    return json({ statusCode: 200, isOk: true, id: branch.id });
  }],
  ["PUT", /^branches\/(\d+)$/, ([id], body) => {
    const i = db.branches.findIndex((b) => b.id === +id);
    if (i < 0) return new Response(null, { status: 404 });
    db.branches[i] = { ...db.branches[i], ...body, id: +id };
    return noContent();
  }],
  ["DELETE", /^branches\/(\d+)$/, ([id]) => {
    db.branches = db.branches.filter((b) => b.id !== +id);
    db.cars = db.cars.filter((c) => c.branchId !== +id);
    return noContent();
  }],

  // Coches
  ["GET", /^cars$/, () => json(db.cars.map(({ price, ...c }) => c))],
  ["POST", /^cars$/, (_, body) => {
    if (!PRICES[body.category]) return text(`Category '${body.category}' is invalid. It has to be in: A, B, C or D`, 400);
    if (db.cars.some((c) => c.registration === body.registration))
      return text(`Problem adding Car. There is already a car with registration = '${body.registration}'.`, 400);
    const car = { ...body, id: nextId(db.cars), branchId: +body.branchId, price: PRICES[body.category], branch: null };
    db.cars.push(car);
    return json(car, 201);
  }],
  ["PUT", /^cars\/(\d+)$/, ([id], body) => {
    const i = db.cars.findIndex((c) => c.id === +id);
    if (i < 0) return new Response(null, { status: 404 });
    db.cars[i] = { ...db.cars[i], ...body, id: +id, branchId: +body.branchId || db.cars[i].branchId };
    return noContent();
  }],
  ["DELETE", /^cars\/(\d+)$/, ([id]) => {
    db.cars = db.cars.filter((c) => c.id !== +id);
    return noContent();
  }],

  // Clientes
  ["GET", /^clients$/, () => json(db.clients.map((c) => clientDto(c)))],
  ["GET", /^clients\/(\d+)$/, ([id]) => {
    const c = db.clients.find((x) => x.id === +id);
    return c ? json(clientDto(c, { masked: true })) : problem(`There is no Client with id:${id}`);
  }],
  ["POST", /^clients$/, (_, body) => {
    if (db.clients.some((c) => c.registration === body.registration))
      return json({ statusCode: 400, isOk: false, responseText: "Registration not unique" });
    if (db.clients.some((c) => c.email?.toLowerCase() === body.email?.toLowerCase()))
      return json({ statusCode: 200, isOk: false, responseText: "Email not unique" });
    const c = {
      ...body,
      id: nextId(db.clients),
      pwd: body.password,
      phoneNumber: +body.phoneNumber || 0,
      rol: body.rol || "User",
      image: body.image || "",
    };
    delete c.password;
    db.clients.push(c);
    return json({ statusCode: 200, isOk: true, client: { ...clientDto(c), reservations: null } });
  }],
  ["PUT", /^clients\/(\d+)$/, ([id], body) => {
    const c = db.clients.find((x) => x.id === +id);
    if (!c) return json({ statusCode: 404, isOk: false });
    const { password, bankAccount, ...rest } = body;
    Object.assign(c, rest, { id: +id });
    if (bankAccount && !bankAccount.includes("*")) c.bankAccount = bankAccount;
    return json({ statusCode: 200, isOk: true, client: { ...clientDto(c, { masked: true }), reservations: null } });
  }],
  ["DELETE", /^clients\/(\d+)$/, ([id]) => {
    db.clients = db.clients.filter((c) => c.id !== +id);
    return noContent();
  }],

  // Reservas
  ["GET", /^reservations$/, () =>
    db.reservations.length ? json(db.reservations) : problem("There are no Reservations", 404)],
  ["POST", /^reservations$/, (_, body) => {
    const start = new Date(body.startDate);
    const end = new Date(body.endDate);
    const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
    if (!PRICES[body.carCategory]) return text(`Category '${body.carCategory}' is invalid. It has to be in: A, B, C or D`, 400);
    if (!db.branches.some((b) => b.id === body.branchId)) return text(`there is no branch with id = ${body.branchId}`, 400);
    if (!db.clients.some((c) => c.id === body.clientId)) return text(`there is no customer with id = ${body.clientId}`, 400);
    if (startDay <= new Date()) return text(`The StartDate must be greater than ${new Date().toLocaleString()}.`, 400);
    if (start > end) return text("The End Date must be greater than Start Date.", 400);
    db.reservations.push({
      id: nextId(db.reservations),
      startDate: toNet(start),
      endDate: toNet(end),
      carCategory: body.carCategory,
      branchId: body.branchId,
      returnBranchId: body.returnBranchId,
      clientId: body.clientId,
      carId: body.carId,
    });
    // Igual que en la API: si se devuelve en otra sucursal, el coche pasa a esa sucursal
    if (body.branchId !== body.returnBranchId) {
      const car = db.cars.find((c) => c.id === body.carId);
      if (car) car.branchId = body.returnBranchId;
    }
    return json({ id: 0, ...body });
  }],
  ["DELETE", /^reservations\/(\d+)$/, ([id]) => {
    if (!db.reservations.some((r) => r.id === +id))
      return json({ statusCode: 404, isOk: false, responseText: "There are no reservations/" + id });
    db.reservations = db.reservations.filter((r) => r.id !== +id);
    return json({ statusCode: 200, isOk: true, id: +id });
  }],
];

// ---------- Interceptor ----------
const realFetch = window.fetch.bind(window);
const delay = () => new Promise((r) => setTimeout(r, 150 + Math.random() * 250));

window.fetch = async (input, init = {}) => {
  const url = typeof input === "string" ? input : input.url;
  if (!url.toLowerCase().startsWith(baseUrl.toLowerCase())) return realFetch(input, init);

  const method = (init.method || "GET").toUpperCase();
  const path = url.slice(baseUrl.length).split("?")[0].replace(/\/+$/, "");
  const body = init.body ? JSON.parse(init.body) : {};
  await delay();

  for (const [m, re, handler] of routes) {
    const match = m === method && path.match(new RegExp(re.source, "i"));
    if (match) return handler(match.slice(1).map(decodeURIComponent), body);
  }
  return new Response(null, { status: 404 });
};

// Cada visita empieza con la sesión del usuario demo iniciada, guardada igual que
// en LoginModal (AES con la misma clave).
try {
  sessionStorage.removeItem("_dghVjkKj");
  sessionStorage.removeItem("_bghVjkKj");
  const demo = db.clients.find((c) => c.email === DEMO_USER.email);
  const { password, image, ...session } = { ...clientDto(demo, { masked: true }), token: "demo-token" };
  localStorage.setItem(
    "_ughVjkKj",
    CryptoJS.AES.encrypt(JSON.stringify(JSON.stringify(session)), "Muhammad").toString()
  );
} catch (e) {
  /* almacenamiento no disponible: la demo funciona sin sesión */
}
