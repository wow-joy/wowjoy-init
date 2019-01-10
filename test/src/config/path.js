const isDev = process.env.NODE_ENV === "development";

const BASEROUTE = isDev ? "" : "/v2/recruit/position/mobile";

export { BASEROUTE };
