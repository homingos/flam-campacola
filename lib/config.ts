export const FANDOM_HOSTNAMES = new Set([
  "ccipl.localhost:3000",
  "ccipl.flamapp.com",
]);

export const CONFIG = {
  FANDOM: {
    android: {
      app_clip_bundle_id: "com.flam.fandom",
    },
    ios: {
      app_bundle_id: "6743482268",
      app_clip_bundle_id: "com.flam.fandom.Clip",
    },
  },
};

export const DEFAULT_META = {
  title: "Flam Fandom",
  description: "View Fandom",
  og_image_url:
    "https://storage.googleapis.com/zingcam/original/images/pe55m7eqzdrn8rwn150hgf0g.png",
  redirection_image_url:
    "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
};

const FANDOM_IPL_TEAMS = {
  RCB01u: "RCB01u",
  MI01u: "MI01u",
  CSK01u: "CSK01u",
  SRH01u: "SRH01u",
  KKR01u: "KKR01u",
  PBKS01u: "PBKS01u",
  GT01u: "GT01u",
  LSG01u: "LSG01u",
  RR01u: "RR01u",
};

type FANDOM_IPL_TEAM = keyof typeof FANDOM_IPL_TEAMS;

type FANDOM_IPL_IMAGES = {
  [key: string]: {
    [key in FANDOM_IPL_TEAM]: {
      shortCode: string;
      url: string;
    };
  };
};

export const FANDOM_IPL_IMAGES: FANDOM_IPL_IMAGES = {
  "4/10/2025": {
    RCB01u: {
      shortCode: FANDOM_IPL_TEAMS.RCB01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    MI01u: {
      shortCode: FANDOM_IPL_TEAMS.MI01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    CSK01u: {
      shortCode: FANDOM_IPL_TEAMS.CSK01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    SRH01u: {
      shortCode: FANDOM_IPL_TEAMS.SRH01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    KKR01u: {
      shortCode: FANDOM_IPL_TEAMS.KKR01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    PBKS01u: {
      shortCode: FANDOM_IPL_TEAMS.PBKS01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    GT01u: {
      shortCode: FANDOM_IPL_TEAMS.GT01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    LSG01u: {
      shortCode: FANDOM_IPL_TEAMS.LSG01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
    RR01u: {
      shortCode: FANDOM_IPL_TEAMS.RR01u,
      url: "https://storage.googleapis.com/zingcam/original/images/qizdrndq16gbrtzesgntyulk.png",
    },
  },
};
