export type User = {
  id: string;
  name: string;
  displayId: string;
  email: string;
  photo: string;
  fbLink: string;
  igLink: string;
  ytLink: string;
  cloudLink: string;
  provider: "github" | "credentials";
};

export type Player = {
  id: number;
  displayId: string;
  name: string;
  photo: string;
  number: string; //背號 
  position: string; //位置
  usable: boolean; //是否可用
  personalValue: number; //個人價值(不知需不需要)
  personal2pt: number; //個人兩分球數
  personalIn2pt: number; //個人兩分球進球數
  personal3pt: number; //個人三分球數
  personalIn3pt: number; //個人三分球進球數
  personalFt: number; //個人罰球數
  personalInFt: number; //個人罰球進球數
  personalDefReb: number; //個人防守籃板數
  personalOffReb: number; //個人進攻籃板數
  personalSteal: number; //個人抄截數
  personalAssist: number; //個人助攻數
};

export type Game = {
  id: string;
  title: string; //通常包含對手
  date: Date;
  photo: string;
  hashtag: string; //友誼賽、北電、大電
  totalScore: number; //總得分
  totalOpScore: number; //總對手得分
  possession: number; //球權
  display: boolean; //是否顯示
};

export type Period = {
  id: string;
  gameID: string; //哪場比賽
  number: number; //第幾節,i.e:1,2,3,4,5(加賽)
  title: string;
  totalScore: number; //一節總得分
  totalOpScore: number; //一節對手總得分
  totalOpFoul: number; //一節對手總失誤
  totalFoul: number; //一節總犯規
};

export type GamePerformance = {
  id:number;
  displayId: string;
  playerId: string; //球員
  gameId: string; //哪場比賽
  // periodId: string; //哪節
  onP1: boolean; //第一節是否上場
  onP2: boolean; //第二節是否上場
  onP3: boolean; //第三節是否上場
  onP4: boolean; //第四節是否上場
  onOt: boolean; //加賽是否上場
  nowPlay: boolean; //是否正在場上
  twoPt: number; //兩分球數
  inTwoPt: number; //兩分球進球數
  threePt: number; //三分球數
  inThreePt: number; //三分球進球數
  ft: number; //罰球數
  inFt: number; //罰球進球數
  foul: number; //犯規數
  steal: number; //抄截數
  block: number; //阻攻數
  assist: number; //助攻數
  defReb: number; //防守籃板數
  offReb: number; //進攻籃板數
  turnover: number; //失誤數
  point: number; //總得分
};
