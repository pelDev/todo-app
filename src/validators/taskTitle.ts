export const taskTitle = (data: any) => {
    if (!data) {
        return "Task title is required";
    }

    if (!(data instanceof String || typeof data === "string")) {
        return "Invalid task title"
    }

    return null;
}