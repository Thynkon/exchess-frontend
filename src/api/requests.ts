import axios, { type AxiosInstance } from "axios";
import { config } from "../config";

type Nullable<T> = T | null;

interface Headers {
    [key: string]: any
}

export default class Api {
    token: Nullable<string>;
    url: string;
    client: Nullable<AxiosInstance>;

    constructor() {
        this.token = null;
        this.client = null;
        this.url = config.api_url;
    }

    init = () => {
        this.token = localStorage.getItem('token');

        let headers: Headers = {};
        headers.Accept = "application/json";

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        this.client = axios.create({
            baseURL: this.url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getAuthToken = async (params: object) => {
        return this.init().post("/login", params);
    };

    createAccount = async (params: object) => {
        return this.init().post("/register", params);
    };

    getVariants = async () => {
        return this.init().get("/variants");
    };

    createGameParticipation = async (params: object) => {
        return this.init().post("/game_participations", params);
    };

    createGame = async (params: object) => {
        return this.init().post("/games", params);
    };
}