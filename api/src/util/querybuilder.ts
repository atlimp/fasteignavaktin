import { OrderBy, WhereCol } from "../interfaces/interfaces";
import { AndOrNone, Order, OrderByCols, SQLOperator } from "../model/enums";

export class QueryBuilder {

    _table: string = '';

    _cols: string[] = [];

    _where: WhereCol[] = [];

    _orderBy: OrderBy;

    _limit: number = 0;

    _offset: number = 0;

    from(_table: string) {
        this._table = _table;
        return this;
    }

    select(col: string) {
        this._cols.push(col);
        return this;
    }

    where(col: string, operator: SQLOperator, val: any, andOr: AndOrNone) {
        this._where.push({
            col,
            operator,
            val,
            andOr,
        });
        return this;
    }

    orderBy(_orderBy: OrderBy) {
        this._orderBy = _orderBy;
        return this;
    }

    limit(_limit: number) {
        this._limit = _limit;
        return this;
    }

    offset(_offset: number) {
        this._offset = _offset;
        return this;
    }

    build() {
        let query: String = 'SELECT ';
        const params: Object = {};

        for (let i = 0; i < this._cols.length - 1; i++) {
            query += `${this._cols[i]}, `;
        }

        query += `${this._cols[this._cols.length - 1]} `;

        query += `FROM ${this._table} `;

        if (this._where.length > 0) {
            query += 'WHERE ';
        }

        this._where.forEach(x => {
            const paramKey: string = `$${x.col.toLowerCase()}_${Math.floor(Math.random()*1000)}`;

            query += `${x.col} ${x.operator} ${paramKey} ${x.andOr} `;

            params[paramKey as keyof typeof params] = x.val;
        });

        if (this._orderBy) {
            query += `ORDER BY ${this._orderBy.colName} ${this._orderBy.order} `;
        }

        if (this._limit) {
            query += `LIMIT ${this._limit} `;
        }


        if (this._offset) {
            query += `OFFSET ${this._offset} `;
        }


        return {
            query,
            params,
        };
    }
}