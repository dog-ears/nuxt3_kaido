import type { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {

    console.log('API（/api/building）is called!!');

    // クエリの取得
    const query = getQuery(event)

    // where条件を生成（検索ワードは一つのみ）
    const where: Prisma.BuildingWhereInput = {}
    if (query.q && typeof query.q === 'string') {
        where.name = {
            contains: query.q
        }
    }

    // dbからmaterialを取得
    const buildings = await prisma.building.findMany({
        where,
        include: {
            rooms: true,
        }
    });

    return buildings;
})
