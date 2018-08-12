exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {id: 1, name: 'some guy', email: 'test1@gmail.com'},
                {id: 2, name: 'some girl', email: 'test2@gmail.com'},
                {id: 3, name: 'some else', email: 'test3@gmail.com'},
            ]);
        });
};
