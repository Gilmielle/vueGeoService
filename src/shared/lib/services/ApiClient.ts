import { API_ENDPOINTS, API_PASSWORD, API_USERNAME } from '@/shared/constants'

interface getFormServerParams {
  url: string,
  method?: "GET" | "POST",
  body?: BodyInit | FormData | Object | null | undefined,
  headers?: HeadersInit,
  type?: string,
}

export class ApiClient {

  static instance: ApiClient;
  private readonly baseUrl: string
  static session: string

  static storageKeys = {
    vueGeoServiceSession: "vueGeoServiceSession"
  }

  constructor(baseUrl: string) {
    if(!ApiClient.instance) {
      ApiClient.instance = this;
    }
    this.baseUrl = this.getBaseUrl(baseUrl);
    this.getSession();
    return ApiClient.instance;
  }

  getBaseUrl(url: string) {
    if(!url.endsWith("/")) {
      return url + "/";
    }
    return url
  }

  setSessionToStorage(session: string) {
    localStorage.setItem(ApiClient.storageKeys.vueGeoServiceSession, session)
  }

  async getSession() {
    const session = localStorage.getItem(ApiClient.storageKeys.vueGeoServiceSession)
    if (!!session) {
      this.session = session;
    } else {
      await this.getLogin();
    }
  }

  get session() {
    return ApiClient.session;
  }
  set session(session: string) {
    ApiClient.session = session;
  }

  getEndpointUrl(url: string) {
    return this.baseUrl + (url.startsWith("/") ? url.substring(1) : url);
  }

  async get(
    {
      url = "",
      type = 'text',
      headers,
    }: getFormServerParams,
    isIncludeSession = true
  ) {
    return await this.getFormServer(
      {
        url: this.getEndpointUrl(url),
        method: "GET",
        type,
        headers,
      },
      isIncludeSession
    )
  }

  async post(
    {
      url = "",
      body = null,
      type = 'text',
      headers,
    }: getFormServerParams,
    isIncludeSession = true
  ) {

    return await this.getFormServer(
      {
        url: this.getEndpointUrl(url),
        method: "POST",
        body,
        type,
        headers
      },
      isIncludeSession
    )
  }

  async getFormServer(
    {
      url = this.baseUrl,
      method = "GET",
      body = null,
      headers = {
        "Content-Type": "application/json"
      },
      type = "text",
    }: getFormServerParams,
    isIncludeSession = true
  ) {
    let requestBody = body ?? {};
    let requestUrl: URL = new URL(url);
    if (isIncludeSession && !!this.session) {
      if (method === 'POST') {
        requestBody = {
          ...requestBody,
          session: this.session,
        }
      } else if (method === "GET") {
        requestUrl.searchParams.set("session", this.session)
      }
    }

    return await fetch(requestUrl.toString(), { method, body: JSON.stringify(requestBody), headers })
      .then(async (resp: Response) => {
        return await this.getResponse(resp, type)
      })
  }

  async getResponse(resp: Response, type: string){
    const { ok, status } = resp;
    return await ((ok) ? (type === "json") ? resp.json() : resp.text() : Promise.reject(status));
  };

  async getLogin() {
    await this.post({
      url: API_ENDPOINTS.login,
      body: {
        UserName: API_USERNAME,
        Password: API_PASSWORD,
      }
    }, false).then((resp) => {
      this.session = resp;
      this.setSessionToStorage(resp)
    })
  }
}
