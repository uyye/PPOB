const pool = require("../config/db");

(async()=>{
    try {
        const create_services = `
            create table if not exists "Services"(
                "id" serial primary key,
                "service_code" varchar(100) unique not null,
                "service_name" varchar(100) not null,
                "service_icon" text not null,
                "service_tarif" integer not null,
                "created_at" timestamp default current_timestamp,
                "updated_at" timestamp default current_timestamp
            );
        `

        const drop_services = `
            drop table if exists "Services"
        `

        await pool.query(drop_services);
        await pool.query(create_services);
        console.log('SERVICES TABLE CREATED');
        

    } catch (error) {
        console.log(error);
    }
})();