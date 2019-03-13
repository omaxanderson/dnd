Migrations

To create a new migration, simply run `node create_migration <filename>`. This will automatically create a new skeleton and prepend the timestamp at the start. 

To run the migration, run `node <filename> up`.

@TODO create a better migration system with a single script that will read all the migrations in the directory. It'll check which migrations haven't been run in the database and then just run those in order.
