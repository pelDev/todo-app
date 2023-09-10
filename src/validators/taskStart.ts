export const taskStart = (data: any) => {
    if (!data || (typeof data !== "string" && !(data instanceof String))) {
        return "Invalid start time";
    }

    return null;  
} 