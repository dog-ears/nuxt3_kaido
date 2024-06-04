-- CreateTable
CREATE TABLE "Building" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "building_id" INTEGER NOT NULL,
    CONSTRAINT "Room_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Building" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
