/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  return knex("recipe")
    .insert({ tarif_adi: "Spagetti Bolonez" })
    .then((idList) => {
      return knex("steps").insert([
        {
          adim_sirasi: 1,
          adim_talimati: "Büyük bir tencereyi orta ateşe koyun",
          tarif_id: idList[0],
        },
        {
          adim_sirasi: 2,
          adim_talimati: "1 yemek kaşığı zeytinyağı ekleyin",
          tarif_id: idList[0],
        },
      ]);
    })
    .then((adimIdList) => {
      return knex("icindekiler")
        .insert({
          icindekiler_adi: "zeytinyağı",
          miktar: 0.014,
        })
        .then((icindekilerIdList) => {
          return knex("içindeki_adimlar").insert([
            { icindekiler_id: icindekilerIdList[0], adim_id: adimIdList[0] },
            { icindekiler_id: icindekilerIdList[0], adim_id: adimIdList[1] },
          ]);
        });
    });
};
