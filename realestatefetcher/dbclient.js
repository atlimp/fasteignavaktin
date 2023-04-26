import sqlite3 from 'sqlite3';
sqlite3.verbose();

class Sqlite3Client {

    dbFile = '';
    
    db = null;

    constructor(dbFile) {
        this.dbFile = dbFile;
        this.db = new sqlite3.Database(dbFile);
    }

    get(query, params) {
        const promise = new Promise((resolve, reject) => {
            this.db?.all(query, params, (err, rows) => {
                
                if (err) {
                    reject(err);
                }

                resolve(rows);
            });
        });
        
        return promise;
    }

    run(query, params) {
        const promise = new Promise((resolve, reject) => {
            this.db?.run(query, params, (err) => {
                
                if (err) {
                    reject(err);
                }

                resolve('');
            });
        });

        return promise;
    }

    close() {
        this.db?.close();
    }

    async beginTransaction() {
        await this.run('BEGIN TRANSACTION');
    }

    async commitTransaction() {
        await this.run('COMMIT');
    }

    async rollbackTransaction() {
        await this.run('ROLLBACK');
    }
}

export default Sqlite3Client;