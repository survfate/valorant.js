import { RiotApiClient } from "../index";
import { RequestBuilder } from "../Request";
import { ItemParser } from "../helpers/ItemParser";
import axios from "axios";
import { IItemUpgrades } from "../models/IItemUpgrades";
import { Endpoints } from "../resources/Endpoints";

export class ContentApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets the current story contract definitions
     */
    async getStoryContract() {
        const storyReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/contract-definitions/v2/definitions/story")
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(storyReq)).data;
    }

    /**
     * - Gets a player's contract
     */
    async getContractByPlayer(playerId: string) {
        const storyReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + `/contracts/v1/contracts/${playerId}`)
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(storyReq)).data;
    }

    /**
     * - Gets item upgrades
     */
    async getItemUpgrades(): Promise<IItemUpgrades> {
        const upgradeReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/contract-definitions/v3/item-upgrades")
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(upgradeReq)).data;
    }

    /**
     * - Gets all buddy levels
     */
    async getBuddyLevels(locale: String): Promise<any> {
        const buddylevelsReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(Endpoints.ValorantApiBaseUrl + "/v1/buddies/levels?language=" + locale)
            .build();
        return (await this._client.http.sendRequest(buddylevelsReq)).data['data'];
    }

    /**
     * - Gets all player cards
     */
    async getPlayerCards(locale: String): Promise<any> {
        const playercardsReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(Endpoints.ValorantApiBaseUrl + "/v1/playercards?language=" + locale)
            .build();
        return (await this._client.http.sendRequest(playercardsReq)).data['data'];
    }

    /**
     * - Gets all player titles
     */
    async getPlayerTitles(locale: String): Promise<any> {
        const playertitlesReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(Endpoints.ValorantApiBaseUrl + "/v1/playertitles?language=" + locale)
            .build();
        return (await this._client.http.sendRequest(playertitlesReq)).data['data'];
    }

    /**
     * - Gets all sprays
     */
    async getSprays(locale: String): Promise<any> {
        const spraysReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(Endpoints.ValorantApiBaseUrl + "/v1/sprays?language=" + locale)
            .build();
        return (await this._client.http.sendRequest(spraysReq)).data['data'];
    }

    /**
     * - Gets all skin levels
     */
    async getWeaponSkinlevels(locale: String): Promise<any> {
        const skinlevelsReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(Endpoints.ValorantApiBaseUrl + "/v1/weapons/skinlevels?language=" + locale)
            .build();
        return (await this._client.http.sendRequest(skinlevelsReq)).data['data'];
    }

    /**
     * - Gets partial items
     */
    async getContents(locale: String): Promise<any> {
        const contents = {
            buddyLevels: await this.getBuddyLevels(locale),
            playerCards: await this.getPlayerCards(locale),
            playerTitles: await this.getPlayerTitles(locale),
            sprays: await this.getSprays(locale),
            weaponSkinlevels: await this.getWeaponSkinlevels(locale)
        };
        return contents;
    }

    /**
     * @deprecated - Gets all items
     */
    async getContent(locale: String): Promise<any> {
        const contentReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(Endpoints.HenrikDevBaseUrl + "/valorant/v1/content?locale=" + locale)
            .build();

        const contentRes = (await this._client.http.sendRequest(contentReq)).data;
        const parser = new ItemParser(contentRes);

        return parser.parse();
    }
}