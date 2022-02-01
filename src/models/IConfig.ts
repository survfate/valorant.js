import { Locale, Region } from "../index";

export interface IConfig {
    /**
     * - Username of your account
     */
    username: string,
    /**
     * - Password of your account
     */
    password: string,
    /**
     * - Region of your account
     */
    region: Region,
    /**
     * - Locale to display in
     */
    locale: Locale,
    /**
     * - Wether to get verbose output
     * @default false
     */
    debug?: boolean
}