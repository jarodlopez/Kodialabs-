// Busca fotos en la carpeta public/ por nombre. Si la foto existe, el sitio la muestra solo.
// Nombres: foto-hero, foto-empresas, foto-personas, foto-digital, foto-galeria-1 ... foto-galeria-6
// Extensiones aceptadas: jpg, jpeg, webp, png (también en mayúsculas).
import { existsSync } from "node:fs";
import { join } from "node:path";

const EXT = ["jpg", "jpeg", "webp", "png", "JPG", "JPEG", "WEBP", "PNG"];

export function foto(nombre) {
  for (const e of EXT) {
    const f = `foto-${nombre}.${e}`;
    if (existsSync(join(process.cwd(), "public", f))) return "/" + f;
  }
  return null;
}

export function galeria(max = 6) {
  const out = [];
  for (let i = 1; i <= max; i++) {
    const f = foto(`galeria-${i}`);
    if (f) out.push(f);
  }
  return out;
}
