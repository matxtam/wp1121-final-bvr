import exp from "constants";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  date,
  smallint,
  boolean,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";

export const teamsTable = pgTable(
  "teams",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    account: varchar("account", { length: 100 }).notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    teamName: varchar("team_name", { length: 100 }).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    accountIndex: index("account_index").on(table.account),
  }),
);

export const playersTable = pgTable(
  "players",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    photo: varchar("photo", { length: 100 }).notNull(),
    number: varchar("number", { length: 100 }).notNull(),
    position: varchar("position", { length: 100 }).notNull(),
    useable: boolean("useable").notNull(),
    personalValue: smallint("personal_value").default(0).notNull(),
    personal2pt: smallint("personal_2pt").default(0).notNull(),
    personalIn2pt: smallint("personal_in2pt").default(0).notNull(),
    personal3pt: smallint("personal_3pt").default(0).notNull(),
    personalIn3pt: smallint("personal_in3pt").default(0).notNull(),
    personalDefReb: smallint("personal_def_reb").default(0).notNull(),
    personalOffReb: smallint("personal_off_reb").default(0).notNull(),
    personalSteal: smallint("personal_steal").default(0).notNull(),
    personalAssist: smallint("personal_assist").default(0).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const gamesTable = pgTable(
  "games",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    date: date("date").default(sql`now()`),
    photo: varchar("photo", { length: 1000 }).notNull(),
    hashtag: varchar("hashtag", { length: 100 }).notNull(),
    totalScore: smallint("total_score").default(0).notNull(),
    possession: varchar("possession", { length: 100 }).notNull(),//WE or OP
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const periodsTable = pgTable(
  "periods",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    gameId: uuid("game_id")
      .notNull()
      .references(() => gamesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    number: varchar("number", { length: 100 }).notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    totalScore: smallint("total_score").default(0).notNull(),
    totalOpScore: smallint("total_op_score").default(0).notNull(),
    totalOpFoul: smallint("total_op_foul").default(0).notNull(),
    totalFoul: smallint("total_foul").default(0).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const gamePerformancesTable = pgTable(
  "game_performances",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    playerId: uuid("player_id")
      .notNull()
      .references(() => playersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    gameId: uuid("game_id")
      .notNull()
      .references(() => gamesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    periodId: uuid("period_id")
      .notNull()
      .references(() => periodsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    nowPlay: boolean("now_play").notNull(),
    twoPt: smallint("two_pt").default(0).notNull(),
    inTwoPt: smallint("in_two_pt").default(0).notNull(),
    threePt: smallint("three_pt").default(0).notNull(),
    inThreePt: smallint("in_three_pt").default(0).notNull(),
    ft: smallint("ft").default(0).notNull(),
    inFt: smallint("in_ft").default(0).notNull(),
    foul: smallint("foul").default(0).notNull(),
    steal: smallint("steal").default(0).notNull(),
    block: smallint("block").default(0).notNull(),
    assist: smallint("assist").default(0).notNull(),
    defReb: smallint("def_reb").default(0).notNull(),
    offReb: smallint("off_reb").default(0).notNull(),
    turnover: smallint("turnover").default(0).notNull(),
    point: smallint("point").default(0).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

// export const teamsRelations = relations(teamsTable, ({ many }) => ({
//   playersTable: many(playersTable),
// }));

// export const GameRelations = relations(gamesTable, ({ many }) => ({
//   periodsTable: many(periodsTable),
// }));

// export const PeriodRelations = relations(periodsTable, ({ many }) => ({
//   gamePerformancesTable: many(gamePerformancesTable),
// }));

export const PlayerRelations = relations(playersTable, ({ many }) => ({
  gamePerformancesTable: many(gamePerformancesTable),
}));

export const GamePerformanceRelations = relations(
  gamePerformancesTable,
  ({ one }) => ({
    player: one(playersTable, {
      fields: [gamePerformancesTable.playerId],
      references: [playersTable.displayId],
    }),
    game: one(gamesTable, {
      fields: [gamePerformancesTable.gameId],
      references: [gamesTable.displayId],
    }),
    period: one(periodsTable, {
      fields: [gamePerformancesTable.periodId],
      references: [periodsTable.displayId],
    }),
  }),
);
