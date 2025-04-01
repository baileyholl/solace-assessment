import {sql} from "drizzle-orm";
import db from "../../../db";


export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const lastId = searchParams.get("lastId");
    const searchTerm = searchParams.get("searchTerm");
    const defaultPageSize = 10
    const maxPageSize = 100;

    const limit = Math.min(parseInt(searchParams.get("limit") || "", 10) || defaultPageSize, maxPageSize);

    const shouldFilter = !!searchTerm?.trim();
    let lastIdFilter = sql``
    if(lastId && shouldFilter){
        lastIdFilter = sql`AND a.id > ${Number(lastId)}`
    }else if(lastId){
        lastIdFilter = sql`WHERE a.id > ${Number(lastId)}`
    }
    const filterSql = shouldFilter ? sql`
      WHERE a.id IN (
        SELECT a2.id
        FROM advocates a2
        LEFT JOIN advocate_specialties asp2 ON asp2.advocate_id = a2.id
        LEFT JOIN specialties s2 ON s2.id = asp2.specialty_id
        WHERE
          CONCAT(a2.first_name, ' ', a2.last_name) ILIKE ${`%${searchTerm}%`}
          OR a2.city ILIKE ${`%${searchTerm}%`}
          OR s2.name ILIKE ${`%${searchTerm}%`}
      )
    ` : sql``
    // Since Drizzle does not support aggregated selections, unfortunately we have to use raw SQL here
    const results = await db.execute(
        sql`
            SELECT
                a.id,
                a.first_name as "firstName",
                a.last_name as "lastName",
                a.city,
                a.degree,
                a.years_of_experience as "yearsOfExperience",
                a.phone_number as "phoneNumber",
                array_agg(DISTINCT s.name) AS specialties
            FROM advocates a
                     LEFT JOIN advocate_specialties asp ON asp.advocate_id = a.id
                     LEFT JOIN specialties s ON s.id = asp.specialty_id
                ${filterSql}
                ${lastIdFilter}
            GROUP BY a.id
            ORDER BY a.id
                LIMIT ${limit};
    `
    );
    return Response.json({ data: results})
}
