const pool = require("../config/db");

(async()=>{
    try {
        const create_transactions = `
            create table if not exists "Transactions"(
                "id" serial primary key,
                "user_id" integer references "Users" ("id") on delete cascade on update cascade,
                "service_id" integer references "Services" ("id") on delete cascade on update cascade,
                "invoice_number" varchar(50) unique not null,
                "transaction_type" varchar(50) check ("transaction_type" in ('TOPUP', 'PAYMENT')),
                "description" text,
                "total_amount" integer not null,
                "created_at" timestamp default current_timestamp,
                "updated_at" timestamp default current_timestamp
            );
        `

        const drop_transactions = `
            drop table if exists "Transactions";
        `

        await pool.query(drop_transactions);
        await pool.query(create_transactions);

        console.log('TRANSACTIONS TABLE CREATED');
        
    } catch (error) {
        console.log(error);
    }
})();