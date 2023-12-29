import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  date,
  smallint,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    photo: varchar("photo").notNull().default("None"),
    fbLink: varchar("fbLink").notNull().default("None"),
    igLink: varchar("igLink").notNull().default("None"),
    ytLink: varchar("ytLink").notNull().default("None"),
    cloudLink: varchar("cloudLink").notNull().default("None"),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);


export const gamesTable = pgTable(
  "games",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    title: varchar("title", { length: 100 }).notNull(),
    date: date("date").default(sql`now()`),
    photo: varchar("photo").notNull().default("None"),
    video: varchar("video", { length: 200 }),
    hashtag: varchar("hashtag", { length: 100 }).notNull(),
    totalScore: smallint("total_score").default(0).notNull(),
    totalOpScore: smallint("total_op_score").default(0).notNull(),
    possession: varchar("possession", { length: 100 }).default("WE").notNull(),//WE or OP
    periodsNumber: smallint("periodsNumber").default(0).notNull(),
    display: boolean("display").default(true).notNull(),
    
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);





export const playersTable = pgTable(
  "players",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    photo: varchar("photo").notNull().default("None"),
    number: varchar("number", { length: 100 }).notNull(),
    position: varchar("position", { length: 100 }).notNull(),
    usable: boolean("usable").default(true).notNull(),
    personalValue: smallint("personal_value").default(0).notNull(),
    personal2pt: smallint("personal_2pt").default(0).notNull(),
    personalIn2pt: smallint("personal_in2pt").default(0).notNull(),
    personal3pt: smallint("personal_3pt").default(0).notNull(),
    personalIn3pt: smallint("personal_in3pt").default(0).notNull(),
    personalFt: smallint("personal_ft").default(0).notNull(),
    personalInFt: smallint("personal_in_ft").default(0).notNull(),
    personalDefReb: smallint("personal_def_reb").default(0).notNull(),
    personalOffReb: smallint("personal_off_reb").default(0).notNull(),
    personalSteal: smallint("personal_steal").default(0).notNull(),
    personalAssist: smallint("personal_assist").default(0).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const usersToPlayersTable = pgTable(
  "users_to_players",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    playerId: uuid("player_id")
      .notNull()
      .references(() => playersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
);

export const usersToPlayersRelations = relations(
  usersToPlayersTable,
  ({ one }) => ({
    player: one(playersTable, {
      fields: [usersToPlayersTable.playerId],
      references: [playersTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToPlayersTable.userId],
      references: [usersTable.displayId],
    }),
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
    // title: varchar("title", { length: 100 }).notNull(),
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
    // periodId: uuid("period_id")
    //   .notNull()
    //   .references(() => periodsTable.displayId, {
    //     onDelete: "cascade",
    //     onUpdate: "cascade",
    //   }),
    onP1: boolean("on_p1").default(false).notNull(),
    onP2: boolean("on_p2").default(false).notNull(),
    onP3: boolean("on_p3").default(false).notNull(),
    onP4: boolean("on_p4").default(false).notNull(),
    onOt: boolean("on_ot").default(false).notNull(),
    nowPlay: boolean("now_play").default(false).notNull(),
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
    openCalculator: boolean("open_calculator").default(false).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);


// export const userRelations = relations(usersTable, ({ many }) => ({
//   userToGameTable: many(userToGameTable),
// }));

export const usersRelations = relations(usersTable, ({ many }) => ({
  gamesTable: many(gamesTable),
}));

export const GameRelations = relations(gamesTable, ({one}) => ({
  user: one(usersTable, {
    fields: [gamesTable.userId],
    references: [usersTable.displayId],
  }),
}));


export const PlayerRelations = relations(playersTable, ({ many }) => ({
  gamePerformancesTable: many(gamePerformancesTable),
}));

// export const GameRelations = relations(gamesTable, ({ many }) => ({
//   userToGameTable: many(userToGameTable),
// }));


// export const userToGameTable = pgTable(
//   "user_to_games",
//   {
//     id: serial("id").primaryKey(),
//     userId: uuid("user_id")
//       .notNull()
//       .references(() => usersTable.displayId, {
//         onDelete: "cascade",
//         onUpdate: "cascade",
//       }),
//     gameId: uuid("game_id")
//       .notNull()
//       .references(() => gamesTable.displayId, {
//         onDelete: "cascade",
//         onUpdate: "cascade",
//       }),
//   },
//   (table) => ({
//     userAndGameIndex: index("user_and_game_index").on(
//       table.userId,
//       table.gameId,
//     ),
//     // gameIdIndex: index("game_id_index").on(table.gameId),
//     uniqCombination: unique().on(table.gameId, table.userId),
//   }),
// );

// export const teamsRelations = relations(teamsTable, ({ many }) => ({
//   playersTable: many(playersTable),
// }));


// export const PeriodRelations = relations(periodsTable, ({ many }) => ({
//   gamePerformancesTable: many(gamePerformancesTable),
// }));

// export const GamePeriodRelations = relations(gamesTable, 
//   ({ many }) => ({
//   periodsTable: many(periodsTable),
// }));


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
    // period: one(periodsTable, {
    //   fields: [gamePerformancesTable.periodId],
    //   references: [periodsTable.displayId],
    // }),
  }),
);

// export const userToGameRelations = relations(
//   userToGameTable, 
//   ({ one }) => ({
//   user: one(usersTable, {
//     fields: [userToGameRelations.userId],
//     references: [usersTable.displayId],
//   }),
//   game: one(gamesTable, {
//     fields: [userToGameRelations.gameId],
//     references: [gamesTable.displayId],
//   }),
// }),
// );

export const GoBackTable = pgTable( 
  "go_back",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    gameId: uuid("game_id")
      .notNull()
      .references(() => gamesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    periodId: uuid("period_id")
      .references(() => periodsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    performanceId: uuid("performance_id")
      .references(() => gamePerformancesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    actionString: varchar("action_string", { length: 100 }).notNull(),
    undoAction: smallint("undo_action").default(0).notNull(),
    originalValue: smallint("original_value").default(0).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);