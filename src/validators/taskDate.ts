export const taskDate = (data: any) => {
    if (!data) {
        return "Task date is required";
    }

    if (!(typeof data === "string")) {
        return "Invalid task date"
    }

    if (isNaN(Date.parse(data))) {
        return "Invalid task date";
    }

    return null;
}