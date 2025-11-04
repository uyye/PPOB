const pool = require("../config/db");

(async()=>{
    try {
        const create_users = `
        create table if not exists "Users"(
            "id" serial primary key,
            "email" varchar(100) unique not null,
            "first_name" varchar(100) not null,
            "last_name" varchar(100) not null,
            "password" varchar(100) not null,
            "profile_image" text,
            "balance" integer default 0,
            "created_at" timestamp default current_timestamp,
            "updated_at" timestamp default current_timestamp
        );
    `;

    const drop_users = `
        drop table if exists "Users";
    `

    await pool.query(drop_users);
    await pool.query(create_users);
    console.log('TABLE USER CREATED');
    } catch (error) {
        console.log(error);
        
    }
})

()