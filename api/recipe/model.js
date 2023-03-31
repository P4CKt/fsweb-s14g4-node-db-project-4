const db = require("../../data/db-config");

const tarifleriGetir = async function (adim_id) {
  const icindekiler = await db("icindekiler_adimlar as ia")
    .leftJoin("icindekiler as i", "ia.icindekiler_id", "i.icindekiler_id")
    .select("i.*")
    .where("adim_id", adim_id);
  return icindekiler;
};

const idyeGoreTarifGetir = async function (tarif_id) {};

module.exports = { idyeGoreTarifGetir, tarifleriGetir };
