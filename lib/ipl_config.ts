interface IPLMatch {
  image: {
    horizontal: string;
    vertical: string;
    avatar: string;
  };
  short_code: string;
}

interface IPLConfigType {
  [key: string]: IPLMatch[];
}

const TEAMS = {
  "PBKS": {
    images: {
      vertical: "https://storage.googleapis.com/zingcam/original/images/b6h8q242wv4icbonqjmwfs5f.png",
      horizontal: "https://storage.googleapis.com/zingcam/original/images/et0c81vf3slsd5tlq43xouo0.png",
      avatar: "https://storage.googleapis.com/zingcam/original/images/gpb8r5rrots5q1wyotvwk1ds.png"
    },
    short_code: "fjgf4e",
  },
  "SRH": {
    images: {
      vertical: "https://storage.googleapis.com/zingcam/original/images/k8fqa2b641ruycw8v76f972u.png",
      horizontal: "https://storage.googleapis.com/zingcam/original/images/x9xdd4527rqk8ih712jva2pl.png",
      avatar: "https://storage.googleapis.com/zingcam/original/images/gpb8r5rrots5q1wyotvwk1ds.png"
    },
    short_code: "qswkyq",
  },
  "LSG": {
    images: {
      vertical: "https://storage.googleapis.com/zingcam/original/images/utfl7w0aeap74upsrfkanlaw.png",
      horizontal: "https://storage.googleapis.com/zingcam/original/images/m1sgwdrfuomjj4tl48jsy9in.png",
      avatar: "https://storage.googleapis.com/zingcam/original/images/gpb8r5rrots5q1wyotvwk1ds.png"
    },
    short_code: "xc0nc8",
  },
}

const IPL_CONFIG: IPLConfigType = {
  "06/04/2025": [
    {
      image: TEAMS["SRH"].images,
      short_code: TEAMS["SRH"].short_code,
    },
  ],
  "08/04/2025": [ 
    {
      image: TEAMS["PBKS"].images,
      short_code: TEAMS["PBKS"].short_code,
    },
  ],
  "12/04/2025": [ 
    {
      image: TEAMS["LSG"].images,
      short_code: TEAMS["LSG"].short_code,
    },
    {
      image: TEAMS["SRH"].images,
      short_code: TEAMS["SRH"].short_code,
    },
  ],
  "14/04/2025": [ 
    {
      image: TEAMS["LSG"].images,
      short_code: TEAMS["LSG"].short_code,
    },
  ],
  "15/04/2025": [ 
    {
      image: TEAMS["PBKS"].images,
      short_code: TEAMS["PBKS"].short_code,
    },
  ],
};

/**
 * Converts a date string in DD/MM/YYYY format to a timestamp
 */
const dateStringToTimestamp = (dateStr: string): number => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
};

/**
 * Formats a date to DD/MM/YYYY format
 */
const formatDate = (date: Date): string => {
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};

/**
 * Gets IPL data for current date in GMT, falls back to previous date if no match
 * @returns Array of IPL match data for the current or previous date
 */
export const getCurrentOrPreviousIPLData = (): IPLMatch[] => {
  // Get current date in GMT
  const now = new Date();
  const currentDateStr = formatDate(now);

  // If current date exists in config, return it
  if (IPL_CONFIG[currentDateStr]) {
    return IPL_CONFIG[currentDateStr];
  }

  // Get all dates from config and convert to timestamps
  const configDates = Object.keys(IPL_CONFIG)
    .map((dateStr) => ({
      dateStr,
      timestamp: dateStringToTimestamp(dateStr),
    }))
    .sort((a, b) => b.timestamp - a.timestamp); // Sort in descending order

  // Find the most recent date before current date
  const currentTimestamp = dateStringToTimestamp(currentDateStr);
  const previousDate = configDates.find(
    (date) => date.timestamp < currentTimestamp
  );

  // Return previous date's data or empty array if none found
  return previousDate ? IPL_CONFIG[previousDate.dateStr] : [];
};

/**
 * Gets IPL data for a specific date in GMT
 * @param date - Date string in any valid format
 * @returns Array of IPL match data for the date
 */
export const getIPLDataForDate = (date: string | Date): IPLMatch[] => {
  // Convert input date to Date object if it's a string
  const inputDate = typeof date === "string" ? new Date(date) : date;

  // Format the date to match our config format
  const formattedDate = formatDate(inputDate);

  // Return the data for the date or empty array if no matches
  return IPL_CONFIG[formattedDate] || [];
};

export default IPL_CONFIG;
