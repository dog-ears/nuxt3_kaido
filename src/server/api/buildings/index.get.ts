export default defineEventHandler(async (event) => {

    // dbからmaterialを取得
    const buildings = await prisma.building.findMany({
        include: {
            rooms: true,
        }
    });

    return buildings;
})
