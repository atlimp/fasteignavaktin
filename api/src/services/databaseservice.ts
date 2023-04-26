import { IBaseService } from '../interfaces/interfaces';
import { getConfigOrDefault } from '../util/util';
import sqlite3, { Database } from 'sqlite3';
import { BEGIN_TRANSACTION, COMMIT_TRANSACTION, ROLLBACK_TRANSACTION } from '../db/queries';
sqlite3.verbose();

class DatabaseService implements IBaseService {

    dbFile = '';
    
    db: Database | null = null;

    constructor() {
        this.dbFile = getConfigOrDefault('DB_FILENAME', '');
        console.log(this.dbFile);
        this.db = new sqlite3.Database(this.dbFile);
    }

    get(query: string, params: object = {}): Promise<any[]> {
        const promise: Promise<any[]> = new Promise((resolve, reject) => {
            this.db?.all(query, params, (err, rows) => {
                
                if (err) {
                    reject(err);
                }

                resolve(rows);
            });
        });
        
        return promise;
    }

    run(query: string, params: object = {}): Promise<any> {
        const promise: Promise<any> = new Promise((resolve, reject) => {
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
        await this.run(BEGIN_TRANSACTION);
    }

    async commitTransaction() {
        await this.run(COMMIT_TRANSACTION);
    }

    async rollbackTransaction() {
        await this.run(ROLLBACK_TRANSACTION);
    }
}

export default DatabaseService;