const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})


exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Falha na conexão
        console.log('Conectado com o ID' + connection.threadId);

        connection.query('SELECT * FROM item WHERE status = "ativo"', (err, rows) => {

            if(!err){
                let removeditem = req.body.removed
                res.render('home', { rows, removeditem });
            } else{
                console.log(err)
            }

            console.log('Dados: \n', rows)
        });
    });
}

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Falha na conexão
        console.log('Conectado com o ID' + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT * FROM item WHERE nome LIKE ? OR quantidade LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            connection.release();

            if(!err){
                res.render('home', { rows });
            } else{
                console.log(err)
            }

            console.log('Dados: \n', rows)
        });
    });
}

exports.form = (req, res) => {
    res.render('add-item')
}

exports.create = (req, res) => {
    const { nome, quantidade } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // Falha na conexão
        console.log('Conectado com o ID' + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('INSERT INTO item SET nome = ?, quantidade = ?', [nome, quantidade],(err, rows) => {
            connection.release();

            if(!err){
                res.render('add-item', { alert: 'Item adicionado com sucesso!' });
            } else{
                console.log(err)
            }

            console.log('Dados: \n', rows)
        });
    });
}

exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Falha na conexão
        console.log('Conectado com o ID' + connection.threadId);

        connection.query('SELECT * FROM item WHERE id = ?', [req.params.id],(err, rows) => {
            connection.release();

            if(!err){
                res.render('edit-item', { rows });
            } else{
                console.log(err)
            }

            console.log('Dados: \n', rows)
        });
    });
}

exports.update = (req, res) => {
    const { nome, quantidade } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // Falha na conexão
        console.log('Conectado com o ID' + connection.threadId);

        connection.query('UPDATE item SET nome = ?, quantidade = ? WHERE id = ?', [nome, quantidade, req.params.id],(err, rows) => {
            connection.release();

            if(!err){


                pool.getConnection((err, connection) => {
                    if(err) throw err; // Falha na conexão
                    console.log('Conectado com o ID' + connection.threadId);
            
                    connection.query('SELECT * FROM item WHERE id = ?', [req.params.id],(err, rows) => {
                        connection.release();
            
                        if(!err){
                            res.render('edit-item', { rows, alert: `${nome} foi atualizado!` });
                        } else{
                            console.log(err)
                        }
            
                        console.log('Dados: \n', rows)
                    });
                });



            } else{
                console.log(err)
            }

            console.log('Dados: \n', rows)
        });
    });
}

exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; // Falha na conexão
        console.log('Conectado com o ID' + connection.threadId);
        connection.query('UPDATE item SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
            if (!err) {
              let removedUser = encodeURIComponent('User successeflly removed.');
              res.redirect('/?removed=' + removedUser);
            } else {
              console.log(err);
            }
            console.log('The data from beer table are: \n', rows);
          });
    });
}

// exports.viewhistorico = (req, res) => {
//     res.render('historico')
// }

// exports.create = (req, res) => {
//     const { nome, quantidade } = req.body;

//     pool.getConnection((err, connection) => {
//         if(err) throw err; // Falha na conexão
//         console.log('Conectado com o ID' + connection.threadId);

//         let searchTerm = req.body.search;

//         connection.query('INSERT INTO item SET nome = ?, quantidade = ?', [nome, quantidade],(err, rows) => {
//             connection.release();

//             if(!err){
//                 res.render('add-item', { alert: 'Item adicionado com sucesso!' });
//             } else{
//                 console.log(err)
//             }

//             console.log('Dados: \n', rows)
//         });
//     });
// }