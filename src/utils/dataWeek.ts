import type { DataType } from "../interface/interface.";
import { Utils } from "./utils";

export function getDataWeek(data: DataType[]): DataType[] {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const recent = data.filter((dt) => {
        const date = Utils.parseDate(dt.date);
        return date >= sevenDaysAgo && date <= today;
    });

    let finalData: DataType[];

    if (recent.length > 0) {
        finalData = recent;
    } else {
        const closest = data
            .map((dt) => {
                const date = Utils.parseDate(dt.date);
                if (date < today) {
                    return {
                        ...dt,
                        distance: Math.abs(today.getTime() - date.getTime()),
                    };
                }
                return null;
            })
            .filter((d): d is DataType & { distance: number } => d !== null)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 7);

        finalData = closest;
    }
    return finalData;
}