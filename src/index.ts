import { ContentApi } from "./services/ContentApi";
import { MatchApi } from "./services/MatchApi";
import { PlayerApi } from "./services/PlayerApi";
import { StoreApi } from "./services/StoreApi";
import { PartyApi } from "./services/PartyApi";
import { IAccount } from "./models/IAccount";
import { IConfig } from "./models/IConfig";
import { IAuthorization } from "./models/IAuthorization";
import { AbstractHttp } from "./Http";
import Axios, { AxiosResponse } from "axios";
import { Request, RequestBuilder } from "./Request";
import { Endpoints } from "./resources/Endpoints";
import { ApiClientException } from "./models/Exceptions";
import { CookieJar } from "tough-cookie";
// import { wrapper as axiosCookieJarSupport } from 'axios-cookiejar-support';
import { HttpsCookieAgent } from "http-cookie-agent";

export class RiotApiClient {
    #config: IConfig
    auth: IAuthorization
    clientVersion: string
    clientUserAgent: string
    region: Region
    http: Http
    contentApi: ContentApi
    matchApi: MatchApi
    playerApi: PlayerApi
    storeApi: StoreApi
    partyApi: PartyApi
    user: IAccount

    /**
     * - Client platform id
     */
    public static readonly XRiotClientPlatform = "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";

    /**
     * - Initiates the base client
     * @param config Config for the lib
     */
    constructor(config: IConfig) {
        if (!(config.region instanceof Region))
            throw new Error("'Config.region' must be type of 'Region'.");
        this.http = new Http();
        this.#config = config;
        this.region = config.region;
        this.buildServices();
    }

    /**
     * - Logins into your account
     */
    async login(): Promise<RiotApiClient> {
        // login and setup some stuff
        (this.auth as any) = {};
        this.clientUserAgent = await this.getClientVersion();
        this.auth.accessToken = await this.playerApi.getAccessToken(this.clientUserAgent, this.#config.username, this.#config.password);
        this.auth.rsoToken = await this.playerApi.getRsoToken(this.auth.accessToken);
        this.buildServices();
        // get user
        const userInfo = await this.playerApi.getInfo()
        if (userInfo.sub == "")
            throw new Error("Account ID was empty. Please start the game atleast once!");
        this.user = (await this.playerApi.getAccountById([userInfo.sub]))[0];
        // finish stuff
        this.clientVersion = await this.getClientVersion();
        this.buildServices();
        return this;
    }

    /**
     * - Gets the current client User-Agent string
     */
    async getClientUserAgent(): Promise<String> {
        try {
            const list = (await Axios({
                method: "GET",
                url: "https://api.github.com/repos/Morilli/riot-manifests/contents/Riot%20Client/KeystoneFoundationLiveWin?ref=master"
            })).data;

            var newestClient;
            list.forEach(function(elem){
                if (newestClient == null || elem.name.slice(0, -5).localeCompare(newestClient.name.slice(0, -5), undefined, { numeric: true, sensitivity: 'base' }) == 1)
                newestClient = elem;
            });
            
            const versionNum = newestClient.name.slice(0, -5);
            return "RiotClient/" + versionNum + ".1234567 rso-auth (Windows;10;;Professional, x64)";
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * - Gets the current client version
     */
    async getClientVersion(): Promise<string> {
        try {
            const data = (await Axios({
                method: "GET",
                url: "https://valorant-api.com/v1/version"
            })).data.data;

            const branch = data.branch;
            const build = data.buildVersion;
            const versionNum = data.version.split(".").pop();

            return branch + "-shipping-" + build + "-" + versionNum;
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * - Initiates services
     * @warning You probably shouldn't call this method
     */
    buildServices() {
        this.storeApi = new StoreApi(this);
        this.partyApi = new PartyApi(this);
        this.playerApi = new PlayerApi(this);
        this.contentApi = new ContentApi(this);
        this.matchApi = new MatchApi(this);
        this.http = new Http(this.auth, this.clientVersion);
    }
}

// axiosCookieJarSupport(Axios);
export class Http extends AbstractHttp {
    private readonly auth?: IAuthorization = null;
    private readonly version?: string = null;
    private readonly jar = new CookieJar();
    private readonly ciphers = [
        "TLS_AES_128_GCM_SHA256",
        "TLS_AES_256_GCM_SHA384",
        "TLS_CHACHA20_POLY1305_SHA256",
        "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
        "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
        "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
        "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
        "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
        "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256",
        "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA",
        "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA",
        "TLS_RSA_WITH_AES_128_GCM_SHA256",
        "TLS_RSA_WITH_AES_256_GCM_SHA384",
        "TLS_RSA_WITH_AES_128_CBC_SHA",
        "TLS_RSA_WITH_AES_256_CBC_SHA"
    ].join(':');
    private readonly httpsCookieAgentWithCiphers = new HttpsCookieAgent({ jar: this.jar, ciphers: this.ciphers });

    constructor(authorization?: IAuthorization, version?: string) {
        super();
        this.auth = authorization;
        this.version = version;
    }

    // axios_cookiejar_support_1
    /**
     * - Sends a request
     * @param request Request to send
     * @throws {ApiClientException}
     */
    async sendRequest(request: Request): Promise<AxiosResponse> {
        try {
            Axios.defaults.httpsAgent = this.httpsCookieAgentWithCiphers;
            const modifiedReq = RequestBuilder.fromRequest(request);

            if (this.auth != null && this.auth.accessToken != null) {
                modifiedReq.addHeader("Authorization", `${this.auth.accessToken.token_type} ${this.auth.accessToken.access_token}`);
                if (this.auth.rsoToken != null)
                    modifiedReq.addHeader("X-Riot-Entitlements-JWT", this.auth.rsoToken.entitlements_token);
            }
            if (this.version != null)
                modifiedReq.addHeader("X-Riot-ClientVersion", this.version);

            modifiedReq.addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform);
            modifiedReq.setCookieJar(this.jar);

            return await Axios(modifiedReq.build());
        } catch (e) {
            throw e.response
                ? new ApiClientException(e)
                : e;
        }
    }
}

export class Region {
    BaseUrl: string
    SharedUrl: string
    PartyUrl: string
    Name: string

    constructor(baseUrl: string, sharedUrl: string, partyUrl: string, name: string) {
        this.BaseUrl = baseUrl;
        this.SharedUrl = sharedUrl;
        this.PartyUrl = partyUrl;
        this.Name = name;
    }

    static EU = new Region(Endpoints.EuBase, Endpoints.EuShared, Endpoints.EuParty, "eu");
    static NA = new Region(Endpoints.NaBase, Endpoints.NaShared, Endpoints.NaParty, "na");
    static AP = new Region(Endpoints.ApBase, Endpoints.ApShared, Endpoints.ApParty, "ap");
    static KR = new Region(Endpoints.KrBase, Endpoints.KrShared, Endpoints.KrParty, "kr");
}