/** واتساب المتجر — نفس الرقم في الشريط والفوتر وصفحات الدعم */
export const SAUDI_WA_E164 = "966501234567";

export function metroWhatsAppUrl(prefillMessage = "") {
  const base = `https://wa.me/${SAUDI_WA_E164}`;
  if (!prefillMessage || typeof prefillMessage !== "string") return base;
  return `${base}?text=${encodeURIComponent(prefillMessage)}`;
}
