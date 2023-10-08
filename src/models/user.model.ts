import db from '../helpers/db.helper'
// const table: string = "user"

interface User{
    username: string
    email: string
    password: string
}

class UserModel{
    async insert(data: User ){
        const query: string = `
        INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *`

        const values: string[] = [data.username, data.email, data.password]
        const {rows} = await db.query(query, values)
        return rows[0]
    }

    async findAll(search: string, page: string, limit: string, sort: string, sortBy: string){
        search = search || ''
        const pg: number = parseInt(page) || 1
        const lmt: number = parseInt(limit) || 10
        sort = sort || ''
        sortBy = sortBy || 'DESC'
        const offset: number = (pg - 1) * lmt

        const query: string = `SELECT * FROM "user" WHERE "username" ILIKE $1 ORDER BY ${sort} ${sortBy} LIMIT $2 OFFSET $3`

        const values = [`%${search}%`, lmt, offset]
        const {rows} = await db.query(query, values)
        return rows
    }

    async update(id: number, data: User){
        const query = `
        UPDATE "user" SET 
        "username" = COALESCE(NULLIF($2, ''), "username"),
        "email" = COALESCE(NULLIF($3, ''), "email"),
        "password" = COALESCE(NULLIF($4, ''), "password")
        WHERE id=$1
        RETURNINg *`

        const values: any = [id, data.username, data.email, data.password]
        const {rows} = await db.query(query, values)
        return rows[0]
    }

    async findOne(email: string){
        const query = `
        SELECT * FROM "user" WHERE "email"=$1`

        const values: string[] = [email]
        const {rows} = await db.query(query, values)
        return rows[0] 
    }

    async destroy(id: number){
        const query = `
        DELETE FROM "user" WHERE id=$1 RETURNING *`

        const values: number[] = [id]
        const {rows} = await db.query(query, values)
        return rows[0] 
    }
}

export default UserModel