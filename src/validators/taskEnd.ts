export const taskEnd = (data: any, form: any) => {
    if (!data || (typeof data !== "string" && !(data instanceof String))) {
        return "Invalid end time";
    }

    if (form.start && (typeof form.start === "string" || form.data instanceof String)) {
        const startSplit = form.start.split(":");
        const endSplit = data.split(":");

        const startHour = +startSplit[0];
        const startMinute = +startSplit[1];

        const endHour = +endSplit[0];
        const endMinute = +endSplit[1];

        if (endHour === 0) {
            return "Max end time is 23:59";
        }

        if (endHour < startHour) {
            return "Task end must be after start";
        }

        if (endHour === startHour && endMinute <= startMinute) {
            return "Task end must be after start";
        }
    }

    return null;  
}