import { ICompleteLoginResponse, ILoginResponse } from "./types";
declare class AuthApi {
    private endPoint;
    constructor(_endPoint: string);
    private getUrl;
    loginByWallet: () => Promise<ILoginResponse>;
    completeLoginByWallet: (payload: {
        message: string;
        address: string;
        signature: string;
    }) => Promise<ICompleteLoginResponse>;
}
export default AuthApi;
