export class Config {
    public static REST_URL = process.env.REACT_APP_REST_URL ? process.env.REACT_APP_REST_URL : "";   
    public static WS_URL = process.env.REACT_APP_WS_URL ? process.env.REACT_APP_WS_URL : "";   
    public static MATOMO_ENABLED = process.env.REACT_APP_MATOMO_ENABLED ? process.env.REACT_APP_MATOMO_ENABLED === "true": false
    public static TOKEN_REFRESH_INTERVAL = 10; // Refresh the oken every 30 minutes
}