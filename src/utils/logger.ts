export const logger = (...data: any) => {
    if (process.env.NODE_ENV === "development") {
        console.log(...data);
    }
}