type ApiErrorParams = {
  code?: string;
  at: string;
  message?: string;
  status?: number;
  data?: any;
};

export class ApiError extends Error {
  code;
  status;
  at;
  data;
  constructor({ at, code = "internal-server-error", message = "Internal Server Error", status = 500, data }: ApiErrorParams) {
    super(message);
    this.code = code;
    this.status = status;
    this.at = at;
    this.data = data;
  }

  logError() {
    console.log(`${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} | ${this.at} | ${this.status} | ${this.code} | ${this.data ? JSON.stringify(this.data) : ""}`);
  }
}

export const isApiError = (error: any) => error instanceof ApiError;
