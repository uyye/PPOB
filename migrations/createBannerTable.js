const pool = require("../config/db");

(async () => {
  try {
    const create_banners = `
            create table if not exists "Banners"(
                "id" serial primary key,
                "banner_name" varchar(100) not null,
                "banner_image" text not null,
                "description" text,
                "created_at" timestamp default current_timestamp,
                "updated_at" timestamp default current_timestamp
            );
        `;

    const drop_banners = `
            drop table if exists "Banners"
        `;

    await pool.query(drop_banners);
    await pool.query(create_banners);

    console.log("TABLE BANNERS CREATED");
  } catch (error) {
    console.log(error);
  }
})();
