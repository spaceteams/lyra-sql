import { Client } from "sqlite-client";
export function subquery(whereGradeGt: number, client?: Client) {
    const sql = `
    SELECT name, major FROM students
    WHERE student_id IN (
        SELECT student_id FROM grades WHERE grade > $1
    );
  `;
    return (client || Client).execute<{
        name: string;
        major: string;
    }>({ name: "subquery", sql, values: [whereGradeGt] as const });
}
