export const invalidLoginCases = [
  { username: process.env.SAUCE_USERNAME!, password: "yanlis_sifre", label: "yanlis sifre" },
  { username: "olmayan_kullanici", password: process.env.SAUCE_PASSWORD!, label: "olmayan kullanici" },
  { username: "locked_out_user", password: process.env.SAUCE_PASSWORD!, label: "kilitli kullanici" },
];