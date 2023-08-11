import { ACCESS_TOKEN } from "../Constants";
import { ICompleteLoginResponse, ILoginResponse } from "./types";

class AuthApi {
  private endPoint: string;

  constructor(_endPoint: string) {
    this.endPoint = _endPoint;
  }

  private getUrl(url: string) {
    const baseUrl = `${(this.endPoint || '')}/auth`;
    return `${baseUrl}/${url}`;
  }

  public loginByWallet = async (): Promise<ILoginResponse> => {
    const url = this.getUrl(`login-by-wallet`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({})
    });
    const data = await response.json();
    return data.data;
  };

  public completeLoginByWallet = async (payload: {
    message: string;
    address: string;
    signature: string;
  }): Promise<ICompleteLoginResponse> => {
    const url = this.getUrl(`complete-login-by-wallet`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    const result = data.data as ICompleteLoginResponse;
    localStorage.setItem(ACCESS_TOKEN, result.accessToken)
    return result;
  };
}

export default AuthApi;
