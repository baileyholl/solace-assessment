import db from "../../../db";
import { advocates, specialties, advocateSpecialties } from "../../../db/schema";
import {randomSpecialty} from "../../../db/seed/advocates";
import { advocateData, specialtyData } from "../../../db/seed/advocates";

export async function POST() {
  await db.delete(specialties)
  await db.delete(advocateSpecialties)
  await db.delete(advocates)

  await db.insert(specialties).values(specialtyData)

  const records = await db.insert(advocates).values(advocateData.map(advocate => {
    return {
      ...advocate,
    }
  })).returning();

  const advocateSpecialtyEntries = []
  // Assign and insert random specialties for each advocate
  for(const record of records){
    for(const specialty of specialtyData.slice(...randomSpecialty())) {
      advocateSpecialtyEntries.push({ specialtyId: specialty.id, advocateId: record.id})
    }
  }

  await db.insert(advocateSpecialties).values(advocateSpecialtyEntries)
  return Response.json({ advocates: records });
}
